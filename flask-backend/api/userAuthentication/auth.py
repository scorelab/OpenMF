from flask import Blueprint, render_template, redirect, url_for, request, flash, request
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, logout_user, login_required
from flask_jwt_extended import decode_token
from ..models.models import User
from .. import db

auth = Blueprint('auth', __name__)

@auth.route('/login', methods=['POST'])
def login_post():

    # if no data is sent at all
    try:
        req = request.get_json()
    except:
        return 'please provide email and password', 400

    # Check if a key is missing
    try:
        email = str(req['email'])
        password = str(req['password'])
        remember = True if str(req['remember']) else False
    except KeyError as err:
        return f'please provide {str(err)}', 400

    user = User.query.filter_by(email=email).first()

    if user is None:
        return 'unable to authenticate, user not found', 406

    if not check_password_hash(user.password, password):
        return "unable to authenticate, password doesn't match", 406

    login_user(user, remember=remember)

    return 'user logged in', 200

@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return 'logged out successfully', 200

@auth.route('/confirm-account/<token>')
def confirm_account(token):
    email = decode_token(token)['sub']
    user = User.query.filter_by(email=email).first()

    if not user:
        return 'User does not exist', 404

    user.is_verified = True
    db.session.commit()
    return 'Account confirmed', 200