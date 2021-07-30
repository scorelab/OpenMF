'''
Routes related keyword search

1) API: http://127.0.0.1:5000/keyword/search

This API will give file path of searched keyword from all cases.
method = ["POST"]
{
    "keyword": "keyword"
}

2) API: http://127.0.0.1:5000/keyword/<case_name>/search

method = ["POST"]

This API will give file path of searched keyword from the case.

{
    "case_name": "Case1",
    "keyword": "word"
}

3) API: http://127.0.0.1:5000/keyword/search/tags

Method = ["POST"]

This API will search for cases which have particular tags assigned.

{
    "tags": "tag1,tag2"
}

4) API: http://127.0.0.1:5000/keyword/custom/search

Method = ["POST"]

This API will find cases which have all keywords in them.

{
    "keyword": "keyword1,keyword2,keyword3"
}

'''

import sys
import os
import re
import sqlite3 as sql
from types import new_class
from flask import Blueprint, jsonify, request, make_response
from api.models.case import Case
from api.schema.case import CaseSchema
from api.extansions import db

ROOT_DIR = os.getcwd()

case_schema = CaseSchema()
cases_schema = CaseSchema(many=True)

keyword = Blueprint('keyword', __name__, url_prefix="/keyword")

dirname = (os.path.dirname(__file__))


'''
    DATA_PATH, PATH_TO_REPORT,PATH_TO_TSV are support variables.
'''

DATA_PATH = '../../../data/'
PATH_TO_REPORT = '/report/report.txt'
PATH_TO_TSV = 'tsv/'


cases_data_path = os.path.join(dirname, DATA_PATH)


def checkword(pathname, keyword):
    '''
    checkword() is a bool function which returns true if
    keyword found in path given else returns false.
    '''

    open_path_file = open(pathname, "r", encoding="UTF-8")
    read_path_file = open_path_file.read()

    if keyword in read_path_file:
        open_path_file.close()
        return True

    open_path_file.close()

    return False


def searchkeyword(keyword):
    '''
    searchkeyword() iterates over the data present in .txt and .tsv files and checks if the keyword
    is present in that file or not via checkword() function.

    '''

    case_list = []

    for subdir, dirs, files in os.walk(cases_data_path):

        if subdir[-2:] != "db":

            for filename in files:

                filepath = os.sep.join([subdir, filename])

                if filepath.endswith(".txt") or filepath.endswith(".tsv"):

                    '''
                        report_check stores bool
                    '''
                    report_check = checkword(filepath, keyword)

                    if report_check:

                        '''
                            if keyword found in filepath then added to case_list
                        '''

                        case_list.append(os.path.dirname(
                            os.path.dirname(filepath)))

    return case_list


def search_keyword_from_case(case, keyword):
    '''
    search_keyword_from_case() iterates over only report.txt and .tsv
    files present in the only case that has been asked and checks if the 
    keyword is present in that file or not via checkword() function.

    '''

    file_list = []

    for subdir, dirs, files in os.walk(case):

        if subdir[-2:] != "db":

            for filename in files:

                filepath = os.sep.join([subdir, filename])

                if filepath.endswith(".txt") or filepath.endswith(".tsv"):

                    '''
                        report_check stores bool
                    '''
                    report_check = checkword(filepath, keyword)

                    if report_check:

                        '''
                            if keyword found in filepath then added to file_list
                        '''

                        file_list.append(filepath)

    return file_list


def searchtag(tags):
    '''
    searchtag() search the case tags which are set while extracting the case
    '''
    case_list_tags = []

    for subdir, dirs, files in os.walk(cases_data_path):

        if subdir[-6:] == "report":

            for filename in files:

                filepath = os.sep.join([subdir, filename])
                

                if filepath.endswith(".txt"):

                    open_path_file = open(filepath, "r", encoding="UTF-8")

                    read_path_file = open_path_file.read()

                    '''
                        tags_bool stores bool if tags are present or not
                    '''
                    tags_bool = all(ele in read_path_file for ele in tags)
                    open_path_file.close()

                    if tags_bool:

                        '''
                            if tag found in report
                        '''

                        case_list_tags.append(os.path.dirname(
                            os.path.dirname(filepath)))

    return case_list_tags

