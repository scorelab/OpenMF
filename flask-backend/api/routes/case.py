"""
Routes to handle request related to case.
"""

# Import dependencies
import sqlite3 as sql
import os
import json
from flask import Blueprint, jsonify, request, make_response
from api.models.case import Case
from api.models.extractor import Extractor
from api.schema.case import CaseSchema
from api.schema.extractor import ExtractorSchema
from api.extansions import db
from api.helpers.case import getDirectoryTree
from api.helpers.users import get_current_user
from api.utils.jwt_decorators import (
    token_required
)


# Root directory path
ROOT_DIR = os.getcwd()

# Create schema objects
case_schema = CaseSchema()
cases_schema = CaseSchema(many=True)
extractor_schema = ExtractorSchema()
extractors_schema = ExtractorSchema(many=True)

# Case Blueprint
case = Blueprint('case', __name__, url_prefix='/case')


@case.route('/count', methods=["GET"])
def count():
    """
    Route to get total numbers of cases
    present in database( For development purpose ).
    """
    return jsonify({'status':200,
                    'total_users':Case.query.count()})


@case.route('/list', methods=["GET"])
def list():
    """
    Listing all the cases present in
    the database( For development purpose ).
    """
    all_cases = Case.query.order_by(Case.timestamp).all()
    result = cases_schema.dump(all_cases)
    return jsonify(result)


@case.route('/delete', methods=['POST'])
def deletecase():
    """
    Route to handle deletion of a case
    using case name.
    """
    # check if case_name is provided
    try:
        req = request.get_json()
        case_name = str(req['case_name'])
    except:
        return 'please provide a case name', 400

    # Retrive case using case_name
    case = Case.query.filter_by(case_name=case_name).first()

    # check for existance of case
    if not case:
        return 'case with that name does not exist', 404

    # delete and commit in database session
    db.session.delete(case)
    db.session.commit()

    return 'case deleted', 202


@case.route('/open/<case_name>', methods=["GET"])
def openCase(case_name):
    """
    Route to get path of all files inside
    a directory of case.
    """
    os.chdir('../../..')
    path = os.getcwd()+'/data/'+case_name
    os.chdir(ROOT_DIR)
    files = os.listdir(path)
    return files


@case.route('/list-files/<case_name>/<folder_name>', methods=["GET"])
def openFolder(case_name, folder_name):
    """
    Route to open a particular folder.
    """
    os.chdir('../../..')
    path = os.getcwd()+'/data/'+case_name+'/'+folder_name
    os.chdir(ROOT_DIR)
    files = os.listdir(path)
    return files


@case.route('/list-files/<case_name>/<folder_name>/<file_name>', methods=["GET"])
def openFile(case_name, folder_name, file_name):
    """
    Route to open a particular file
    of a case directory.
    """
    os.chdir('../../..')
    File = os.getcwd()+'/data/'+case_name+'/'+folder_name+'/'+file_name
    os.chdir(ROOT_DIR)
    return File


@case.route('/extracted-cases', methods=["GET"])
@token_required
def extracted_cases():
    """
    Route to get all extracted cases of
    an admin or extractor.
    """

    ## Get current user object
    current_user = get_current_user(extracted_cases.role, extracted_cases.public_id)

    ## check for admin user
    if current_user.role == "admin":
        cases = []
        for i in current_user.extractor_members:
            cases_json = cases_schema.dump(i.extracted_cases)
            if len(cases_json) > 0:
                cases.extend(cases_json)
        response = {
            "success": True,
            "message": "Cases fetched.",
            "cases": cases
        }
        return make_response(jsonify(response)), 200

    # check for management member
    elif current_user.role == "management":
        cases = []
        for i in current_user.admin.extractor_members:
            cases_json = cases_schema.dump(i.extracted_cases)
            if len(cases_json) > 0:
                cases.extend(cases_json)
        response = {
            "success": True,
            "message": "Cases fetched.",
            "cases": cases
        }
        return make_response(jsonify(response)), 200

    # check for extractor member
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

    ## get details of extractor
    extractor_detail = extractor_schema.dump(case.extractor)

    ## dump case
    case_json = case_schema.dump(case)

    ## attach extractor detail with case_json
    case_json['extractor_detail'] = extractor_detail

    ## get directory-tree with given case_name
    try:
        directory_tree = {}
        getDirectoryTree(tree=directory_tree, rootDirectory=case_path, rootDirectoryName=case_name)

        ## create resposne
        response = {
            "success": True,
            "message": "Tree Fetched.",
            "case": case_json,
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

