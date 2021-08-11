"""
Class definition for BlackList token.
"""

# Importing Dependencies
from api.extansions import db


# Model Class Definition
class BlacklistedToken(db.Model):
    __tablename__ = "token_blacklist"

    # Property Declaration
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    token = db.Column(db.String(500), unique=True, nullable=False)
    blacklisted_on = db.Column(db.DateTime, default=db.func.now())

    # Initialize Token
    def __init__(self, token):
        """
        Constructor for BlackListedToken Model Class.
        """
        self.token = token

    def __repr__(self):
        """
         Official way of representing BlackListedToken Instance.
        """
        return f"<BlacklistToken token={self.token} >"

    @classmethod
    def check_blacklist(cls, token):
        """
        Returns True if token already exists in blacklisted_token.
        """
        exists = cls.query.filter_by(token=token).first()
        return True if exists else False
