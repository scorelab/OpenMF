"""
Schema for admin model
"""
from api.extansions import ma


class AdminSchema(ma.Schema):
    """
    Schema for admin model
    """
    class Meta:
        fields = ('name', 'email', 'public_id', 'verified', 'created_on', 'updated_on', 'role')