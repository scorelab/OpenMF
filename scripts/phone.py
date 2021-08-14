'''
    This script is responsible for extracting phone data.
'''
import sys
import sqlite3
import os
import json
import datetime
import urllib

from scripts.os_check import SEP
from scripts.utils import ROOT_DIR, mkdir
OUTPUT = ROOT_DIR
# location of databases
msgsdb = ''
contactsdb = ''
calllogsdb = ''


def store_phone_contacts():
    if os.path.isfile(contactsdb):
        contacts_conn = sqlite3.connect(contactsdb)
    else:
        print("contactsdb does not exist")
        return

    contacts_cursor = contacts_conn.cursor()
    contacts_query = "select phone_number, display_name from smartdial_table order by display_name ;"
    contacts_cursor.execute(contacts_query)

    # CONTACTS_JID_INDX = 0
    CONTACTS_NUMBER_INDX = 0
    CONTACTS_DISP_NAME_INDX = 1

    contacts_dict = {}

    row = contacts_cursor.fetchone()
    while row:

        # jid = " "
        number = " "
        disp_name = " "

        if row[CONTACTS_NUMBER_INDX] is not None:
            number = row[CONTACTS_NUMBER_INDX]

        if row[CONTACTS_DISP_NAME_INDX] is not None:
            disp_name = row[CONTACTS_DISP_NAME_INDX]
            disp_name = disp_name.replace("\r\n", " ")
            disp_name = disp_name.replace("\n", " ")

        contacts_dict[row[0]] = (number, disp_name)
        row = contacts_cursor.fetchone()

    contacts_cursor.close()
    contacts_conn.close()

    sorted_contact_dict = sorted(contacts_dict, key=lambda x: contacts_dict[x][CONTACTS_DISP_NAME_INDX])

    contacts_output_file = OUTPUT + SEP + "phone_contacts.tsv"

    contacts_file = open(contacts_output_file, "w+", encoding="utf-8")
    contacts_file.write("number\tdisplayName\n")

    for value in sorted_contact_dict:
        contacts_file.write(contacts_dict[value][CONTACTS_NUMBER_INDX] +
                            "\t" + contacts_dict[value][CONTACTS_DISP_NAME_INDX] + "\n"
                            )
    print("\n" + str(len(contacts_dict.values())) + " contacts were processed")


''' msgsdb '''


def store_text_messages():
    if os.path.isfile(msgsdb):
        msgs_conn = sqlite3.connect(msgsdb)
    else:
        print("msgsdb does not exist")
        return

    msgs_query = "select _id, name, snippet_text, sort_timestamp from conversations order by name, sort_timestamp desc;"
    msgs_cursor = msgs_conn.cursor()
    msgs_cursor.execute(msgs_query)

    MESGS_ID_COL_INDX = 0
    MESGS_NAME_COL_INDX = 1
    MESGS_SNIPPET_TEXT_COL_INDX = 2
    MESGS_SORT_TIMESTAMP_COL_INDX = 3

    messages_dict = {}

    row = msgs_cursor.fetchone()
    while row:
        _id = " "
        name = " "
        text = " "
        timestamp = " "

        if row[MESGS_ID_COL_INDX] is not None:
            _id = row[MESGS_ID_COL_INDX]

        if row[MESGS_NAME_COL_INDX] is not None:
            name = row[MESGS_NAME_COL_INDX]

        if row[MESGS_SNIPPET_TEXT_COL_INDX] is not None:
            text = row[MESGS_SNIPPET_TEXT_COL_INDX]
            text = text.replace("\r\n", " ")
            text = text.replace("\n", " ")

        if row[MESGS_SORT_TIMESTAMP_COL_INDX] is not None:
            timestamp = row[MESGS_SORT_TIMESTAMP_COL_INDX]

        messages_dict[row[0]] = (_id, name, text, timestamp)

        row = msgs_cursor.fetchone()

    msgs_cursor.close()
    msgs_conn.close()

    messages_output_file = OUTPUT + SEP + "messages_conversation.tsv"
    message_file = open(messages_output_file, "w+", encoding="utf-8")
    message_file.write("name\ttext\tsort_timestamp\n")

    for value in messages_dict:

        if messages_dict[value][MESGS_SORT_TIMESTAMP_COL_INDX] > 0:
            datetimestr = datetime.datetime.fromtimestamp(
                messages_dict[value][MESGS_SORT_TIMESTAMP_COL_INDX] / 1000).strftime('%Y-%m-%dT%H:%M:%S')
        else:
            datetimestr = str(messages_dict[value][MESGS_SORT_TIMESTAMP_COL_INDX])

        message_file.write(messages_dict[value][MESGS_NAME_COL_INDX] + \
                           "\t" + messages_dict[value][MESGS_SNIPPET_TEXT_COL_INDX] + \
                           "\t" + datetimestr + "\n")
    print("\n" + str(len(messages_dict.values())) + " messages were processed")


''' call logs '''


