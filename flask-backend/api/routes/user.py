import sqlite3 as sql
import time
from flask import Blueprint, render_template, jsonify, request
from flask_login import login_required, current_user
from ..models.models import User, UserSchema
from werkzeug.security import generate_password_hash, check_password_hash
from .. import db

user_schema = UserSchema()
users_schema = UserSchema(many=True)

user = Blueprint('user', __name__, url_prefix='/user')

@user.route('/profile', methods=["GET"])
@login_required
def profile():
    return jsonify({'status':200,
                    'user_id':current_user.id,
                    'email':current_user.email,
                    'name':current_user.name,
                    'role':current_user.role,
                    'timestamp':current_user.timestamp,
                    'message':'user logged in'})

@user.route('/getUser/<id>', methods=["GET"])
def getUser(id):
    user = User.query.filter_by(id=id).first()
    
    # Check f user with that id exists
    if not user:
        return 'User does not exist', 404

    return jsonify({'status':200,
                    'user_id':user.id,
                    'email':user.email,
                    'name':user.name,
                    'role':user.role,
                    'timestamp':user.timestamp})

@user.route('/count', methods=["GET"])
def count():
    return jsonify({'status':200,
                    'total_users':User.query.count()})

@user.route('/list', methods=["GET"])
def list():
    all_users = User.query.order_by(User.timestamp).all()
    result = users_schema.dump(all_users)
    return jsonify(result)

@user.route('/create', methods=['POST'])
def create_user(): # Add only admin can create functionality, once deployed on actual data base with one master user
    req = request.get_json()
    email = str(req['email'])
    password = str(req['password'])
    name = str(req['name'])
    role = ''.join(sorted(str(req['role'])))
    timestamp = int(time.time())
    
    user = User.query.filter_by(email=email).first()

    if user:
        return 'Email address already exists', 409

    new_user = User(email=email, name=name, password=generate_password_hash(password, method='sha256'), role=role, timestamp=timestamp)

    db.session.add(new_user)
    db.session.commit()

    return 'user created', 202

@user.route('/role-update', methods=['POST'])
def roleupdate():
    req = request.get_json()
    email = str(req['email'])
    newrole = ''.join(sorted(str(req['role'])))
    user = User.query.filter_by(email=email).first()
    user.role = newrole
    db.session.commit()
    return 'user updated', 202


@user.route('/delete', methods=['POST'])
@login_required
def deleteuser():
    db.session.delete(current_user)
    db.session.commit()
    return 'user deleted', 202
