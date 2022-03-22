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
from api.helpers.mail import send_reset_link_mail, send_verify_link_mail
from api.utils.jwt_decorators import (
    token_required
)


# Declare auth Blueprint
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
    '''
    This Route handle User Logout.
    '''
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


@auth.route('/forgot-password', methods=["POST"])
def forgot_password():
    """
    Route to handle and send forgot-password mail message.
    """

    # Get Recipient email address
    try:
        req = request.get_json()
        recipientEmail = req["email"]

    except:
        response = {
            "success": False,
            "message": "Please Provide Recipient Email Address."
        }
        return make_response(jsonify(response)), 422

    # Check if user exists or not
    user = ( Admin.query.filter_by(email=recipientEmail).first() or
             Extractor.query.filter_by(email=recipientEmail).first() or
             Management.query.filter_by(email=recipientEmail).first() )

    # return if user not exist
    if(not user):
        response = {
            "success": False,
            "message": "User Not Found, Please a Registered Email ID."
        }
        return make_response(jsonify(response)), 404

    # create access token
    token = user.encode_access_token()

    # Reset Url
    reset_link = f"http://localhost:3000/reset-password/{token}"


    # Send reset link meail message
    try:
        send_reset_link_mail(recipient=recipientEmail, reset_link=reset_link)
        response = {
            "success": True,
            "message": f"Reset Link has been sent to {recipientEmail}"
        }
        return make_response(jsonify(response)), 201

    except Exception as e:
        response = {
            "success": False,
            "message": 'Something went wrong.',
        }
        return make_response(jsonify(response)), 500



@auth.route('/reset-password', methods=["POST"])
def reset_password():
    """
    Route to handle/Reset Password.
    """
    try:
        req = request.get_json()
        token = req['token']
        password = req['password']
    except:
        response = {
            "success": False,
            "message": "Please Provide all Fields."
        }
        return make_response(jsonify(response)), 422

    try:
        # Decode Token
        res = Admin.decode_access_token(token).value

        # user details
        public_id = res["public_id"]
        role = res["role"]

        # Get User as per role
        User = None
        if(role == "admin"):
            User = Admin.query.filter_by(public_id=public_id).first()
        elif (role == "extractor"):
            User = Extractor.query.filter_by(public_id=public_id).first()
        elif (role == "management"):
            User = Management.query.filter_by(public_id=public_id).first()
        else:
            response = {
                "success": False,
                "message": "Token Expired."
            }
            return make_response(jsonify(response)), 404

        # Check for User existance
        if(not User):
            response = {
                "success": False,
                "message": "User Not Found."
            }
            return make_response(jsonify(response)), 404

        # Reset Password
        User.password = password

        # commit changes
        db.session.commit()

        response = {
            "success": True,
            "message": "Password Reset Successfully."
        }
        return make_response(jsonify(response)), 201

    # If decode generates error
    except Exception:
        response = {
            "success": False,
            "message": "Something Went Wrong, Please Use Valid Reset Password Link."
        }
        return make_response(jsonify(response)), 422


@auth.route('/send-verify-email', methods=["POST"])
def send_verify_email():
    """
    Route to handle and send verify email message.
    """

    # Get Recipient email address
    try:
        req = request.get_json()
        recipientEmail = req["email"]

    except:
        response = {
            "success": False,
            "message": "Please Provide Recipient Email Address."
        }
        return make_response(jsonify(response)), 422

    # Check if user exists or not
    user = ( Admin.query.filter_by(email=recipientEmail).first() or
             Extractor.query.filter_by(email=recipientEmail).first() or
             Management.query.filter_by(email=recipientEmail).first() )

    # return if user not exist
    if(not user):
        response = {
            "success": False,
            "message": "User Not Found, Please a Registered Email ID."
        }
        return make_response(jsonify(response)), 404

    # Check if user is verified or not
    if(user.verified):
        response = {
            "success": False,
            "message": "User is already verified."
        }
        return make_response(jsonify(response)), 422

    # create access token
    token = user.encode_access_token()

    # Verify Email Link
    verify_link = f"http://localhost:3000/verify-email/{token}"


    # Send reset link meail message
    try:
        send_verify_link_mail(recipient=recipientEmail, verify_link=verify_link)
        response = {
            "success": True,
            "message": f"Email Verification link has been sent to {recipientEmail}."
        }
        return make_response(jsonify(response)), 201

    except Exception as e:
        response = {
            "success": False,
            "message": 'Something went wrong.',
        }
        return make_response(jsonify(response)), 500


@auth.route('/verify-email', methods=["POST"])
def verify_email():
    """
    Route to handle/Verify Email
    """
    try:
        req = request.get_json()
        token = req['token']
    except:
        response = {
            "success": False,
            "message": "Please Provide all Fields."
        }
        return make_response(jsonify(response)), 422

    try:
        # Decode Token
        res = Admin.decode_access_token(token).value

        # user details
        public_id = res["public_id"]
        role = res["role"]

        # Get User as per role
        User = None
        if(role == "admin"):
            User = Admin.query.filter_by(public_id=public_id).first()
        elif (role == "extractor"):
            User = Extractor.query.filter_by(public_id=public_id).first()
        elif (role == "management"):
            User = Management.query.filter_by(public_id=public_id).first()
        else:
            response = {
                "success": False,
                "message": "Token Expired."
            }
            return make_response(jsonify(response)), 404

        # Check for User existance
        if(not User):
            response = {
                "success": False,
                "message": "User Not Found."
            }
            return make_response(jsonify(response)), 404

        # Change Varify Status
        User.verified = True

        # commit changes
        db.session.commit()

        response = {
            "success": True,
            "message": "Email Verified Successfully."
        }
        return make_response(jsonify(response)), 201

    # If decode generates error
    except Exception:
        response = {
            "success": False,
            "message": "Something Went Wrong, Please Use Valid Email Verification Link."
        }
        return make_response(jsonify(response)), 422
