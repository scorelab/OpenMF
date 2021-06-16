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
smsdb = ''


def store_sms_messages():
    if os.path.isfile(smsdb):
        sms_conn = sqlite3.connect(smsdb)
    else:
        print("smsdb does not exist")
        return

    sms_cursor = sms_conn.cursor()
    sms_query = "select _id, name, snippet_text, sort_timestamp from conversations order by name, sort_timestamp desc;"
    sms_cursor.execute(sms_query)

    SMS_ID_COL_INDX = 0
    SMS_NAME_COL_INDX = 1
    SMS_SNIPPET_TEXT_COL_INDX = 2
    SMS_SORT_TIMESTAMP_COL_INDX = 3

    sms_dict = {}

    row = sms_cursor.fetchone()
    while row:
        _id = " "
        name = " "
        text = " "
        timestamp = " "

        if row[SMS_ID_COL_INDX]:
            _id = row[SMS_ID_COL_INDX]

        if row[SMS_NAME_COL_INDX]:
            name = row[SMS_NAME_COL_INDX]

        if row[SMS_SNIPPET_TEXT_COL_INDX]:
            text = str(row[SMS_SNIPPET_TEXT_COL_INDX])
            text = text.replace("\r\n", " ")
            text = text.replace("\n", " ")

        if row[SMS_SORT_TIMESTAMP_COL_INDX]:
            timestamp = row[SMS_SORT_TIMESTAMP_COL_INDX]

        sms_dict[row[0]] = (_id, name, text, timestamp)

        row = sms_cursor.fetchone()

    sms_cursor.close()
    sms_conn.close()
    sms_output_file = OUTPUT + SEP + "sms.tsv"
    sms_file = open(sms_output_file, "w+", encoding="utf-8")
    sms_file.write("name\ttext\tsort_timestamp\n")

    for value in sms_dict:

        if sms_dict[value][SMS_SORT_TIMESTAMP_COL_INDX] > 0:
            datetimestr = datetime.datetime.fromtimestamp(
                sms_dict[value][SMS_SORT_TIMESTAMP_COL_INDX] / 1000).strftime('%Y-%m-%dT%H:%M:%S')
        else:
            datetimestr = str(
                sms_dict[value][SMS_SORT_TIMESTAMP_COL_INDX])

        sms_file.write(sms_dict[value][SMS_NAME_COL_INDX] + \
                           "\t" + sms_dict[value][SMS_SNIPPET_TEXT_COL_INDX] + \
                           "\t" + datetimestr + "\n")
    print("\n" + str(len(sms_dict.values())) + " sms were processed")


def store_sms_data(session_name):
    global smsdb
    global OUTPUT
    OUTPUT = OUTPUT + SEP + 'data' + SEP + session_name
    smsdb = OUTPUT + SEP + 'db/sms.db'
    OUTPUT = OUTPUT + SEP + 'tsv'
    mkdir(OUTPUT)
    store_sms_messages()
