"""
Schema for task model.
"""
from api.extansions import ma 

class TaskSchema(ma.Schema):
    class Meta:
        fields = ("title", "description", "assinged_on", "due_on", "is_completed", "admin_id")
