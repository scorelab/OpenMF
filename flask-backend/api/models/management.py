"""
Class definition of management user model.
"""

# Importing Depedencies
from api.models.base_user import BaseUser
from api.extansions import db


# Model Class Definition
class Management(BaseUser):
    __tablename__="management"

    # Property Declaration
    id = db.Column(db.Integer, unique=True, primary_key=True)
    role = db.Column(db.String(255), default="management")
    admin_id = db.Column(db.Integer, db.ForeignKey("admin.id"))
    assigned_tasks = db.relationship("Task", backref="management", lazy=True)

    def __init__(self, name, email, password, admin, role="management"):
        """
        Constructor for management user model.
        """
        super().__init__(name, email, password)
        self.admin = admin
        self.role = role

    def __repr__(self):
        """
        Official way of representing management user in db.
        """
        return (
            f"<Management email={self.email}, public_id={self.public_id}, admin_email={self.admin.email}>"
        )