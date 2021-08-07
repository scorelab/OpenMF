"""
Routes to handle request related to case.
"""

# Import dependencies
import sqlite3 as sql
import os
import json
import datetime
from flask import Blueprint, jsonify, request, make_response, send_file
from flask.wrappers import Response
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
    return jsonify({'status': 200,
                    'total_users': Case.query.count()})


@case.route('/list', methods=["GET"])
def list():
    """
    Listing all the cases present in
    the database( For development purpose ).
    """
    all_cases = Case.query.order_by(Case.extracted_on).all()
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


@case.route('/filter', methods=['POST'])
def filter():
    '''
        Route to filter the cases in range of date.
        If starting date will not be provided it will 
        return cases till the end date.
        If both not provided all cases will be shown.
        If starting date is provided and no end date then 
        cases from starting date till present date will be shown.
    '''
    try:
        req = request.get_json()

        from_date = str(req['starting_date'])

        to_date = str(req['end_date'])

        if not to_date:
            '''
            if end date is not there
            then end date will be the present date.
            '''
            to_date = str(datetime.date.today())

    except Exception as e:
        response = {
            "success": False,
            "message": "please provide date."
            }
        return make_response(jsonify(response)), 404

    all_cases = Case.query.all()

    case_filtered = []

    for cases in all_cases:

        time = (str(cases.extracted_on)).split()

        time = time[0]

        if time >= from_date and time <= to_date:
            case_filtered.append((cases.data_path, cases.extracted_on))

    if case_filtered:

        return jsonify(case_filtered)
    else:
        response = {
            "success": False,
            "message": "No case found in this range"
        }
        return make_response(jsonify(response)), 404


@case.route('/get-file', methods=['POST'])
@token_required
def _get_file():
    """
    Route to handle sending file content from
    server.

    Parameters:
    1. file_pathname: Name of the file that user want to get.

    Result:
    Returns a file object, otherwise error object.
    """

    # Get current user object
    current_user = get_current_user(_get_file.role, _get_file.public_id)

    # Get file pathname
    try:
        req = request.get_json()
        file_pathname = req['file_pathname']

    # Throw Error if file_pathname is not provided
    except Exception as e:
        response = {
            "success": False,
            "message": "Please Provide File Pathname."
        }
        return make_response(jsonify(response)), 422

    # send file of provided file name
    try:
        file = send_file(filename_or_fp=file_pathname, as_attachment=False, mimetype='application/blob')
        return make_response(file), 200

    # handle FileNOtFOund error
    except FileNotFoundError as e:
        response = {
            "success": False,
            "message": "File Not Found."
        }
        return make_response(jsonify(response)), 404

    # Handle other errors
    except Exception as e:
        print(e)
        response = {
            "success": False,
            "message": "Something went wrong."
        }
        return make_response(jsonify(response)), 500


@case.route('/extracted-cases', methods=["GET"])
@token_required
def extracted_cases():
    """
    Route to get all extracted cases of
    an admin or extractor.
    """

    # Get current user object
    current_user = get_current_user(extracted_cases.role, extracted_cases.public_id)

    # check for admin user
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

    # Get case_name
    try:
        req = request.get_json()
        case_name = req['case_name']

    # Throw Error if case_name is not provided
    except Exception as e:
        response = {
            "success": False,
            "message": "Please Provide A Case Name."
        }
        return make_response(jsonify(response)), 422

    # Find case with given name
    case = Case.query.filter_by(case_name=case_name).first()

    # Check if case with given name exists or not
    if not case:
        response = {
            "success": False,
            "message": "Case not found."
        }
        return make_response(jsonify(response)), 404

    # absolute path of case
    case_path = case.data_path

    # get details of extractor
    extractor_detail = extractor_schema.dump(case.extractor)

    # dump case
    case_json = case_schema.dump(case)

    # attach extractor detail with case_json
    case_json['extractor_detail'] = extractor_detail

    # get directory-tree with given case_name
    try:
        directory_tree = {}
        getDirectoryTree(tree=directory_tree,
                         rootDirectory=case_path, rootDirectoryName=case_name)

        # create resposne
        response = {
            "success": True,
            "message": "Tree Fetched.",
            "case": case_json,
            "tree": json.dumps(directory_tree),
        }
        return make_response(jsonify(response)), 200

    # Response if something went wrong.
    except Exception as e:
        response = {
            "success": False,
            "message": "something went wrong."
        }
        return make_response(jsonify(response)), 500


@token_required
@case.route('/get_case/<casename>', methods=["GET"])
def getCase(casename):
    """
    Route to get details of a case.
    """

    # get case from Case Model
    case = Case.query.filter_by(case_name=casename).first()

    # Check is case exits
    if(not case):
        response = {
            "success": False,
            "message": "Case Not Found."
        }
        return make_response(jsonify(response)), 404

    # IF case exits
    response = {
        "success": True,
        "message": "Case Fetched.",
        "case": case_schema.dump(case)
    }
    return make_response(jsonify(response)), 200
