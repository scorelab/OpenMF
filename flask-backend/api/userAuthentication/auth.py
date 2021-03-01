from flask import Blueprint, render_template, redirect, url_for, request, flash, request
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, logout_user, login_required
from ..models.models import User
from .. import auto

auth = Blueprint('auth', __name__)

@auth.route('/login', methods=['POST'])
@auto.doc('auth')
def login_post():
    '''
    Log in into an existing account
    '''
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
@auto.doc('auth')
@login_required
def logout():
    '''
    Log out the current user
    '''
    logout_user()
    return 'logged out successfully', 200