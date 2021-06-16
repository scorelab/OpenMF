"""
Helper functions for user routes.
"""
from api.models.admin import Admin
from api.models.extractor import Extractor
from api.models.management import Management


def get_current_user(role, public_id):
    if(role == "admin"):
        user = _get_user_by_public_id(Admin, public_id)
    elif(role == "extractor"):
        user = _get_user_by_public_id(Extractor, public_id)
    elif(role == "management"):
        user = _get_user_by_public_id(Management, public_id)
    else:
        raise AttributeError("Invalid role.")
    return user

def _get_user_by_public_id(User, public_id):
    return User.query.filter_by(public_id=public_id).first()
