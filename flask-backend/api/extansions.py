""" All the additional Extention's instantiation, used in flask app. """


# Importing Dependecies
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_marshmallow import Marshmallow
from flask_bcrypt import Bcrypt
from flask_mail import Mail


# Invoking Extensions
migrate = Migrate()
db = SQLAlchemy()
ma = Marshmallow()
bcrypt = Bcrypt()
mail = Mail()