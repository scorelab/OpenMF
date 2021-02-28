import datetime
from flask import Blueprint, render_template, redirect, url_for, request, flash, request
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, logout_user, login_required, current_user
from flask_jwt_extended import create_access_token, decode_token
from ..models.models import User
from ..helpers.mail import send_email
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

@auth.route('/forgot-password', methods=['POST'])
def forgot_password():
    try:
       data = request.get_json()
       email = str(data['email'])
    except:
        return 'Please provide an email', 400
    
    user = User.query.filter_by(email=email).first()

    if not user:
        return 'User with that email does not exist', 404

    # Create token from email
    expires = datetime.timedelta(hours=24)
    token = create_access_token(email, expires_delta=expires)
    
    url = f'http://localhost:3000/reset-password/{token}'
    send_email(email, url)

    return 'Reset link sent to your email', 200

@auth.route('/reset-password/<token>', methods=['POST'])
def reset_password(token):

    if not token:
        return 'Invalid Url', 400

    try:
       data = request.get_json()
       password = str(data['password'])
    except:
        return 'Please provide a password', 400

    # Get email from token
    email = decode_token(token)['sub']

    user = User.query.filter_by(email=email).first()
    if not user:
        return 'Invalid token', 401
    
    user.password = generate_password_hash(password, method='sha256')
    db.session.commit()
    return 'Password successfully reset', 200
