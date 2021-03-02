import sqlite3 as sql
import os
from flask import Blueprint, render_template, jsonify, request
from flask_login import login_required, current_user
from ..models.models import Case, CaseSchema
from .. import db
from ..helpers.access_decorators import management_only

ROOT_DIR = os.getcwd()

case_schema = CaseSchema()
cases_schema = CaseSchema(many=True)

case = Blueprint('case', __name__, url_prefix='/case')

@case.route('/count', methods=["GET"])
@management_only
def count():
    return jsonify({'status':200,
                    'total_users':Case.query.count()})

@case.route('/list', methods=["GET"])
@management_only
def list():
    all_cases = Case.query.order_by(Case.timestamp).all()
    result = cases_schema.dump(all_cases)
    return jsonify(result)

@case.route('/delete', methods=['POST'])
@management_only
def deletecase():
    # check if case_name is provided
    try:
        req = request.get_json()
        case_name = str(req['case_name'])
    except:
        return 'please provide a case name', 400

    case = Case.query.filter_by(case_name=case_name).first()

    if not case:
        return 'case with that name does not exist', 404

    db.session.delete(case)
    db.session.commit()
    return 'case deleted', 202

@case.route('/open/<case_name>', methods=["GET"])
@management_only
def openCase(case_name):
    os.chdir('../../..')
    path = os.getcwd()+'/data/'+case_name
    os.chdir(ROOT_DIR)
    files = os.listdir(path)
    return files

@case.route('/list-files/<case_name>/<folder_name>', methods=["GET"])
@management_only
def openFolder(case_name, folder_name):
    os.chdir('../../..')
    path = os.getcwd()+'/data/'+case_name+'/'+folder_name
    os.chdir(ROOT_DIR)
    files = os.listdir(path)
    return files

@case.route('/list-files/<case_name>/<folder_name>/<file_name>', methods=["GET"])
@management_only
def openFile(case_name, folder_name, file_name):
    os.chdir('../../..')
    File = os.getcwd()+'/data/'+case_name+'/'+folder_name+'/'+file_name
    os.chdir(ROOT_DIR)
    return File