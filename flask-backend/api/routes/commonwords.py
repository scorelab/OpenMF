'''
    Routes related to common word between cases.

    1) http://127.0.0.1:5000/common/<case1>/<case2>

    This API is responsible for getting common words
    between two cases present in the database.

    method = ["POST"]

    {
        "case1": "case_name_one",
        "case2": "case_name_two"
    }

    2) http://127.0.0.1:5000/common/words/<case1>/<case2>

    This API is responsible for getting common words with
    their frequencies between the two cases present in
    the database.

    method = ["POST"]

    {
        "case1": "case_name_one",
        "case2": "case_name_two"
    }
 
'''
import sys
import os
import re
import sqlite3 as sql
from types import new_class
from flask import Blueprint, jsonify, request
from collections import Counter
from api.models.case import Case
from api.schema.case import CaseSchema
from api.extansions import db


ROOT_DIR = os.getcwd()

common = Blueprint('common', __name__, url_prefix="/common")

case_schema = CaseSchema()
cases_schema = CaseSchema(many=True)

dirname = (os.path.dirname(__file__))

'''
    DATA_PATH, PATH_TO_REPORT,PATH_TO_TSV are support variables.
'''

DATA_PATH = '../../../data/'
PATH_TO_REPORT = '/report/report.txt'
PATH_TO_TSV = 'tsv/'


cases_data_path = os.path.join(dirname, DATA_PATH)


def commonword(case_one, case_two):
    '''
        commonword() gathers all the common words/data
        between two cases and returns a list.
    '''

    final_common_words = []

    case_one_list = []

    case_two_list = []

    for subdir, dirs, files in os.walk(case_one):

        if subdir[-2:] != "db":

            for filename in files:

                filepath = os.sep.join([subdir, filename])

                if filepath.endswith(".txt") or filepath.endswith(".tsv"):

                    open_path_file = open(filepath, "r", encoding="UTF-8")

                    read_path_file = open_path_file.read()

                    open_path_file.close()

                    '''
                        Making set of the words so that no repeating words present
                        in final_common_words.
                    '''

                    read_path_file = set(read_path_file.split())

                    case_one_list.extend(read_path_file)

    for subdir, dirs, files in os.walk(case_two):

        if subdir[-2:] != "db":

            for filename in files:

                filepath = os.sep.join([subdir, filename])

                if filepath.endswith(".txt") or filepath.endswith(".tsv"):

                    open_path_file = open(filepath, "r", encoding="UTF-8")

                    read_path_file = open_path_file.read()

                    open_path_file.close()

                    '''
                        Making set of the words so that no repeating words present
                        in final_common_words.
                    '''

                    read_path_file = set(read_path_file.split())

                    case_two_list.extend(read_path_file)

    final_common_words = set(case_one_list).intersection(set(case_two_list))

    final_common_words = list(final_common_words)

    return final_common_words


def most_common(case_one, case_two):
    '''
        most_common() returns a dictionary which have key as a 
        common words between two cases and key value as a maximum 
        frequency of that word.
    '''

    most_common_word_list = {}

    case_one_words = []

    case_two_words = []

    for subdir, dirs, files in os.walk(case_one):

        if subdir[-2:] != "db":

            for filename in files:

                filepath = os.sep.join([subdir, filename])

                if filepath.endswith(".txt") or filepath.endswith(".tsv"):

                    open_path_file = open(filepath, "r", encoding="UTF-8")

                    read_path_file = open_path_file.read()

                    open_path_file.close()

                    '''
                        Making dictionary of the words with their frequencies.
                    '''

                    read_path_file = Counter(read_path_file.split())

                    case_one_words.extend(read_path_file)

    for subdir, dirs, files in os.walk(case_two):

        if subdir[-2:] != "db":

            for filename in files:

                filepath = os.sep.join([subdir, filename])

                if filepath.endswith(".txt") or filepath.endswith(".tsv"):

                    open_path_file = open(filepath, "r", encoding="UTF-8")

                    read_path_file = open_path_file.read()

                    open_path_file.close()

                    '''
                        Making dictionary of the words with their frequencies.
                    '''

                    read_path_file = Counter(read_path_file.split())

                    case_two_words.extend(read_path_file)

    '''
    case_one_counter and case_two_counter stores 
    Counter of case_one and case_two respectively.
    '''

    case_one_counter = Counter(case_one_words)

    case_two_counter = Counter(case_two_words)

    '''
        key_case_one and key_case_two stores keys of
        case_one_counter and case_two_counter.
    '''

    key_case_one = set(case_one_counter.keys())

    key_case_two = set(case_two_counter.keys())

    '''
        common_keys have all the common keys between two cases.
    '''

    common_keys = key_case_one.intersection(key_case_two)

    for key in common_keys:

        most_common_word_list.update(
            {key: max(case_one_counter[key], case_two_counter[key])})

    return most_common_word_list


'''

 -------- APIs ------------


 1) http://127.0.0.1:5000/common/<case1>/<case2>

    This API is responsible for getting common words
    between two cases present in the database.

    method = ["POST"]

    {
        "case1": "case_name_one",
        "case2": "case_name_two"
    }

 2) http://127.0.0.1:5000/common/words/<case1>/<case2>

    This API is responsible for getting common words with
    their frequencies between the two cases present in
    the database.

    method = ["POST"]

    {
        "case1": "case_name_one",
        "case2": "case_name_two"
    }

'''


@common.route('/<case1>/<case2>', methods=["POST"])
def commonwordlist(case1, case2):

    try:

        req = request.get_json()

        case_one_from_json = str(req['case1'])

        case_two_from_json = str(req['case2'])

        case_one = Case.query.filter_by(case_name=case_one_from_json).first()

        case_two = Case.query.filter_by(case_name=case_two_from_json).first()

        if not case_one:

            '''
                If case one is not present in database.
            '''

            return 'case with that name does not exist', 404

        if not case_two:

            '''
                If case two is not present in database.
            '''

            return 'case with that name does not exist', 404

        '''
            case_name.data_path gives data_path of that case.
        '''

        case_one = case_one.data_path

        case_two = case_two.data_path

    except Exception as e:

        print(e)

        return 'Please provide keyword to search within case', 400

    final_common_word_list = commonword(case_one, case_two)

    if final_common_word_list:

        '''
            If common words present between the two cases.
        '''

        return jsonify(final_common_word_list)

    else:

        return "Nothing Common between these two cases.", 404


@common.route('words/<case1>/<case2>', methods=["POST"])
def mostcommonwordlist(case1, case2):

    try:

        req = request.get_json()

        case_one_from_json = str(req['case1'])

        case_two_from_json = str(req['case2'])

        case_one = Case.query.filter_by(case_name=case_one_from_json).first()

        case_two = Case.query.filter_by(case_name=case_two_from_json).first()

        if not case_one:

            '''
                If case one is not present in database.
            '''

            return 'case with that name does not exist', 404

        if not case_two:

            '''
                If case two is not present in database.
            '''

            return 'case with that name does not exist', 404

        '''
            case_name.data_path gives data_path of that case.
        '''

        case_one = case_one.data_path

        case_two = case_two.data_path

    except Exception as e:

        print(e)

        return 'Please provide keyword to search within case', 400

    most_common_words = most_common(case_one, case_two)

    most_common_words = sorted(
        most_common_words.items(), key=lambda x: x[1], reverse=True)

    if most_common_words:

        '''
            If most common words present between the two cases.
        '''

        return jsonify(most_common_words)

    else:

        return "Nothing Common between these two cases.", 404
