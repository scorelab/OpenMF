"""
Class definition for Base User Model.
"""
from flask import current_app
from api.extansions import db, bcrypt

from uuid import uuid4


class BaseUser(db.Model):
    """ Class definition for Base User Model."""
    __abstract__=True
    name = db.Column(db.String(255), nullable=False, unique=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    password_hash = db.Column(db.String(255), nullable=False)
    varified = db.Column(db.Boolean, default=False)
    logged_in = db.Column(db.Boolean, default=False)
    created_on = db.Column(db.DateTime, default=db.func.now())
    updated_on = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())
    public_id = db.Column(db.String(255), nullable=False, default=lambda: str(uuid4()))

    def __init__(self, name, email, password):
        """
        Constructor for base user model.
        """
        self.name = name
        self.email = email
        self.password = password

    @property
    def password(self):
        """
        Write only password field.
        """
        raise AttributeError("Password: write only access.")

    @password.setter
    def password(self, password):
        """
        Storing password as password_hash.
        """
        log_rounds =  current_app.config.get("BCRYPT_LOG_ROUNDS")
        hash_bytes = bcrypt.generate_password_hash(password, log_rounds)
        self.password_hash = hash_bytes.decode("utf-8")

    def check_password(self, password):
        """
        Comparing pasword with password_hash.
        """
        return bcrypt.check_password_hash(self.password_hash, password)

    def __repr__(self):
        """
        Official way of representing user in db.
        """
        return (
            f"<User email={self.email}, public_id={self.public_id}"
        )