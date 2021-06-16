import sys
import os
import sqlite3 as sql
from flask import Blueprint, render_template, jsonify, request
import json
import re
import subprocess
from flask_login import login_required, current_user
from api.models.case import Case
from api.schema.case import CaseSchema
from api.extansions import db

ROOT_DIR = os.getcwd()

case_schema = CaseSchema()
cases_schema = CaseSchema(many=True)
dirname = os.path.abspath(os.path.dirname(__file__))
extraction = Blueprint('extraction', __name__, url_prefix='/extraction')

# Assigning adb path accourding to os
OS_TYPE = sys.platform
if OS_TYPE == 'linux' or OS_TYPE == 'linux2':
    adb_path=os.path.join(dirname, '../../../tools/adb')
elif OS_TYPE== 'win32':
    adb_path=os.path.join(dirname, '../../../tools/adb.exe')
elif OS_TYPE== 'darwin':
    adb_path=os.path.join(dirname, '../../../tools/adb_mac')


@extraction.route('/list_devices', methods=["GET"])
def list_devices():
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
def extract():

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
        print(data)
    except KeyError as err:
        return f'please provide {str(err)}', 400

    sys.path.append(dirname + '../../../../apiUtility')
    from apiUtils import apiExtactAll, apiExtractFb, apiExtractWa, apiExtractPhone, apiReport, apiExtractSMS
    if(data == 'all'):
        apiExtactAll(case_name)
    elif(data == 'facebook'):
        apiExtractFb(case_name)
    elif(data == 'whatsapp'):
        apiExtractWa(case_name)
    elif(data == 'message'):
        apiExtractSMS(case_name)
    elif(data == 'phone'):
        apiExtractPhone(case_name)
    elif(data == 'report'):
        apiReport(case_name)
    else:
        return jsonify({'status':409,
                    'error':"wrong data provided"})
    return jsonify({'status':200,
                    'message':"data extraction successfull"})