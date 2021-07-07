import sqlite3 as sql
import os
import json
from flask import Blueprint, jsonify, request, make_response
from api.models.case import Case
from api.schema.case import CaseSchema
from api.extansions import db
from api.utils.jwt_decorators import (
    admin_or_extractor_token_required,
    token_required
)
from api.helpers.case import getDirectoryTree
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



@case.route('/case-tree', methods=["GET", "POST"])
@token_required
def case_tree():
    """
    Route that would give sub-directories and
    files that reside inside a give case.
    """

    ## Get case_name
    try:
        req = request.get_json()
        case_name = req['case_name']

    ## Throw Error if case_name is not provided
    except Exception as e:
        response = {
            "success": False,
            "message": "Please Provide A Case Name."
        }
        return make_response(jsonify(response)), 422

    ## Find case with given name
    case = Case.query.filter_by(case_name=case_name).first()

    ## Check if case with given name exists or not
    if not case:
        response = {
            "success": False,
            "message": "Case not found."
        }
        return make_response(jsonify(response)), 404

    ## absolute path of case
    case_path = case.data_path

    ## get directory-tree with given case_name
    try:
        directory_tree = {}
        getDirectoryTree(tree=directory_tree, rootDirectory=case_path, rootDirectoryName=case_name)

        ## create resposne
        response = {
            "success": True,
            "message": "Tree Fetched.",
            "case": case_schema.dump(case),
            "tree": json.dumps(directory_tree),
        }
        return make_response(jsonify(response)), 200

    ## Response if something went wrong.
    except Exception as e:
        response = {
            "success": False,
            "message": "something went wrong."
        }
        return make_response(jsonify(response)), 500