def store_call_logs():
    if os.path.isfile(calllogsdb):
        calllogs_conn = sqlite3.connect(calllogsdb)
    else:
        print("calllogsdb does not exist")
        return

    calllogs_cursor = calllogs_conn.cursor()
    calllogs_query = "select _id, normalized_number, date, duration, type, name, geocoded_location, frequent " \
                     "from calls order by _id ;"
    calllogs_cursor.execute(calllogs_query)

    CALLLOGS_ID = 0
    CALLLOGS_NUMBER_INDX = 1
    CALLLOGS_DATE_INDX = 2
    CALLLOGS_DURATION_INDX = 3
    CALLLOGS_TYPE_INDX = 4
    CALLLOGS_NAME_INDX = 5
    CALLLOGS_LOCATION_INDX = 6
    CALLLOGS_FREQUENT = 7

    calllogs_dict = {}

    row = calllogs_cursor.fetchone()
    while row:

        id = " "
        number = " "
        date = " "
        duration = " "
        ctype = " "
        name = " "
        location = " "
        frequent = " "

        if row[CALLLOGS_ID] is not None:
            id = row[CALLLOGS_ID]

        if row[CALLLOGS_NUMBER_INDX] is not None:
            number = row[CALLLOGS_NUMBER_INDX]
            number = str(number)

        if row[CALLLOGS_DATE_INDX] is not None:
            date = row[CALLLOGS_DATE_INDX]
            # date = int(date)

        if row[CALLLOGS_DURATION_INDX] is not None:
            duration = row[CALLLOGS_DURATION_INDX]
            duration = str(duration)

        if row[CALLLOGS_TYPE_INDX] is not None:
            if row[CALLLOGS_TYPE_INDX] == 1:
                ctype = '1'
            if row[CALLLOGS_TYPE_INDX] == 2:
                ctype = '2'
            if row[CALLLOGS_TYPE_INDX] == 3:
                ctype = '3'
            if row[CALLLOGS_TYPE_INDX] == 5:
                ctype = '5'
            if row[CALLLOGS_TYPE_INDX] == 1000:
                ctype = '1000'
            if row[CALLLOGS_TYPE_INDX] == 1001:
                ctype = '1001'
            if row[CALLLOGS_TYPE_INDX] == 1002:
                ctype = '1002'

        if row[CALLLOGS_NAME_INDX] is not None:
            name = row[CALLLOGS_NAME_INDX]

        if row[CALLLOGS_LOCATION_INDX] is not None:
            location = row[CALLLOGS_LOCATION_INDX]

        if row[CALLLOGS_FREQUENT] is not None:
            frequent = str(row[CALLLOGS_FREQUENT])

        calllogs_dict[row[0]] = (id, number, date, duration, ctype, name, location, frequent)
        row = calllogs_cursor.fetchone()

    calllogs_cursor.close()
    calllogs_conn.close()

    

    calllogs_output_file = OUTPUT + SEP + "phone_calllogs.tsv"

    calllogs_file = open(calllogs_output_file, "w+", encoding="utf-8")
    calllogs_file.write("id\tnumber\tname\tdate\tduration\ttype\tlocation\tfrequent\n")

    for value in calllogs_dict:

        if calllogs_dict[value][CALLLOGS_DATE_INDX] > 0:
            datetimestr = datetime.datetime.fromtimestamp(calllogs_dict[value][CALLLOGS_DATE_INDX] / 1000)\
                .strftime('%Y-%m-%dT%H:%M:%S')
        else:
            datetimestr = str(calllogs_dict[value][CALLLOGS_DATE_INDX])

        calllogs_file.write(str(calllogs_dict[value][CALLLOGS_ID]) +
                            "\t" + str(calllogs_dict[value][CALLLOGS_NUMBER_INDX]) +
                            "\t" + str(calllogs_dict[value][CALLLOGS_NAME_INDX]) +
                            "\t" + datetimestr +
                            "\t" + str(calllogs_dict[value][CALLLOGS_DURATION_INDX]) +
                            "\t" + str(calllogs_dict[value][CALLLOGS_TYPE_INDX]) +
                            "\t" + str(calllogs_dict[value][CALLLOGS_LOCATION_INDX]) + 
                            "\t"+ str(calllogs_dict[value][CALLLOGS_FREQUENT]) + "\n"
                            )
    print("\n" + str(len(calllogs_dict.values())) + " call logs were processed")


def store_phone_data(session_name):
    global msgsdb
    global contactsdb
    global calllogsdb
    global OUTPUT
    OUTPUT = OUTPUT + SEP + 'data' + SEP + session_name
    msgsdb = OUTPUT + SEP + "db/bugle_db"
    contactsdb = OUTPUT + SEP + "db/dialer.db"
    calllogsdb = OUTPUT + SEP + "db/contacts2.db"
    OUTPUT = OUTPUT + SEP + 'tsv'
    mkdir(OUTPUT)
    store_call_logs()
    store_phone_contacts()
    store_text_messages()
