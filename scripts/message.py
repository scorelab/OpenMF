'''
    This script is responsible for extracting message data
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
smsdb = ''


def store_sms_messages():
    if os.path.isfile(smsdb):
        sms_conn = sqlite3.connect(smsdb)
    else:
        print("smsdb does not exist")
        return
    q = {
        59: '''SELECT _id, thread_id, address, date, date_sent, read, body, creator, seen, sim_slot, sim_imsi FROM sms ORDER BY date DESC'''
    }
    sms_cursor = sms_conn.cursor()
    sms_query = q[59]
    sms_cursor.execute(sms_query)

    SMS_ID = 0
    SMS_THREAD_ID = 1
    SMS_ADDRESS = 2
    SMS_DATE = 3
    SMS_DATE_SENT = 4
    SMS_READ = 5
    SMS_BODY = 6
    SMS_CREATOR = 7
    SMS_SEEN = 8
    SMS_SIM_SLOT = 9
    SMS_SIM_IMSI = 10

    sms_dict = {}

    row = sms_cursor.fetchone()

    while row:
        _id = ''
        thread_id = ''
        address = ''
        date = ''
        date_sent = ''
        read = ''
        body = ''
        creator = ''
        seen = ''
        sim_slot = ''
        sim_imsi = ''

        if row[SMS_ID] is not None:
            _id = str(row[SMS_ID])

        if row[SMS_THREAD_ID] is not None:
            thread_id = str(row[SMS_THREAD_ID])

        if row[SMS_ADDRESS] is not None:
            address = str(row[SMS_ADDRESS])

        if row[SMS_DATE] is not None:
            date = row[SMS_DATE]

        if row[SMS_DATE_SENT] is not None:
            date_sent = row[SMS_DATE_SENT]

        if row[SMS_READ] is not None:
            read = str(row[SMS_READ])

        if row[SMS_BODY] is not None:
            body = str(row[SMS_BODY])
            body.replace('\n', ' ')

        if row[SMS_CREATOR] is not None:
            creator = str(row[SMS_CREATOR])

        if row[SMS_SEEN] is not None:
            seen = str(row[SMS_SEEN])

        if row[SMS_SIM_SLOT] is not None:
            sim_slot = str(row[SMS_SIM_SLOT])

        if row[SMS_SIM_IMSI] is not None:
            sim_imsi = str(row[SMS_SIM_IMSI])

        sms_dict[row[0]] = (_id, thread_id, address, date, date_sent,
                            read, body, creator, seen, sim_slot, sim_imsi)

        row = sms_cursor.fetchone()

    sms_cursor.close()
    sms_conn.close()
    sms_output_file = OUTPUT + SEP + "sms.tsv"
    sms_file = open(sms_output_file, "w+", encoding="utf-8")
    sms_file.write(
        "_id\tthread_id\taddress\tdate\tdate_sent\tread\tbody\tcreator\tseen\tsim_slot\tsim_imsi\n")

    for index in sms_dict:

        if sms_dict[index][SMS_DATE] > 0:
            date = datetime.datetime.fromtimestamp(
                sms_dict[index][SMS_DATE] / 1000).strftime('%Y-%m-%dT%H:%M:%S')
        else:
            date = str(
                sms_dict[index][SMS_DATE])

        if sms_dict[index][SMS_DATE_SENT] > 0:
            datesent = datetime.datetime.fromtimestamp(
                sms_dict[index][SMS_DATE_SENT] / 1000).strftime('%Y-%m-%dT%H:%M:%S')
        else:
            datesent = str(
                sms_dict[index][SMS_DATE_SENT])

        sms_file.write(sms_dict[index][SMS_ID] +
                       "\t" + sms_dict[index][SMS_THREAD_ID] +
                       "\t" + sms_dict[index][SMS_ADDRESS] +
                       "\t" + date +
                       "\t" + datesent +
                       "\t" + sms_dict[index][SMS_READ] +
                       "\t" + sms_dict[index][SMS_BODY] +
                       "\t" + sms_dict[index][SMS_CREATOR] +
                       "\t" + sms_dict[index][SMS_SEEN] +
                       "\t" + sms_dict[index][SMS_SIM_SLOT] +
                       "\t" + sms_dict[index][SMS_SIM_IMSI] + "\n"
                       )
    print("\n" + str(len(sms_dict.values())) + " sms were processed")


def store_sms_data(session_name):
    global smsdb
    global OUTPUT
    OUTPUT = OUTPUT + SEP + 'data' + SEP + session_name
    smsdb = OUTPUT + SEP + 'db/mmssms.db'
    OUTPUT = OUTPUT + SEP + 'tsv'
    mkdir(OUTPUT)
    store_sms_messages()
