from flask import Flask 
from flask_sqlalchemy import SQLAlchemy 
from flask_login import LoginManager 
from flask_marshmallow import Marshmallow
from flask_cors import CORS, cross_origin
from flask_jwt_extended import get_jwt_identity, JWTManager, jwt_required

db = SQLAlchemy()
ma = Marshmallow()

def create_app():
    app = Flask(__name__)
    cors = CORS(app)

    app.config['SECRET_KEY'] = 'thisismysecretkeydonotstealit'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Setup jwt
    app.config["JWT_SECRET_KEY"] = "thisisasecret"
    jwt = JWTManager(app)

    db.init_app(app)

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

    @login_manager.request_loader
    @jwt_required()
    def load_user_from_request(request):

        # Get token from auth header
        token = request.headers.get('Authorization')
        if token:
            token = token.replace('Bearer ', '', 1)
            email = get_jwt_identity()
            user = User.query.filter_by(email=email).first()
            if user:
                return user

        #Return none if no token present                
        return None

    from .userAuthentication.auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint)

    from .routes.user import user as user_blueprint
    app.register_blueprint(user_blueprint)

    from .routes.case import case as case_blueprint
    app.register_blueprint(case_blueprint)

    from .routes.extraction import extraction as extraction_blueprint
    app.register_blueprint(extraction_blueprint)

    return app