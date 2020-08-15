import sqlite3 as sql
import os
from flask import Blueprint, render_template, jsonify, request
import json
import os
import re
import subprocess
from flask_login import login_required, current_user
from ..models.models import Case, CaseSchema
from .. import db

case_schema = CaseSchema()
cases_schema = CaseSchema(many=True)
dirname = os.path.dirname(__file__)
adb_path=os.path.join(dirname, '../../../ExtraResources/adbLinux')
extraction = Blueprint('extraction', __name__, url_prefix='/extraction')


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