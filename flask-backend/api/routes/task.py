"""
Routes for task managemnet.
"""
from flask import Blueprint, jsonify, request
from http import HTTPStatus as status
from flask.helpers import make_response
from api.models.task import Task
from api.schema.task import TaskSchema
from api.models.admin import Admin
from api.models.extractor import Extractor
from api.models.management import Management
from api.utils.jwt_decorators import (
    token_required,
    admin_token_required,
)
from api.helpers.users import get_current_user
from api.extansions import db


# Schema Creation
task_schema = TaskSchema()
tasks_schema = TaskSchema(many=True)

# Declare Blueprint
task = Blueprint("task", __name__, url_prefix="/task")

@task.route('/all-tasks', methods=["GET"])
def get_all_tasks():
    "Route to get all tasks(Development purpose)."
    try:
        tasks = Task.query.all()
        if len(tasks) == 0:
            response = {
                "success": True,
                "message": "You Don't have any tasks."
            }
            return make_response(jsonify(response)), status.OK
        tasks_json = tasks_schema.dump(tasks)
        response = {
            "success": True,
            "message": "Tasks Fetched.",
            "tasks": tasks_json
        }
        return make_response(jsonify(response)), status.OK
    except Exception as e:
        response = {
            "success": False,
            "message": e
        }
        return make_response(jsonify(response)), status.INTERNAL_SERVER_ERROR


@task.route('/create', methods=["POST"])
@admin_token_required
def create():
    """
    Route to create and assign new tasks by admin.
    """
    current_user = get_current_user(create.role, create.public_id)
    try:
        req = request.get_json()
        title = str(req['title'])
        description = str(req['description'])
        extractor_email = None if str(req['extractor_email']) == "none" else str(req['extractor_email'])
        management_email = None if str(req['management_email']) == "none" else str(req['management_email'])
    except Exception as e:
        print(e)
        response = {
            "success": False,
            "message": "Please provide all parameters"
        }
        return make_response(jsonify(response)), status.UNPROCESSABLE_ENTITY
    extractor = None
    management = None
    # if no member selected
    if not extractor_email and not management_email:
        response = {
            "success": False,
            "message": "Please select atleast one member."
        }
        return make_response(jsonify(response)), status.UNPROCESSABLE_ENTITY
    elif extractor_email and management_email:
        response = {
            "success": False,
            "message": "Please select only one member."
        }
        return make_response(jsonify(response)), status.UNPROCESSABLE_ENTITY

    # Check for extractor member
    elif extractor_email != None:
        extractor = Extractor.query.filter_by(email = extractor_email).first()
        if not extractor:
            response = {
                "success": False,
                "message": "Extractor member not found."
            }
            return make_response(jsonify(response)), status.UNPROCESSABLE_ENTITY

    # check for manageement member
    elif management_email != None:
        management = Management.query.filter_by(email=management_email).first()
        if not management:
            response = {
                "success": False,
                "message": "management member not found."
            }
            return make_response(jsonify(response)), status.UNPROCESSABLE_ENTITY

    # Create new task
    new_task = Task(title=title, description=description, admin=current_user, extractor=extractor, management=management)
    try:
        db.session.add(new_task)
        db.session.commit()

    except Extractor as e:
        response = {
            "success": False,
            "message": e
        }
        return make_response(jsonify(response)), status.INTERNAL_SERVER_ERROR
    response = {
        "success": True,
        "message": "Task created.",
        "task": task_schema.dump(new_task)
    }
    return make_response(jsonify(response)), status.CREATED


@task.route('/todo-tasks', methods=["GET"])
@token_required
def todo_tasks():
    """
    Route to get all tasks assinged to a member.
    """
    current_user = get_current_user(todo_tasks.role, todo_tasks.public_id)

    # check for admin
    if current_user.role == "admin":
        response = {
            "success": False,
            "message": "Not found."
        }
        return make_response(jsonify(response)), status.NOT_FOUND

    tasks = list(filter(lambda task: task.is_completed==False, current_user.assigned_tasks))

    response = {
        "success": True,
        "message": "Tasks fetched.",
        "tasks": tasks_schema.dump(tasks)
    }

    return make_response(jsonify(response)), status.OK


