"""
Authentication Route for User.
"""

from flask import Blueprint, request, jsonify
from flask.helpers import make_response
from api.models.admin import Admin
from api.models.extractor import Extractor
from api.models.management import Management
from api.models.token_blacklist import BlacklistedToken
from api.extansions import db
from api.helpers.auth import (
    _create_auth_successfull_response
)
from api.utils.jwt_decorators import (
    token_required
)


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
            return make_response(jsonify(response)), 404
        if not user.check_password(password):
            response = {
                "success": False,
                "message": "Unable to authenticate, password doesn't match.",
            }
            return make_response(jsonify(response)), 406


        access_token = user.encode_access_token()
        response = _create_auth_successfull_response(
            access_token=access_token,
            message="Successfully logged in.",
            status_code=200,
        )
        return response

    except Exception as e:
        print(e)
        response = {
            "success": False,
            "message": "Unable to authenticate, something went wrong."
        }
        return make_response(jsonify(response)), 501


@auth.route('/logout', methods=['POST'])
@token_required
def logout():
    try:
        access_token = logout.token
        blacklisted_token = BlacklistedToken(token=access_token)
        db.session.add(blacklisted_token)
        db.session.commit()
        response = {
            "success": True,
            "message": "user logged out successfully."
        }
        return make_response(jsonify(response)), 200
    except Exception as e:
        print(e)
        response = {
            "success": False,
            "message": "Unable to authenticate, something went wrong."
        }
        return make_response(jsonify(response)), 501