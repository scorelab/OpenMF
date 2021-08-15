"""
Class definition of Task Model.
"""

# Importing Dependecies
from api.extansions import db
import datetime as dt


# Model Class Definition
class Task(db.Model):
    __tablename__="task"

    # Property Declaration
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    assinged_on = db.Column(db.DateTime, nullable=False, default=db.func.now())
    due_on = db.Column(db.DateTime, nullable=True)
    admin_id = db.Column(db.Integer, db.ForeignKey("admin.id"), nullable=False)
    is_completed = db.Column(db.Boolean, default=False)
    extractor_id = db.Column(db.Integer, db.ForeignKey("extractor.id"), nullable=True)
    management_id = db.Column(db.Integer, db.ForeignKey("management.id"), nullable=True)

    def __init__(self, title, admin, extractor=None, management=None,description=None, due_on=None):
        """
        Initializing columns.
        """
        self.title = title
        self.admin = admin
        self.due_on = due_on if due_on != None else (dt.date.today() + dt.timedelta(days=7))
        self.description = description if description != None else "Not Given"
        if extractor and management:
            raise AttributeError("Can't assign one task to extractor and management member.")
        elif extractor:
            self.extractor = extractor
        elif management:
            self.management = management
        else:
            raise AttributeError("Please select one member.")

    def __repr__(self):
        """
        Official way of representing task object.
        """
        return f"<Task title={self.title}, admin={self.admin.email}>"
