import sys
import os
import sqlite3 as sql
from types import new_class
from flask import Blueprint, jsonify, request
import re




dirname = os.path.abspath(os.path.dirname(__file__))

keyword = Blueprint('keyword', __name__, url_prefix="/keyword")

dirname = (os.path.dirname(__file__))
print(dirname, " dirname")

'''
    DATA_PATH, PATH_TO_REPORT,PATH_TO_TSV are support variables.
'''

DATA_PATH = '../../../data/'
PATH_TO_REPORT = '/report/report.txt'
PATH_TO_TSV = 'tsv/'


cases_data_path = os.path.join(dirname,DATA_PATH)


'''
    checkword() is a bool function which returns true if
    keyword found in path given else returns false.
'''

def checkword(pathname, keyword):

    open_path_file = open(pathname, "r")
    read_path_file = open_path_file.read()


    if keyword in read_path_file:
        open_path_file.close()
        return True

    open_path_file.close()

    return False

'''
    searchkeyword() iterates over the data and checks if the keyword
    is present in that file or not via checkword() function.

'''
def searchkeyword(keyword):

    case_list = []
    #print(cases_data_path," case_data_path")

    for subdir, dirs, files in os.walk(cases_data_path):
        #print(subdir , " subdir")
        #print(dirs, " dir")
        #print(files, " files")

        for filename in files:
            filepath = subdir + "/" + filename
            

            if filepath.endswith(".txt") or filepath.endswith(".tsv"):

                '''
                    report_check stores bool
                '''
                report_check = checkword(filepath, keyword)
                
                if report_check:
                    
                    '''
                        if keyword found in filepath then added to case_list
                    '''
                    case_list.append(filepath)
                    # print(filepath, "\n")
                    # print(case_list)

    
    return case_list

'''
API: http://127.0.0.1:5000/keyword/search

This API will give file path of searched keyword.

{
    "keyword": "keyword"
}
'''

@keyword.route('/search', methods=['POST'])
def search():
    try:
        req = request.get_json()

        keyword = str(req['keyword'])

        #print(keyword)
    except Exception as e:

        print(e)

        return 'Please provide keyword', 400

    # print(dirname)

    caselist = searchkeyword(keyword)

    if caselist:
        
        return jsonify(caselist)

    else:
        
        return "KEYWORD NOT FOUND", 404


