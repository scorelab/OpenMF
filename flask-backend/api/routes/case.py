import sqlite3 as sql
import os
from flask import Blueprint, render_template, jsonify, request
from flask_login import login_required, current_user
from ..models.models import Case, CaseSchema
from .. import db

ROOT_DIR = os.getcwd()

case_schema = CaseSchema()
cases_schema = CaseSchema(many=True)

case = Blueprint('case', __name__, url_prefix='/case')

dirname = os.path.dirname(__file__)
cases_data_path = os.path.join(dirname, '../../../data/')


@case.route('/count', methods=["GET"])
def count():
    try:
        os.chdir('../../..')
        os.chdir(ROOT_DIR)
        cases = os.listdir(cases_data_path)
    except FileNotFoundError as err:
        # If data folder is not found, return empty list as no cases have been created
        response = {
            'success': True,
            'data': 0,
        }
        return jsonify(response), 200
    response = {
        'success': True,
        'data': len(cases),
    }
    return jsonify(response), 200


@case.route('/list', methods=["GET"])
def list():
    try:
        os.chdir('../../..')
        os.chdir(ROOT_DIR)
        cases = os.listdir(cases_data_path)
    except FileNotFoundError as err:
        # If data folder is not found, return empty list as no cases have been created
        response = {
            'success': True,
            'data': [],
        }
        return jsonify(response), 200
    response = {
        'success': True,
        'data': cases,
    }
    return jsonify(response), 200


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
