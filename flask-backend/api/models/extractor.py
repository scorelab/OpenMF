"""
Class definition of extractor user model.
"""
from api.models.base_user import BaseUser
from api.extansions import db

class Extractor(BaseUser):
    __tablename__="extractor"
    id = db.Column(db.Integer, unique=True, primary_key=True)
    role = db.Column(db.String(255), default="extractor")
    admin_id = db.Column(db.Integer, db.ForeignKey("admin.id"))

    def __init__(self, name, email, password, admin):
        """
        Constructor for extractor user model.
        """
        super().__init__(name, email,password)
        self.admin = admin

    def __repr__(self):
        """
        Official way of representing extractor user in db.
        """
        return (
            f"<Extractor email={self.email}, public_id={self.public_id}, admin_email={self.admin.email}>"
        )