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

commonreport = Blueprint('report', __name__, url_prefix='/commonreport')
dirname = os.path.dirname(__file__)
cases_data_path = os.path.join(dirname, '../../../data/')

DATA_PATH = '../../../data/'
PATH_TO_REPORT = '/report/report.txt'
PATH_TO_LOCATION = '/tsv/savedlocation.tsv'
PATH_TO_BROWSER = '/tsv/history.tsv'
PATH_TO_CALLLOGS = '/tsv/phone_calllogs.tsv'


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


'''


@commonreport.route('/calls', methods=['POST'])
def calls():
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
