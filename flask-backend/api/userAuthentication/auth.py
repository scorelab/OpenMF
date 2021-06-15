"""
Authentication Route for User.
"""

from flask import Blueprint, request, jsonify
from flask.helpers import make_response
from flask_login import login_user, logout_user, login_required
from api.models.admin import Admin
from api.models.extractor import Extractor
from api.models.management import Management
from api.extansions import db


auth = Blueprint('auth', __name__)

@auth.route('/login', methods=['POST'])
def login_post():

    # if no data is sent at all
    try:
        req = request.get_json()
    except:
        response = {
            "success": False,
            "message": "Please provide email, password and role."
        }
        return make_response(jsonify(response)), 400
    # Check if a key is missing
    try:
        email = str(req['email'])
        password = str(req['password'])
        role = str(req['role'])
        remember = True if str(req['remember']) else False
    except KeyError as err:
        response = {
            "success": False,
            "message": f'please provide {str(err)}'
        }
        return make_response(jsonify(response)), 400
    try:
        if role == "admin":
            user = Admin.query.filter_by(email=email).first()
        elif role == "extractor":
            user = Extractor.query.filter_by(email=email).first()
        elif role == "management":
            user = Management.query.filter_by(email=email).first()
        else:
            response = {
                "success": False,
                "message": "Unable to authenticate, please provide a valid role.",
            }
            return make_response(jsonify(response)), 406
        if user is None:
            response = {
                "success": False,
                "message": "Unable to authenticate, user not found.",
            }
            return make_response(jsonify(response))
        if not user.check_password(password):
            response = {
                "success": False,
                "message": "Unable to authenticate, password doesn't match.",
            }
            return make_response(jsonify(response)), 406


        login_user(user, remember=remember)

        response = {
            "success": True,
            "message": "Authenticated, user logged in."
        }
        return make_response(jsonify(response)), 200
    except Exception as e:
        print(e)
        response = {
            "success": False,
            "message": "Unable to authenticate, something went wrong."
        }
        return make_response(jsonify(response)), 406


@auth.route('/logout')
@login_required
def logout():
    logout_user()
    response = {
        "success": True,
        "message": "user logged out successfully."
    }
    return make_response(jsonify(response)), 200