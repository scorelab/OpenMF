"""
Class definition for BlackList token.
"""
from api.extansions import db


class BlacklistedToken(db.Model):
    __tablename__ = "token_blacklist"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    token = db.Column(db.String(500), unique=True, nullable=False)
    blacklisted_on = db.Column(db.DateTime, default=db.func.now())

    def __init__(self, token):
        self.token = token


    def __repr__(self):
        return f"<BlacklistToken token={self.token} >"

    @classmethod
    def check_blacklist(cls, token):
        """
        Returns True if token already exists in blacklisted_token.
        """
        exists = cls.query.filter_by(token=token).first()
        return True if exists else False
