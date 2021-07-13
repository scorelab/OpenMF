import os
from flask import Flask
from flask.helpers import make_response
from flask.json import jsonify
from flask_cors import CORS

from .config import get_config
from .extansions import db, ma, migrate, bcrypt

from api.models.admin import Admin
from api.models.extractor import Extractor
from api.models.management import Management
from api.models.case import Case
from api.models.task import Task

from api.userAuthentication.auth import auth as auth_blueprint
from api.routes.user import user as user_blueprint
from api.routes.analytics import analytics as analytics_blueprint
from api.routes.case import case as case_blueprint
from api.routes.extraction import extraction as extraction_blueprint
from api.routes.commonwords import common as common_blueprint
from api.routes.data import data as data_blueprint
from api.routes.task import task as task_blueprint
from api.routes.search import keyword as keyword_blueprint


def create_app():
    """
    FLask Appication
    """
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(get_config(os.environ.get("FLASK_ENV")))

    # Register extenstions
    db.init_app(app)
    migrate.init_app(app, db)
    ma.init_app(app)

    # Register routes
    app.register_blueprint(auth_blueprint)
    app.register_blueprint(user_blueprint)
    app.register_blueprint(analytics_blueprint)
    app.register_blueprint(case_blueprint)
    app.register_blueprint(data_blueprint)
    app.register_blueprint(extraction_blueprint)
    app.register_blueprint(task_blueprint)
    app.register_blueprint(common_blueprint)
    app.register_blueprint(keyword_blueprint)


    # Register a shell context
    register_shell_context(app)
    return app


def register_shell_context(app):
    """
    Add/register a shell context session.
    """
    def shell():
        return {
            "db":db,
            "Admin": Admin,
            "Extractor": Extractor,
            "Management": Management,
            "Case": Case,
            "Task": Task
        }
    app.shell_context_processor(shell)
