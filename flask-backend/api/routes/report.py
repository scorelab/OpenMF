'''
    Routes related to report
'''
import os
import re
import csv
from flask import Blueprint, jsonify, request
from api.models.case import Case
from api.schema.case import CaseSchema
from api.extansions import db

ROOT_DIR = os.getcwd()

case_schema = CaseSchema()
cases_schema = CaseSchema(many=True)

report = Blueprint('report', __name__, url_prefix='/report')
dirname = os.path.dirname(__file__)
cases_data_path = os.path.join(dirname, '../../../data/')

DATA_PATH = '../../../data/'
PATH_TO_REPORT = '/report/report.txt'
PATH_TO_LOCATION = '/tsv/savedlocation.tsv'
PATH_TO_BROWSER = '/tsv/history.tsv'

def getinfo(case_path):
    '''
        getinfo() mine the data and give result in list
    '''

    open_path_file = open(case_path, "r", encoding="UTF-8")

    datafortable = open_path_file.read()

    open_path_file.close()

    datafortable = datafortable.replace(
        ',', '%').replace('[', '').replace(' ', '').replace(']', '').replace("'", '')

    datafortable = datafortable.split('%')

    info = []
    #  i represents index
    i = 0

    while i < (len(datafortable)):

        if i+1 < len(datafortable) and datafortable[i] != "Accounts" and datafortable[i] != "Tags":

            info.append([datafortable[i], datafortable[i+1]])

            i = i+2
        else:
            if datafortable[i] == "Accounts":

                text = []

                i += 1

                while datafortable[i] != "CaseName":

                    text.append(datafortable[i])
                    i += 1

                info.append(["Accounts", text])

            if datafortable[i] == "Tags":

                text = []

                while i+1 < len(datafortable):

                    i += 1

                    text.append(datafortable[i])

                info.append(["Tags", text])
                break

    return info


def get_coordinates(case_path):

    coordinates = []

    with open(case_path, 'r') as location:
        location = csv.reader(location, delimiter='\t')
        for row in (location):
           
            data = (
                 row[4],
                 row[5],
                 row[7]
            )
            coordinates.append(data)
    coordinates.remove(coordinates[0])
    return coordinates


def get_browserdata(case_path):
    case_path = os.sep.join([case_path, PATH_TO_BROWSER])
    browser = []
    with open(case_path, 'r', encoding="UTF-8") as browsers:
        browsers = csv.reader(browsers, delimiter='\t')
        for row in (browsers):
            data = [
                row[1],
                row[2],
                row[3]
            ]
            browser.append(data)
    browser.remove(browser[0])
    return browser

'''
    -------- APIs ------------

    1. http://127.0.0.1:5000/report/generalinfo
    
    This API is responsible to collect general info of device
    in readable format to implement in analytics section.

    method = ['POST']
    {
        "case_name": "CaseName"
    }

    2. http://127.0.0.1:5000/report/locations

    This API is responsible to provide coordinates and link of
    of the locations to map.

    method = ['POST']
    {
        "case_name": "CaseName"
    }

    3. http://127.0.0.1:5000/report/browserdata

    This API is responsible to provide browser
    searched links with its frequencies.

    method = ['POST']
    {
        "case_name": "CaseName"
    }
    
'''


@report.route('/generalinfo', methods=['POST'])
def generalinfo():
    '''
        This API is responsible to collect general info 
        data from report.
    '''
    try:
        req = request.get_json()

        case_name_from_json = str(req['case_name'])

        case = Case.query.filter_by(case_name=case_name_from_json).first()

        if not case:
            '''
            If case is not present in database.
            '''
            return 'case with that name does not exist', 404

        case_path = case.data_path

    except Exception as e:

        print(e)

        return 'Please provide valid Case', 400

    case_path = os.sep.join([case_path, PATH_TO_REPORT])

    datafortable = getinfo(case_path)

    if datafortable:
        return jsonify(datafortable)

    else:
        return "No data found", 404


@report.route('/locations', methods=['POST'])
def locationinfo():

    try:
        req = request.get_json()
        case_name_from_json = str(req['case_name'])

        case = Case.query.filter_by(case_name=case_name_from_json).first()
        # case = cases_data_path + '/' + case_name_from_json

        if not case:
            '''
            If case is not present in database.
            '''
            return 'case with that name does not exist', 404

        case_path = case.data_path
        # case_path = case

    except Exception as e:

        print(e)

        return 'Please provide valid Case', 400

    case_path = os.sep.join([case_path, PATH_TO_LOCATION])

    coordinates = get_coordinates(case_path)

    if coordinates:
        return jsonify(coordinates)

    else:
        return "No data found", 404


@report.route('/browserdata', methods=['POST'])
def browserdata():
    try:
        req = request.get_json()
        case_name_from_json = str(req['case_name'])

        case = Case.query.filter_by(case_name=case_name_from_json).first()
        

        if not case:
            '''
            If case is not present in database.
            '''
            return 'case with that name does not exist', 404

        case_path = case.data_path
        

    except Exception as e:

        print(e)

        return 'Please provide valid Case', 400

    

    browser = get_browserdata(case_path)

    if browser:
        return jsonify(browser)

    else:
        return "No data found", 404
