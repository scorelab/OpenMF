import os
from flask import Flask
from flask_login import LoginManager
from flask_cors import CORS

from .config import get_config
from .extansions import db, ma, migrate
from .models.models import User, Case


def create_app():
    """
    FLask Appication
    """
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(get_config(os.environ.get("FLASK_ENV")))

    db.init_app(app)
    migrate.init_app(app, db)

    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    from .models.models import User


    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))

    @login_manager.unauthorized_handler
    def unauthorized_handler():
        return 'You are not authorized to use this route. Please Logged In.', 401

    from .userAuthentication.auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint)

    from .routes.user import user as user_blueprint
    app.register_blueprint(user_blueprint)

    from .routes.case import case as case_blueprint
    app.register_blueprint(case_blueprint)

    from .routes.extraction import extraction as extraction_blueprint
    app.register_blueprint(extraction_blueprint)

    register_shell_context(app)
    return app


def register_shell_context(app):
    """
    Add/register a shell session
    """
    def shell():
        return {"db":db, "User": User, "case": Case}
    app.shell_context_processor(shell)