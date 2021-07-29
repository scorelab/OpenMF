import os
from flask import Blueprint
from api.models.case import Case
from api.schema.case import CaseSchema
from api.extansions import db

ROOT_DIR = os.getcwd()

case_schema = CaseSchema()
cases_schema = CaseSchema(many=True)

report = Blueprint('report', __name__, url_prefix='/report')
dirname = os.path.dirname(__file__)
cases_data_path = os.path.join(dirname, '../../../data/')
