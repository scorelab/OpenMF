'''
    Routes related to common report
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

commonreport = Blueprint('commonreport', __name__, url_prefix='/commonreport')
dirname = os.path.dirname(__file__)
cases_data_path = os.path.join(dirname, '../../../data/')

DATA_PATH = '../../../data/'
PATH_TO_REPORT = '/report/report.txt'
PATH_TO_LOCATION = '/tsv/savedlocation.tsv'
PATH_TO_BROWSER = '/tsv/history.tsv'
PATH_TO_CALLLOGS = '/tsv/phone_calllogs.tsv'
PATH_TO_SMS = '/tsv/sms.tsv'


def get_common_call_report(case1, case2):
    '''
        get_common_call_report() is responsible for
        fetching common call logs between two cases.
    '''
    call_report = []
    report_one = []
    report_two = []

    with open(case1, 'r') as first:
        first = csv.reader(first, delimiter='\t')
        for row in first:

            data = (row[1], row[2], row[6])
            report_one.append(data)

    report_one.remove(report_one[0])
    with open(case2, 'r') as second:
        second = csv.reader(second, delimiter='\t')
        for row in second:

            data = (row[1], row[2], row[6])
            report_two.append(data)
    report_two.remove(report_two[0])
    call_report = list(set(report_one).intersection(set(report_two)))

    return call_report


def get_common_coordinates(case1, case2):
    '''
        get_common_coordinates() is responsible for 
        fetching common location details between two cases.
    '''

    common_coordinates = []
    coordinate_one = []
    coordinate_two = []

    with open(case1, 'r') as first:
        first = csv.reader(first, delimiter='\t')
        for row in first:

            data = (row[4], row[5], row[7])
            coordinate_one.append(data)

    coordinate_one.remove(coordinate_one[0])

    with open(case2, 'r') as second:
        second = csv.reader(second, delimiter='\t')
        for row in second:

            data = (row[4], row[5], row[7])
            coordinate_two.append(data)

    coordinate_two.remove(coordinate_two[0])

    common_coordinates = list(
        set(coordinate_one).intersection(set(coordinate_two)))

    return common_coordinates


def get_common_browser_history(Case1, Case2):
    '''
        get_common_browser_history() is responsible for
        fetching common search history from browser.
    '''
    common_history = []

    open_path_file = open(Case2, "r", encoding="UTF-8")

    history_2 = open_path_file.read()

    open_path_file.close()

    with open(Case1, 'r', encoding="UTF-8") as first:
        first = csv.reader(first, delimiter='\t')
        for row in first:

            data = (row[2])
            if data in history_2:
                common_history.append((data,row[3]))

    common_history.remove(common_history[0])
    common_history = list(set(common_history))
    
    return common_history


def get_common_sms(case1, case2):
    '''
        get_common_sms() is responsible for fetching common
        message(sms) between two case.
    '''
    common_sms = []

    sms_one = []
    sms_two = []

    with open(case1, 'r', encoding="UTF-8") as first:
        first = csv.reader(first, delimiter='\t')
        for row in first:
            if len(row) == 11:
                data = (row[2], row[6])
                sms_one.append(data)

    with open(case2, 'r', encoding="UTF-8") as second:
        second = csv.reader(second, delimiter='\t')
        for row in second:
            if len(row) == 11:
                data = (row[2],row[6])
                sms_two.append(data)

    common_sms = list(set(sms_one).intersection(set(sms_two)))
    
    return common_sms

'''
    -------- APIs ------------
    
    1. http://127.0.0.1:5000/commonreport/calls

    This API is responsible for getting common
    contact details between two cases.

    method = ['POST']
    {
        "case_one": "case1",
        "case_two": "case2"
    }

    2. http://127.0.0.1:5000/commonreport/coordinates

    This API is responsible for getting common
    location details between two cases.
    
    method = ['POST']
    {
        "case_one": "case1",
        "case_two": "case2"
    }

    3. http://127.0.0.1:5000/commonreport/browser

    This API is responsible for fetching common browser
    searched history details between two cases.

    method = ['POST']
    {
        "case_one": "case1",
        "case_two": "case2"
    }

    4. http://127.0.0.1:5000/commonreport/sms

    This API is responsible for fetching common message
    details between two cases.

    method = ['POST']
    {
        "case_one": "case1",
        "case_two": "case2"
    }
