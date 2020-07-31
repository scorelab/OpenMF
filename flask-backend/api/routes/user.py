from flask import Blueprint, render_template, jsonify, request
from flask_login import login_required, current_user
from ..models.models import User
from werkzeug.security import generate_password_hash, check_password_hash
from .. import db

user = Blueprint('user', __name__, url_prefix='/user')

@user.route('/profile')
@login_required
def profile():
    return jsonify({'status':200,
                    'user_id':current_user.id,
                    'message':'user logged in'})

@user.route('/list')
def list():
    return jsonify({'status':200,
                    'total_users':User.query.count()})

@user.route('/create', methods=['POST'])
def create_user():
    req = request.get_json()
    email = str(req['email'])
    password = str(req['password'])
    name = str(req['name'])
    role = str(req['role'])

    user = User.query.filter_by(email=email).first()

    if user:
        return 'Email address already exists', 409

    new_user = User(email=email, name=name, password=generate_password_hash(password, method='sha256'))

    db.session.add(new_user)
    db.session.commit()

    return 'user created', 202

@user.route('/role-update', methods=['POST'])
def roleupdate():
    req = request.get_json()
    email = str(req['email'])
    newrole = str(req['role'])
    user = User.query.filter_by(email=email).first()
    user.role = newrole
    db.session.commit()
    return 'user updated', 202

@user.route('/delete-user', methods=['POST'])
def deleteuser():
    req = request.get_json()
    email = str(req['email'])
    user = User.query.filter_by(email=email).first()
    db.session.delete(user)
    db.session.commit()
    return 'user deleted', 202
