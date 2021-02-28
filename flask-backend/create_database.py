from api.models.models import User
from api.models.RoleRequest import RoleRequest
from api import db, create_app

db.create_all(app=create_app())