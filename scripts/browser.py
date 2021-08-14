'''
    script for extracting browsers history
'''
import sys
import sqlite3
import os
import json
import datetime
import urllib

from scripts import dbm
from scripts.os_check import SEP
from scripts.utils import ROOT_DIR, mkdir
OUTPUT = ROOT_DIR
''' location of databases '''
browserdb = ''

def store_browser_history():
    if os.path.isfile(browserdb):
        browser_conn = sqlite3.connect(browserdb)

    else:
        print("browserdb does not exist")
        return

    q = {
        59: '''SELECT urls.id, urls.url, urls.title, urls.visit_count, urls.typed_count, urls.last_visit_time,
                            urls.hidden, visits.visit_time, visits.from_visit, visits.visit_duration,
                            visits.transition, visit_source.source
                        FROM urls JOIN visits 
                        ON urls.id = visits.url LEFT JOIN visit_source ON visits.id = visit_source.id'''
    }
    browser_query = q[59]
    
    browser_cursor = browser_conn.cursor()
    browser_cursor.execute(browser_query)


    BROWSER_URLS_ID = 0
    BROWSER_URLS = 1
    BROWSER_URLS_TITLE = 2
    BROWSER_URLS_VISIT_COUNT = 3
    BROWSER_URLS_TYPED_COUNT = 4
    BROWSER_URLS_LAST_VISIT_TIME = 5
    BROWSER_URLS_HIDDEN = 6
    BROWSER_VISITS_TIME = 7
    BROWSER_VISITS_FROM_VISIT = 8
    BROWSER_VISITS_DURATION = 9
    BROWSER_VISITS_TRANSITION = 10

    browser_dict = {}

    row = browser_cursor.fetchone()

    while row:
        urls_id = " "
        urls = " "
        urls_title = " "
        urls_visit_count = " "
        urls_typed_count = " "
        urls_last_visit_time = " "
        urls_hidden = " "
        visits_time = " "
        visits_from_visit = " "
        visits_duration = " "
        visits_transition = " "

        if row[BROWSER_URLS_ID] is not None:
            urls_id = str(row[BROWSER_URLS_ID])
        if row[BROWSER_URLS] is not None:
            urls = str(row[BROWSER_URLS])
        if row[BROWSER_URLS_TITLE] is not None:
            urls_title = str(row[BROWSER_URLS_TITLE])
        if row[BROWSER_URLS_VISIT_COUNT] is not None:
            urls_visit_count = str(row[BROWSER_URLS_VISIT_COUNT])
        if row[BROWSER_URLS_TYPED_COUNT] is not None:
            urls_typed_count = str(row[BROWSER_URLS_TYPED_COUNT])
        if row[BROWSER_URLS_LAST_VISIT_TIME] is not None:
            urls_last_visit_time = str(row[BROWSER_URLS_LAST_VISIT_TIME])
        if row[BROWSER_URLS_HIDDEN] is not None:
            urls_hidden = str(row[BROWSER_URLS_HIDDEN])
        if row[BROWSER_VISITS_TIME] is not None:
            visits_time = str(row[BROWSER_VISITS_TIME])
        if row[BROWSER_VISITS_FROM_VISIT] is not None:
            visits_from_visit = str(row[BROWSER_VISITS_FROM_VISIT])
        if row[BROWSER_VISITS_DURATION] is not None:
            visits_duration = str(row[BROWSER_VISITS_DURATION])
        if row[BROWSER_VISITS_TRANSITION] is not None:
            visits_transition = str(row[BROWSER_VISITS_TRANSITION])
            

        browser_dict[row[0]] = (urls_id,urls,urls_title,urls_visit_count,urls_typed_count,urls_last_visit_time,urls_hidden,visits_time,visits_from_visit,visits_duration,visits_transition)

        row = browser_cursor.fetchone()

    browser_cursor.close()
    browser_conn.close()
    browser_output_file = OUTPUT + SEP + "history.tsv"
    browser_file = open(browser_output_file, "w+", encoding="utf-8")
    '''
        storing data in history.tsv 
    '''
    browser_file.write(
        "urls_id\turls\turls_title\turls_visit_count\turls_typed_count\turls_last_visit_time\turls_hidden\tvisits_time\tvisits_from_visit\tvisits_duration\tvisits_transition\n")

    for index in browser_dict:
        browser_file.write(browser_dict[index][BROWSER_URLS_ID] +
                           "\t" + browser_dict[index][BROWSER_URLS] +
                           "\t" + browser_dict[index][BROWSER_URLS_TITLE] +
                           "\t" + browser_dict[index][BROWSER_URLS_VISIT_COUNT] +
                           "\t" + browser_dict[index][BROWSER_URLS_TYPED_COUNT] +
                           "\t" + browser_dict[index][BROWSER_URLS_LAST_VISIT_TIME] +
                           "\t" + browser_dict[index][BROWSER_URLS_HIDDEN] +
                           "\t" + browser_dict[index][BROWSER_VISITS_TIME] +
                           "\t" + browser_dict[index][BROWSER_VISITS_FROM_VISIT] +
                           "\t" + browser_dict[index][BROWSER_VISITS_DURATION] +
                           "\t" + browser_dict[index][BROWSER_VISITS_TRANSITION] + "\n")

    print("\n" + str(len(browser_dict.values())) +
          " browser history were processed")


def store_browser_history_data(session_name):
    global browserdb
    global OUTPUT
    OUTPUT = OUTPUT + SEP + 'data' + SEP + session_name
    browserdb = OUTPUT + SEP + 'db/History'
    OUTPUT = OUTPUT + SEP + 'tsv'
    mkdir(OUTPUT)
    store_browser_history()
