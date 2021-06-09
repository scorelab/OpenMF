import sqlite3 as sql
import os
from flask import Blueprint, render_template, jsonify, request
from flask_login import login_required, current_user
from ..models.models import Case, CaseSchema
from .. import db

ROOT_DIR = os.getcwd()

case_schema = CaseSchema()
cases_schema = CaseSchema(many=True)

data = Blueprint('data', __name__, url_prefix='/data')
dirname = os.path.dirname(__file__)
cases_data_path = os.path.join(dirname, '../../../data/')

@data.route('/<case_name>/sms',methods = ["GET"])
def sms(case_name):
    File = cases_data_path +  case_name + "/tsv/" + "sms.tsv"
    os.chdir(ROOT_DIR)
    return File