'''


@commonreport.route('/calls', methods=['POST'])
def calls():
    '''
    This API is responsible for getting common
    contact details between two cases.
    '''
    try:
        req = request.get_json()

        case_one = str(req['case_one'])

        case_two = str(req['case_two'])

        case_one = Case.query.filter_by(case_name=case_one).first()

        case_two = Case.query.filter_by(case_name=case_two).first()

        if not case_one:
            '''
            If case one is not present in database.
            '''
            return 'case one with that name does not exist', 404

        if not case_two:
            '''
            If case two is not present in database.
            '''
            return 'case two with that name does not exist', 404

        case_one_path = case_one.data_path

        case_two_path = case_two.data_path

    except Exception as e:

        print(e)

        return 'Please provide valid Case', 400
    case_one_path = os.sep.join([case_one_path, PATH_TO_CALLLOGS])
    case_two_path = os.sep.join([case_two_path, PATH_TO_CALLLOGS])
    commoncalls = get_common_call_report(case_one_path, case_two_path)

    if commoncalls:
        return jsonify(commoncalls)

    else:
        return "No Data Found", 404


@commonreport.route('/coordinates', methods=['POST'])
def commoncoordinates():
    '''
    This API is responsible for getting common
    location details between two cases.
    '''
    try:
        req = request.get_json()

        case_one = str(req['case_one'])

        case_two = str(req['case_two'])

        case_one = Case.query.filter_by(case_name=case_one).first()

        case_two = Case.query.filter_by(case_name=case_two).first()

        if not case_one:
            '''
            If case one is not present in database.
            '''
            return 'case one with that name does not exist', 404

        if not case_two:
            '''
            If case two is not present in database.
            '''
            return 'case two with that name does not exist', 404

        case_one_path = case_one.data_path

        case_two_path = case_two.data_path

    except Exception as e:

        print(e)

        return 'Please provide valid Case', 400

    case_one_path = os.sep.join([case_one_path, PATH_TO_LOCATION])
    case_two_path = os.sep.join([case_two_path, PATH_TO_LOCATION])

    coordinate_list = get_common_coordinates(case_one_path, case_two_path)

    if coordinate_list:
        return jsonify(coordinate_list)

    else:
        return "No Data Found", 404


@commonreport.route('/browser', methods=['POST'])
def commonhistory():
    '''
    This API is responsible for getting common
    browser history details between two cases.
    '''
    try:
        req = request.get_json()

        case_one = str(req['case_one'])

        case_two = str(req['case_two'])

        case_one = Case.query.filter_by(case_name=case_one).first()

        case_two = Case.query.filter_by(case_name=case_two).first()

        if not case_one:
            '''
            If case one is not present in database.
            '''
            return 'case one with that name does not exist', 404

        if not case_two:
            '''
            If case two is not present in database.
            '''
            return 'case two with that name does not exist', 404

        case_one_path = case_one.data_path

        case_two_path = case_two.data_path

    except Exception as e:

        print(e)

        return 'Please provide valid Case', 400

    case_one_path = os.sep.join([case_one_path, PATH_TO_BROWSER])
    case_two_path = os.sep.join([case_two_path, PATH_TO_BROWSER])

    history_list = get_common_browser_history(case_one_path, case_two_path)

    if history_list:
        return jsonify(history_list)

    else:
        return "No Data Found", 404


@commonreport.route('/sms', methods=['POST'])
def commonsms():
    '''
    This API is responsible for getting common
    sms(message) details between two cases.
    '''
    try:
        req = request.get_json()

        case_one = str(req['case_one'])

        case_two = str(req['case_two'])

        case_one = Case.query.filter_by(case_name=case_one).first()

        case_two = Case.query.filter_by(case_name=case_two).first()

        if not case_one:
            '''
            If case one is not present in database.
            '''
            return 'case one with that name does not exist', 404

        if not case_two:
            '''
            If case two is not present in database.
            '''
            return 'case two with that name does not exist', 404

        case_one_path = case_one.data_path

        case_two_path = case_two.data_path

    except Exception as e:

        print(e)

        return 'Please provide valid Case', 400

    case_one_path = os.sep.join([case_one_path, PATH_TO_SMS])
    case_two_path = os.sep.join([case_two_path, PATH_TO_SMS])

    sms_details = get_common_sms(case_one_path, case_two_path)

    if sms_details:
        return jsonify(sms_details)

    else:
        return "No Data Found", 404