@task.route('/completed-tasks', methods=["GET"])
@token_required
def completed_tasks():
    """
    Route to get all completed tasks of a member.
    """
    current_user = get_current_user(completed_tasks.role, completed_tasks.public_id)

    # check for admin
    if current_user.role == "admin":
        response = {
            "success": False,
            "message": "Not found."
        }
        return make_response(jsonify(response)), status.NOT_FOUND

    tasks = list(filter(lambda task: task.is_completed==True, current_user.assigned_tasks))

    response = {
        "success": True,
        "message": "Tasks fetched.",
        "tasks": tasks_schema.dump(tasks)
    }

    return make_response(jsonify(response)), status.OK


@task.route('/mark-complete/<int:id>', methods=["PUT"])
@token_required
def mark_complete(id):
    """
    Route to mark a task as complete by a member.
    """
    current_user = get_current_user(mark_complete.role, mark_complete.public_id)
    task = list(filter(lambda task: task.id == id, current_user.assigned_tasks))
    if len(task) == 0:
        response = {
            "success": False,
            "message": "Task not found."
        }
        return make_response(jsonify(response)), status.NOT_FOUND

    if task[0].is_completed:
        response = {
            "success": False,
            "message": "Task already completed."
        }
        return make_response(jsonify(response)), status.UNPROCESSABLE_ENTITY

    task[0].is_completed = True
    db.session.commit()
    response = {
        "success": True,
        "message": "Task marked as completed."
    }
    return make_response(jsonify(response)), status.CREATED


@task.route('/mark-incomplete/<int:id>', methods=["PUT"])
@token_required
def mark_incomplete(id):
    """
    Route to mark a task as incomplete by a member.
    """
    current_user = get_current_user(mark_incomplete.role, mark_incomplete.public_id)
    task = list(filter(lambda task: task.id == id, current_user.assigned_tasks))
    if len(task) == 0:
        response = {
            "success": False,
            "message": "Task not found."
        }
        return make_response(jsonify(response)), status.NOT_FOUND

    if not task[0].is_completed:
        response = {
            "success": False,
            "message": "Task already incomplete."
        }
        return make_response(jsonify(response)), status.UNPROCESSABLE_ENTITY

    task[0].is_completed = False
    db.session.commit()
    response = {
        "success": True,
        "message": "Task marked as incomplete."
    }
    return make_response(jsonify(response)), status.CREATED

@task.route('/assigned-tasks', methods=["GET"])
@admin_token_required
def assigned_tasks():
    """
    Route to get all created tasks by an admin.
    """
    current_user = get_current_user(assigned_tasks.role, assigned_tasks.public_id)
    tasks = current_user.assigned_tasks
    response = {
        "success": True,
        "message": "Tasks found.",
        "tasks": tasks_schema.dump(tasks)
    }
    return make_response(jsonify(response)), status.OK


@task.route('/delete/<int:id>', methods=["DELETE"])
@admin_token_required
def delete(id):
    """
    Route to handle deletion of a task by admin.
    """
    current_user = get_current_user(delete.role, delete.public_id)
    task = list(filter(lambda task: task.id == id, current_user.assigned_tasks))

    if len(task) == 0:
        response = {
            "success": False,
            "message": "Task not found."
        }
        return make_response(jsonify(response)), status.NOT_FOUND

    if task[0].is_completed:
        response = {
            "success": False,
            "message": "Task already completed."
        }
        return make_response(jsonify(response)), status.UNPROCESSABLE_ENTITY

    db.session.remove(task[0])
    db.session.commit()
    response = {
        "success": True,
        "message": "Task deleted."
    }
    return make_response(jsonify(response)), status.CREATED


@task.route('/edit-title', methods=["PUT"])
@admin_token_required
def edit_title():
    """
    Route to edit title of a task.
    """
    try:
        req = request.get_json()
        id = int(req['id'])
        title = str(req['title'])

    except Exception as e:
        print(e)
        response = {
            "success": False,
            "message": "Please provide all details."
        }
        return make_response(jsonify(response)), status.UNPROCESSABLE_ENTITY

    current_user = get_current_user(edit_title.role, edit_title.public_id)
    task = list(filter(lambda task: task.id == id, current_user.assigned_tasks))

    if len(task) == 0:
        response = {
            "success": False,
            "message": "Task not found."
        }
        return make_response(jsonify(response)), status.NOT_FOUND

    task[0].title = title
    db.session.commit()
    response = {
        "success": True,
        "message": "Title updated."
    }
    return make_response(jsonify(response)), status.CREATED


