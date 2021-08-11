"""
Class defintion for Case Model.
"""


# Importing Dependecies
from api.extansions import db
from flask_login import UserMixin


# Model Class
class Case(UserMixin, db.Model):
    __tablename__ = "case"

    # Propertry Declaration
    id = db.Column(db.Integer, primary_key=True)
    case_name = db.Column(db.String(100), unique=True)
    data_size = db.Column(db.String(100), default="none")
    extracted_on = db.Column(db.DateTime, default=db.func.now())
    extractor_id =  db.Column(db.Integer, db.ForeignKey("extractor.id"))
    data_path = db.Column(db.String(100))
    device_id = db.Column(db.String(100))

    # Initalize Properties
    def __init__(self, case_name, device_id, data_path, extractor):
        self.case_name = case_name
        self.device_id = device_id
        self.extractor = extractor
        self.data_path = data_path

    def __repr__(self):
        """
        Official way of representing Case Object.
        """
        return f"<Case case_name={self.case_name} extractor={self.extractor.email}>"

