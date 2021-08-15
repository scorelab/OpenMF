"""
Class definition of admin model
"""

# Importing Dependencies
from api.models.base_user import BaseUser
from api.extansions import db


# Model Class Definition
class Admin(BaseUser):
    __tablename__="admin"

    # Properties Declaration
    id = db.Column(db.Integer, unique=True, primary_key=True)
    role = db.Column(db.String(255), default="admin")
    extractor_members = db.relationship("Extractor", backref="admin", cascade="all, delete, delete-orphan", lazy=True)
    management_members = db.relationship("Management", backref="admin", cascade="all, delete, delete-orphan", lazy=True)
    assigned_tasks = db.relationship("Task", backref="admin", cascade="all, delete, delete-orphan", lazy=True)

    def __init__(self, name, email, password):
        """
        Constructor for admin uesr model.
        """
        super().__init__(name, email,password)

    def __repr__(self):
        """
        Official way of representing admin user in db.
        """
        return (
            f"<Admin email={self.email}, public_id={self.public_id}>"
        )
