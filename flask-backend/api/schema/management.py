"""
Schema for management model
"""

from api.extansions import ma


class ManagementSchema(ma.Schema):
    """
    Schema for admin model
    """
    class Meta:
        fields = ('name', 'email', 'public_id', 'verified', 'created_on', 'updated_on', 'role')