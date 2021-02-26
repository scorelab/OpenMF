from flask import Blueprint, request, request
from flask_login import login_user, logout_user, login_required
from ..models.models import User

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

    if not user:
        return 'unable to authenticate, user not found', 406

    if not user.match_password(password):
        return "unable to authenticate, password doesn't match", 406

    login_user(user, remember=remember)

    return 'user logged in', 200

@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return 'logged out successfully', 200