'''
    scripts for bluetooth data extraction
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
bluetoothdb = ''

def store_btopp():
    if os.path.isfile(bluetoothdb):
        bluetooth_conn = sqlite3.connect(bluetoothdb)
    else:
        print("bluetoothdb does not exist")
        return
    
    q = {
        59: '''SELECT * FROM btopp ORDER BY btopp.timestamp'''
    }

    bluetooth_query = q[59]

    bluetooth_cursor = bluetooth_conn.cursor()
    bluetooth_cursor.execute(bluetooth_query)

    '''
    creating columns
    '''
    BLUETOOTH_ID = 0
    BLUETOOTH_URI = 1
    BLUETOOTH_HINT = 2
    BLUETOOTH_DATA = 3
    BLUETOOTH_MIMETYPE = 4
    BLUETOOTH_DIRECTION = 5
    BLUETOOTH_DESTINATION = 6
    BLUETOOTH_VISIBILITY = 7
    BLUETOOTH_CONFIRM = 8
    BLUETOOTH_STATUS = 9
    BLUETOOTH_TOTAL_BYTES = 10
    BLUETOOTH_CURRENT_BYTES = 11
    BLUETOOTH_TIMESTAMP = 12
    BLUETOOTH_SCANNED = 13
    BLUETOOTH_DEVICE_NAME = 14
    BLUETOOTH_RESERVED = 15

    bluetooth_dict = {}

    row = bluetooth_cursor.fetchone()

    while row:
        _id = " "
        uri = " "
        hint = " "
        _data = " "
        mimetype = " "
        direction = " "
        destination = " "
        visibility = " "
        confirm = " "
        status = " "
        total_bytes = " "
        current_bytes = " "
        timestamp = " "
        scanned = " "
        device_name = " "
        reserved = " "

        if row[BLUETOOTH_ID] is not None:
            _id = str(row[BLUETOOTH_ID])
        if row[BLUETOOTH_URI] is not None:
            uri = str(row[BLUETOOTH_URI])
        if row[BLUETOOTH_HINT] is not None:
            hint = str(row[BLUETOOTH_HINT])
        if row[BLUETOOTH_DATA] is not None:
            _data = str(row[BLUETOOTH_DATA])
        if row[BLUETOOTH_MIMETYPE] is not None:
            mimetype = str(row[BLUETOOTH_MIMETYPE])
        if row[BLUETOOTH_DIRECTION] is not None:
            direction = str(row[BLUETOOTH_DIRECTION])
        if row[BLUETOOTH_DESTINATION] is not None:
            destination = str(row[BLUETOOTH_DESTINATION])
        if row[BLUETOOTH_VISIBILITY] is not None:
            visibility = str(row[BLUETOOTH_VISIBILITY])
        if row[BLUETOOTH_CONFIRM] is not None:
            confirm = str(row[BLUETOOTH_CONFIRM])
        if row[BLUETOOTH_STATUS] is not None:
            status = str(row[BLUETOOTH_STATUS])
        if row[BLUETOOTH_TOTAL_BYTES] is not None:
            total_bytes = str(row[BLUETOOTH_TOTAL_BYTES])
        if row[BLUETOOTH_CURRENT_BYTES] is not None:
            current_bytes = str(row[BLUETOOTH_CURRENT_BYTES])
        if row[BLUETOOTH_TIMESTAMP] is not None:
            timestamp = row[BLUETOOTH_TIMESTAMP]
        if row[BLUETOOTH_SCANNED] is not None:
            scanned = str(row[BLUETOOTH_SCANNED])
        if row[BLUETOOTH_DEVICE_NAME] is not None:
            device_name = str(row[BLUETOOTH_DEVICE_NAME])
        if row[BLUETOOTH_RESERVED] is not None:
            reserved = str(row[BLUETOOTH_RESERVED])

        bluetooth_dict[row[0]] = (_id,uri,hint,_data,mimetype,\
                                direction,destination,visibility,\
                                confirm,status,total_bytes,\
                                current_bytes,timestamp,\
                                scanned,device_name,reserved)
        
        row = bluetooth_cursor.fetchone()
    
    bluetooth_cursor.close()
    bluetooth_conn.close()
    bluetooth_output_file = OUTPUT + SEP + "bluetooth.tsv"
    bluetooth_file = open(bluetooth_output_file, "w+", encoding="utf-8")
    '''
     store data in bluetooth.tsv
    '''
    bluetooth_file.write("_id\turi\thint\t_data\tmimetype\tdirection\tdestination\tvisibility\tconfirm\tstatus\ttotal_bytes\tcurrent_bytes\ttimestamp\tscanned\tdevice_name\treserved\n")

    for index in bluetooth_dict:

        if bluetooth_dict[index][BLUETOOTH_TIMESTAMP] > 0:
            timestamp = datetime.datetime.fromtimestamp(bluetooth_dict[index][BLUETOOTH_TIMESTAMP] / 1000).strftime(
                '%Y-%m-%dT%H:%M:%S')
        else:
            timestamp = str(bluetooth_dict[index][BLUETOOTH_TIMESTAMP])
        

        bluetooth_file.write(
                    bluetooth_dict[index][BLUETOOTH_ID] + \
            "\t" +  bluetooth_dict[index][BLUETOOTH_URI] + \
            "\t" + bluetooth_dict[index][BLUETOOTH_HINT] + \
            "\t" + bluetooth_dict[index][BLUETOOTH_DATA] + \
            "\t" + bluetooth_dict[index][BLUETOOTH_MIMETYPE] + \
            "\t" + bluetooth_dict[index][BLUETOOTH_DIRECTION] + \
            "\t" + bluetooth_dict[index][BLUETOOTH_DESTINATION] + \
            "\t" + bluetooth_dict[index][BLUETOOTH_VISIBILITY] + \
            "\t" + bluetooth_dict[index][BLUETOOTH_CONFIRM] + \
            "\t" + bluetooth_dict[index][BLUETOOTH_STATUS] + \
            "\t" + bluetooth_dict[index][BLUETOOTH_TOTAL_BYTES] + \
            "\t" + bluetooth_dict[index][BLUETOOTH_CURRENT_BYTES] + \
            "\t" + timestamp + \
            "\t" + bluetooth_dict[index][BLUETOOTH_SCANNED] + \
            "\t" + bluetooth_dict[index][BLUETOOTH_DEVICE_NAME] + \
            "\t" + bluetooth_dict[index][BLUETOOTH_RESERVED] + "\n"
        )
    
    print("\n" + str(len(bluetooth_dict.values())) +
          " bluetooth data were processed")


def store_bluetooth_data(session_name):
    global bluetoothdb
    global OUTPUT
    OUTPUT = OUTPUT + SEP + 'data' + SEP + session_name
    bluetoothdb = OUTPUT + SEP + 'db/btopp.db'
    OUTPUT = OUTPUT + SEP + 'tsv'
    mkdir(OUTPUT)
    store_btopp()
