from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_marshmallow import Marshmallow
from flask_bcrypt import Bcrypt

migrate = Migrate()
db = SQLAlchemy()
ma = Marshmallow()
bcrypt = Bcrypt()