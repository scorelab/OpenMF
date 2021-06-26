import sqlite3 as sql
import os
from flask import Blueprint, jsonify, request, make_response
from api.models.case import Case
from api.schema.case import CaseSchema
from api.extansions import db
from api.utils.jwt_decorators import (
    admin_or_extractor_token_required
)
from api.helpers.users import get_current_user

ROOT_DIR = os.getcwd()

case_schema = CaseSchema()
cases_schema = CaseSchema(many=True)

case = Blueprint('case', __name__, url_prefix='/case')

@case.route('/count', methods=["GET"])
def count():
    return jsonify({'status':200,
                    'total_users':Case.query.count()})

@case.route('/list', methods=["GET"])
def list():
    all_cases = Case.query.order_by(Case.timestamp).all()
    result = cases_schema.dump(all_cases)
    return jsonify(result)

@case.route('/delete', methods=['POST'])
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
def openCase(case_name):
    os.chdir('../../..')
    path = os.getcwd()+'/data/'+case_name
    os.chdir(ROOT_DIR)
    files = os.listdir(path)
    return files

@case.route('/list-files/<case_name>/<folder_name>', methods=["GET"])
def openFolder(case_name, folder_name):
    os.chdir('../../..')
    path = os.getcwd()+'/data/'+case_name+'/'+folder_name
    os.chdir(ROOT_DIR)
    files = os.listdir(path)
    return files

@case.route('/list-files/<case_name>/<folder_name>/<file_name>', methods=["GET"])
def openFile(case_name, folder_name, file_name):
    os.chdir('../../..')
    File = os.getcwd()+'/data/'+case_name+'/'+folder_name+'/'+file_name
    os.chdir(ROOT_DIR)
    return File

@case.route('/extracted-cases', methods=["GET"])
@admin_or_extractor_token_required
def extracted_cases():
    """
    Route to get all extracted cases of
    an admin or extractor.
    """
    current_user = get_current_user(extracted_cases.role, extracted_cases.public_id)
    if current_user.role == "admin":
        cases = []
        for i in current_user.extractor_members:
            cases_json = cases_schema.dump(i.extracted_cases)
            if len(cases_json) > 0:
                cases.append(cases_json)
        response = {
            "success": True,
            "message": "Cases fetched.",
            "cases": cases
        }
        return make_response(jsonify(response)), 200

    # for extractor
    cases_json = cases_schema.dump(current_user.extracted_cases)
    response = {
        "success": True,
        "message": "Cases fetched.",
        "cases": cases_json
    }
    return make_response(jsonify(response)), 200

