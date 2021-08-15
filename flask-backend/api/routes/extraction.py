'''
Routes to Extract Data and Get Live Connected Devices.
'''

import sys
import os
import sqlite3 as sql
from types import new_class
from flask import Blueprint, jsonify, request
import json
import re
import subprocess
from http import HTTPStatus as status
from flask.helpers import make_response
from api.models.case import Case
from api.schema.case import CaseSchema
from api.extansions import db
from api.utils.jwt_decorators import admin_or_extractor_token_required, extractor_token_required
from api.helpers.users import get_current_user
from api.models.case import Case

# Root Directory path
ROOT_DIR = os.getcwd()

# Create Schemas
case_schema = CaseSchema()
cases_schema = CaseSchema(many=True)

# Extraction blueprint
extraction = Blueprint('extraction', __name__, url_prefix='/extraction')

# Global variable for directory name
dirname = os.path.abspath(os.path.dirname(__file__))

# Global variable for cases path (data directory)
cases_path = os.path.abspath(os.path.join(dirname, '../../../data'))

# Assigning adb path accourding to os
OS_TYPE = sys.platform
if OS_TYPE == 'linux' or OS_TYPE == 'linux2':
    adb_path=os.path.join(dirname, '../../../tools/adb')
elif OS_TYPE== 'win32':
    adb_path=os.path.join(dirname, '../../../tools/adb.exe')
elif OS_TYPE== 'darwin':
    adb_path=os.path.join(dirname, '../../../tools/adb_mac')


@extraction.route('/list_devices', methods=["GET"])
@admin_or_extractor_token_required
def list_devices():
    '''
    This Route lists all the live connected devices.
    '''
    with open(os.devnull, 'wb') as devnull:
        subprocess.check_call([adb_path, 'start-server'], stdout=devnull,
                              stderr=devnull)
    out = (subprocess.check_output([adb_path, 'devices', '-l']).decode('utf-8')).splitlines()
    devices = []
    for line in out[1:]:
        device={}
        if not line.strip():
            continue
        if 'offline' in line:
            continue
        serial, _ = re.split(r'\s+', line, maxsplit=1)
        model = line[line.find('model:')+6:line.find('device:')].strip()
        device_codename = line[line.find('device:')+7:line.find('transport_id:')].strip()
        transpot_id = line[line.find('transport_id:')+13:].strip()
        device['serial'] = serial
        device['model'] = model
        device['device_codename'] = device_codename
        device['transpot_id'] = transpot_id
        devices.append(device)

    return json.dumps(devices)

@extraction.route('/extract_data', methods=["POST"])
@extractor_token_required
def extract():
    '''
    This Route handles data extraction
    from the connected device.
    '''
    # current extractor
    current_user = get_current_user(extract.role, extract.public_id)
    # if no data is provided at all
    try:
        req = request.get_json()
    except:
        return 'please provide id, case_name and data'

    # If a key is missing
    try:
        device_id = str(req['device_id'])
        case_name = str(req['case_name'])
        data = str(req['data'])
        tags = str(req['tags'])
        tags = tags.split(',')

    except KeyError as err:
        # Create failed response
        response = {
            "success": False,
            "message": f"Please Provide {str(err)}."
        }
        return make_response(jsonify(response)), 400

    # Check if case with similar name exits
    case = Case.query.filter_by(case_name=case_name).first()
    if case:
        response = {
            "success": False,
            "message": "case name already exists, please try again with a diffrent case name."
        }
        return make_response(jsonify(response)), status.UNPROCESSABLE_ENTITY


    sys.path.append(dirname + '../../../../apiUtility')
    from apiUtils import apiExtactAll, apiExtractFb, apiExtractWa, apiExtractPhone, apiReport, apiExtractSMS, apiExtractBrowser, apiExtractBluetooth, apiExtractLocation, apiExtractMedia


    if(data == 'all'):
        apiExtactAll(case_name)
        apiReport(case_name, tags)
    elif(data == 'facebook'):
        apiExtractFb(case_name)
        apiReport(case_name, tags)
    elif(data == 'whatsapp'):
        apiExtractWa(case_name)
        apiReport(case_name, tags)
    elif(data == 'message'):
        apiExtractSMS(case_name)
        apiReport(case_name, tags)
    elif(data == 'phone'):
        apiExtractPhone(case_name)
        apiReport(case_name, tags)
    elif(data == 'browser'):
        apiExtractBrowser(case_name)
        apiReport(case_name, tags)
    elif(data == 'report'):
        apiReport(case_name, tags)
    elif(data == 'bluetooth'):
        apiExtractBluetooth(case_name)
        apiReport(case_name, tags)
    elif(data == 'location'):
        apiExtractLocation(case_name)
        apiReport(case_name, tags)
    elif(data == 'media'):
        apiExtractMedia(case_name)
        apiReport(case_name, tags)
    else:
        response = {
            "success": False,
            "message": "Wrong data provided."
        }
        return make_response(jsonify(response)), status.UNPROCESSABLE_ENTITY

    # store the case path to Database
    new_case_path = cases_path + f"\{case_name}"
    new_case = Case(case_name=case_name, device_id=device_id, data_path=new_case_path, extractor=current_user)
    try:
        db.session.add(new_case)
        db.session.commit()
    except Exception:
        response = {
            "success": False,
            "message": "Something went wrong.",
        }
        return make_response(jsonify(response)), status.INTERNAL_SERVER_ERROR

    response = {
        "success": True,
        "message": "Data Extraction Successfull."
    }
    return make_response(jsonify(response)), status.CREATED
