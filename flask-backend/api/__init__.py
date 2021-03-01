from flask import Flask 
from flask_sqlalchemy import SQLAlchemy 
from flask_login import LoginManager 
from flask_marshmallow import Marshmallow
from flask_cors import CORS, cross_origin
from flask_selfdoc import Autodoc


db = SQLAlchemy()
ma = Marshmallow()

app = Flask(__name__)

cors = CORS(app)
auto = Autodoc(app)

app.config['SECRET_KEY'] = 'thisismysecretkeydonotstealit'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

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

from .userAuthentication.auth import auth as auth_blueprint
app.register_blueprint(auth_blueprint)

from .routes.user import user as user_blueprint
app.register_blueprint(user_blueprint)

from .routes.case import case as case_blueprint
app.register_blueprint(case_blueprint)

from .routes.extraction import extraction as extraction_blueprint
app.register_blueprint(extraction_blueprint)

@app.route('/')
def documentation():
    return auto.html(groups=['auth', 'admin', 'analytics', 'cases', 'extraction', 'user'], title='OpenMF Flask Server', template='doc_template.html')