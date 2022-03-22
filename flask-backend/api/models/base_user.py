"""
Class definition for Base User Model.
"""

# Importing Dependencies
from flask import current_app
import jwt
from api.extansions import db, bcrypt
from api.utils.result import Result
from api.models.token_blacklist import BlacklistedToken
from uuid import uuid4
from datetime import datetime, timezone, timedelta



# Model Class Definition
class BaseUser(db.Model):
    """ Class definition for Base User Model."""
    __abstract__=True

    # Properties Declaration
    name = db.Column(db.String(255), nullable=False, unique=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    password_hash = db.Column(db.String(255), nullable=False)
    verified = db.Column(db.Boolean, default=False)
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

    # Class Method for searching in Admin Class
    @classmethod
    def find_by_email(cls, email):
        return cls.query.filter_by(email=email).first()

    @classmethod
    def find_by_id(cls, id):
        return cls.query.get(id)

    @classmethod
    def find_by_pubic_id(cls, public_id):
        return cls.query.filter_by(public_id=public_id)

    # Methods for encoding and Decoding
    def encode_access_token(self):
        """
        Generating jwt access tokens.
        """

        # Token Properties
        now = datetime.now(timezone.utc)
        token_age_h = current_app.config.get("TOKEN_EXPIRE_HOURS")
        token_age_min = current_app.config.get("TOKEN_EXPIRE_MINUTES")
        expires = now + timedelta(hours=token_age_h, minutes=token_age_min)

        # Check for TESTING environment
        if current_app.config.get("TESIING"):
            expires = now + timedelta(seconds=5)

        # Create Payload
        payload = dict(exp=expires, iat=now, sub=self.public_id, role=self.role)

        # Get secret key
        key = current_app.config.get("SECRET_KEY")

        # Return encoded user
        return jwt.encode(payload, key, algorithm="HS256")

    @staticmethod
    def decode_access_token(access_token):
        """
        Decodes the access token.
        """

        # Check for token type
        if isinstance(access_token, bytes):
            access_token = access_token.decode("ascii")

        # Check for Bearer
        if access_token.startswith("Bearer"):
            split = access_token.split("Bearer")
            access_token = split[1].strip()
        try:
            key = current_app.config.get("SECRET_KEY")
            payload = jwt.decode(access_token, key, algorithms="HS256")

        # Handle Errors
        except jwt.ExpiredSignatureError:
            error = "Access token expired, Please login again."
            return Result.Fail(error_message=error)

        except jwt.InvalidTokenError:
            error = "Invalid token. Please  log in again."
            return Result.Fail(error_message=error)

        if BlacklistedToken.check_blacklist(access_token):
            error = "Token blacklisted. Please try to log in again."
            return Result.Fail(error_message=error)

        # Following keys would be accessible
        # to decorated functinos
        user_dict = dict(
            public_id=payload["sub"],
            role = payload["role"],
            token=access_token,
            expires_at=payload["exp"],
        )

        return Result.Ok(value=user_dict)

