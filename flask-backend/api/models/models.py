from flask_login import UserMixin
from .. import db, ma
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.sql import case


class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    name = db.Column(db.String(100))
    role = db.Column(db.String(20))
    timestamp = db.Column(db.Float)
    has_admin = db.column_property(role != "adimn")
    _admin = db.Column(db.String(100))

    def __init__(self, email, password, name, role, timestamp):
        self.email = email
        self.password = password
        self.name = name
        self.role = role
        self.timestamp = timestamp
        self._admin = "Admin not assinged."
        
    @hybrid_property
    def admin(self):
        if(self.has_admin):
            return self._admin
        return 'None'

    @admin.setter
    def admin(self, email):
        self._admin = email


class Case(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    case_name = db.Column(db.String(100), unique=True)
    data_size = db.Column(db.String(100))
    timestamp = db.Column(db.Float)
    extractor_id = db.Column(db.Integer)
    data_path = db.Column(db.String(100))

    def __init__(self, case_name, data_size, timestamp, extractor_id, data_path):
        self.case_name = case_name
        self.data_size = data_size
        self.timestamp = timestamp
        self.extractor_id = extractor_id
        self.data_path = data_path

class UserSchema(ma.Schema):
    class Meta:
        fields = ('name', 'email', 'role', 'timestamp', 'admin')

class CaseSchema(ma.Schema):
    class Meta:
        fields = ('case_name', 'data_size', 'timestamp', 'extractor_id', 'data_path')