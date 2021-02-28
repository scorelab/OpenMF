import time
from flask_login import UserMixin

from .. import db, ma

class RoleRequest(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    admin_id = db.Column(db.Integer)
    requested_role = db.Column(db.String(100))
    timestamp = db.Column(db.Float)
    
    def __init__(self, user_id, admin_id, requested_role):
      self.user_id = user_id
      self.admin_id = admin_id
      self.requested_role = requested_role
      self.timestamp = int(time.time())
    
    # Return object is JSON format
    def map(self):
      return {
        'id': self.id,
        'user_id': self.user_id,
        'admin_id': self.admin_id,
        'requested_role': self.requested_role,
        'timestamp': self.timestamp,
      }
        

class RoleRequestSchema(ma.Schema):
    class Meta:
        fields = ('id', 'user_id', 'admin_id', 'requested_role', 'timestamp')