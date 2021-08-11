"""
Decorators that decode and verify authorization tokens.
"""

# Importing Dependecies
from functools import wraps
from flask import request
from api.models.admin import Admin
from api.models.extractor import Extractor
from api.models.management import Management
from api.utils.exceptions import ApiForbidden, ApiUnauthorized


def token_required(f):
    """
    Execute function if request contains valid access token.
    """
    @wraps(f)
    def decorated(*args, **kargs):

        # Get Token Payload
        token_payload = _check_access_token(admin_only=False)

        # Set Each Property to lower function
        for name, val in token_payload.items():
            setattr(decorated, name, val)
        return f(*args, **kargs)

    return decorated


def admin_token_required(f):
    """
    Execute function if request contains valid access token and user id admin.
    """

    @wraps(f)
    def decorated(*args, **kargs):

        # Get Admin Token Payload
        token_payload = _check_access_token(role="admin",admin_only=True)

        # Check for admin role
        if token_payload["role"] != "admin":
            raise ApiForbidden()

        # Set Each Property to lower function
        for name, val in token_payload.items():
            setattr(decorated, name, val)
        return f(*args, **kargs)

    return decorated



def extractor_token_required(f):
    """
    Execute funcion if request contains valid access token and user id extractor.
    """
    @wraps(f)
    def decorated(*args, **kargs):

        # Get Extarctor Token Payload
        token_paylaod = _check_access_token(role="extractor", admin_only=False)

        # Check for extractor role
        if token_paylaod["role"] != "extractor":
            raise ApiForbidden()

        # Set each property to lower function
        for name, val in token_paylaod.items():
            setattr(decorated, name, val)
        return f(*args, **kargs)
    return decorated



def management_token_required(f):
    """
    Execute funcion if request contains valid access token and user id management.
    """
    @wraps(f)
    def decorated(*args, **kargs):

        # Get Management Token Payload
        token_paylaod = _check_access_token(role="management",admin_only=False)

        # Check for management role
        if token_paylaod["role"] != "management":
            raise ApiForbidden()

        # Set each property to lower function
        for name, val in token_paylaod.items():
            setattr(decorated, name, val)
        return f(*args, **kargs)
    return decorated

def admin_or_extractor_token_required(f):
    """
    Execute funcion if request contains valid access
    token and user id of an admin or extractor.
    """
    @wraps(f)
    def decorated(*args, **kargs):

        # Get token
        token_paylaod = _check_access_token(admin_only=False)

        # Check for role ( Either Admin or Extractor )
        if token_paylaod["role"] != "admin" and token_paylaod["role"] != "extractor":
            raise ApiForbidden()

        # Set each property to lower function
        for name, val in token_paylaod.items():
            setattr(decorated, name, val)
        return f(*args, **kargs)
    return decorated



def _check_access_token(role="admin",admin_only=True):
    """
    Function to Check Access Token based on role.
    """

    # Get Token From request header
    token = request.headers.get("Authorization")

    # Check for token
    if not token:
        raise ApiUnauthorized(description="Unauthorized", admin_only=admin_only)

    # Check for diffrent Roles
    if role == "admin":
        result = Admin.decode_access_token(token)
    elif role == "extractor":
        result = Extractor.decode_access_token(token)
    else:
        result = Management.decode_access_token(token)

    # Raise Error if fail
    if result.failure:
        raise ApiUnauthorized(
            description=result.error,
            admin_only=admin_only,
            error="invalid_token",
            error_description=result.error,
        )

    # Return Result Object's value ( user paylaod in dict. type )
    return result.value
