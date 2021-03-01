import sqlite3 as sql
import time
from flask import Blueprint, render_template, jsonify, request
from flask_login import login_required, current_user
from ..models.models import User, UserSchema
from werkzeug.security import generate_password_hash, check_password_hash
from .. import db, auto
from sqlalchemy import text

analytics = Blueprint('analytics', __name__, url_prefix='/analytics')

@analytics.route('/query', methods=['POST'])
@auto.doc('analytics')
def execute_query():
    try:
        req = request.get_json()
        query = str(req['query'])
    except:
        return 'please provide a query', 400
    sql = text(query)
    result = db.engine.execute(sql)
    return jsonify(result)