def custom_keyword_search(keyword):
    case_list_with_custom_keywords = []

    for subdir, dirs, files in os.walk(cases_data_path):

        if subdir[-2:] != "db":

            for filename in files:

                filepath = os.sep.join([subdir, filename])
                

                if filepath.endswith(".txt") or filepath.endswith(".tsv"):

                    open_path_file = open(filepath, "r", encoding="UTF-8")

                    read_path_file = open_path_file.read()

                    '''
                        custom_keyword_bool stores bool if all keywords are present or not
                    '''
                    custom_keyword_bool = all(ele in read_path_file for ele in keyword)
                    open_path_file.close()

                    if custom_keyword_bool:

                        '''
                            if all keyword found
                        '''

                        case_list_with_custom_keywords.append(os.path.dirname(
                            os.path.dirname(filepath)))

    return case_list_with_custom_keywords


'''
 -------- APIs ------------


1 . API: http://127.0.0.1:5000/keyword/search

Method = ["POST"]

This API will give file path of searched keyword.

{
    "keyword": "keyword"
}

2 . API: http://127.0.0.1:5000/keyword/<case_name>/search

Method = ["POST"]

This API will give file path of searched keyword from the case.

{
    "case_name": "Case1",
    "keyword": "word"
}

3. API: http://127.0.0.1:5000/keyword/search/tags

Method = ["POST"]

This API will search for cases which have particular tags assigned.

{
    "tags": "tag1,tag2"
}

4. API: http://127.0.0.1:5000/keyword/custom/search

Method = ["POST"]

This API will find cases which have all keywords in them.

{
    "keyword": "keyword1,keyword2,keyword3"
}

'''


@keyword.route('/search', methods=['POST'])
def search():
    try:
        req = request.get_json()

        keyword = str(req['keyword'])

    except Exception as e:

        print(e)

        return 'Please provide keyword', 400

    caselist = searchkeyword(keyword)

    if caselist:

        return jsonify(caselist)

    else:

        return "KEYWORD NOT FOUND", 404


@keyword.route('/<case_name>/search', methods=['POST'])
def searchfromCase(case_name):
    try:

        '''
        case_name_from_json -> This variable take case_name from json

        '''
        req = request.get_json()

        case_name_from_json = str(req['case_name'])

        keyword = str(req['keyword'])

        case = Case.query.filter_by(case_name=case_name_from_json).first()

        if not case:
            '''
            If case is not present in database.
            '''
            return 'case with that name does not exist', 404

        case_path = case.data_path

    except Exception as e:

        print(e)

        return 'Please provide keyword to search within case', 400

    filepaths = search_keyword_from_case(case_path, keyword)

    if filepaths:

        '''
        If keyword found in case. It get stored in filepaths which is a list.
        '''
        return jsonify(filepaths)

    else:

        return "Keyword not found in this case", 404


@keyword.route('/search/tags', methods=['POST'])
def searchtags():
    try:
        req = request.get_json()

        tags = str(req['tags'])
        tags = tags.split(',')

    except Exception as e:

        print(e)

        return 'Please provide tags', 400

    caselisttags = searchtag(tags)

    if caselisttags:
        '''
            If cases found with the desired tags.
        '''
        return jsonify(caselisttags)

    else:
        response = {
            "success": False,
            "message": "No case found with this tag"
        }
    return make_response(jsonify(response)), 404


@keyword.route('/custom/search', methods=['POST'])
def customsearch():
    try:
        req = request.get_json()

        custom_keywords = str(req['keyword'])
        custom_keywords = custom_keywords.split(',')

    except Exception as e:

        print(e)

        return 'Please provide tags', 400

    custom_keyword_cases = custom_keyword_search(custom_keywords)

    if custom_keyword_cases:
        '''
            If cases found with the desired keywords.
        '''
        return jsonify(custom_keyword_cases)

    else:
        response = {
            "success": False,
            "message": "No case found with these keyword combinations"
        }
    return make_response(jsonify(response)), 404
