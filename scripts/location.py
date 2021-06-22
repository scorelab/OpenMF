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

searchlocationdb = ''
savedlocationdb = ''

def store_saved_location():

    if os.path.isfile(savedlocationdb):
        saved_location_conn = sqlite3.connect(savedlocationdb)
    else:
        print("saved location db does not exist")
        return

    q = {
        59: '''SELECT key_string, timestamp, merge_key, feature_fprint, latitude, longitude, is_local, sync_item FROM sync_item ORDER BY timestamp DESC'''
    }


    saved_location_query = q[59]

    saved_location_cursor = saved_location_conn.cursor()
    saved_location_cursor.execute(saved_location_query)


   
    SAVED_LOCATION_KEY_STRING = 0
    SAVED_LOCATION_TIMESTAMP = 1
    SAVED_LOCATION_MERGE_KEY = 2
    SAVED_LOCATION_FEATURE_FPRINT = 3
    SAVED_LOCATION_LATITUDE = 4
    SAVED_LOCATION_LONGITUDE = 5
    SAVED_LOCATION_IS_LOCAL = 6
    SAVED_LOCATION_SYNC_ITEM = 7

    saved_location_dict = {}

    row = saved_location_cursor.fetchone()

    while row:
  
        key_string = " "
        timestamp = " "
        merge_key = " "
        feature_fprint = " "
        latitude = " "
        longitude = " "
        is_local = " "
        sync_item = " "



        if row[SAVED_LOCATION_KEY_STRING] is not None:
            key_string = str(row[SAVED_LOCATION_KEY_STRING])

        if row[SAVED_LOCATION_TIMESTAMP] is not None:
            timestamp = row[SAVED_LOCATION_TIMESTAMP]

        if row[SAVED_LOCATION_MERGE_KEY] is not None:
            merge_key = str(row[SAVED_LOCATION_MERGE_KEY])

        if row[SAVED_LOCATION_FEATURE_FPRINT] is not None:
            feature_fprint = str(row[SAVED_LOCATION_FEATURE_FPRINT])

        if row[SAVED_LOCATION_LATITUDE] is not None:
            latitude = str(row[SAVED_LOCATION_LATITUDE])

        if row[SAVED_LOCATION_LONGITUDE] is not None:
            longitude = str(row[SAVED_LOCATION_LONGITUDE])

        if row[SAVED_LOCATION_IS_LOCAL] is not None:
            is_local = str(row[SAVED_LOCATION_IS_LOCAL])

        if row[SAVED_LOCATION_SYNC_ITEM] is not None:
            sync_item = (row[SAVED_LOCATION_SYNC_ITEM])
           

        saved_location_dict[row[0]] = (key_string,timestamp,merge_key,feature_fprint,latitude,longitude,is_local,sync_item)
        
        row = saved_location_cursor.fetchone()

    saved_location_cursor.close()
    saved_location_conn.close()

    saved_location_output_file = OUTPUT + SEP + "savedlocation.tsv"
    saved_location_file = open(saved_location_output_file, "w+", encoding="utf-8")

    saved_location_file.write("key_string\ttimestamp\tmerge_key\tfeature_fprint\tlatitude\tlongitude\tis_local\tlocation_link\n")

    for index in saved_location_dict:

        if saved_location_dict[index][SAVED_LOCATION_TIMESTAMP] > 0:
            timestamp = datetime.datetime.fromtimestamp(saved_location_dict[index][SAVED_LOCATION_TIMESTAMP] / 1000).strftime(
                '%Y-%m-%dT%H:%M:%S')
        else:
            timestamp = str(saved_location_dict[index][SAVED_LOCATION_TIMESTAMP])

        sync_item = (saved_location_dict[index]
                     [SAVED_LOCATION_SYNC_ITEM]).decode('windows-1252', 'ignore')
        sync_item = sync_item.replace("\r\n", " ")
        sync_item = sync_item.replace("\n", " ")
        sync_item = list(sync_item.split("http"))
        sync_item = "http" + sync_item[-1]
        
                     
        saved_location_file.write(
                    saved_location_dict[index][SAVED_LOCATION_KEY_STRING] + \
             "\t" + timestamp + \
             "\t" + saved_location_dict[index][SAVED_LOCATION_MERGE_KEY] + \
            "\t" + saved_location_dict[index][SAVED_LOCATION_FEATURE_FPRINT] + \
            "\t" + saved_location_dict[index][SAVED_LOCATION_LATITUDE] + \
            "\t" + saved_location_dict[index][SAVED_LOCATION_LONGITUDE] + \
            "\t" + saved_location_dict[index][SAVED_LOCATION_IS_LOCAL] + \
            "\t" + sync_item + "\n"
        )

    print("\n" + str(len(saved_location_dict.values())) +
          " saved location data were processed")


def store_searched_location():

    if os.path.isfile(searchlocationdb):
        searched_location_conn = sqlite3.connect(searchlocationdb)
    else:
        print("searched location db does not exist")
        return

    q = {
        59: '''SELECT * FROM gmm_storage_table'''
    }
    
    searched_location_query = q[59]

    searched_location_cursor = searched_location_conn.cursor()
    searched_location_cursor.execute(searched_location_query)

    '''
    _key_pri	_key_sec	_data
    '''

    SEARCHED_KEY_PRI = 0
    SEARCHED_KEY_SEC = 1
    SEARCHED_KEY_DATA = 2

    searched_location_dict = {}

    row = searched_location_cursor.fetchone()

    while row:
        key_pri = " "
        key_sec = " "
        key_data = " "

        if row[SEARCHED_KEY_PRI] is not None:
            key_pri = str(row[SEARCHED_KEY_PRI])
        
        if row[SEARCHED_KEY_SEC] is not None:
            key_sec = str(row[SEARCHED_KEY_SEC])
        
        if row[SEARCHED_KEY_DATA] is not None:
            key_data = (row[SEARCHED_KEY_DATA])
            

        searched_location_dict[row[0]] = (key_pri,key_sec,key_data)

        row = searched_location_cursor.fetchone()

    searched_location_cursor.close()
    searched_location_conn.close()

    searched_location_output_file = OUTPUT + SEP + "searchedlocation.tsv"
    searched_location_file = open(searched_location_output_file, "w+", encoding="utf-8")

    searched_location_file.write("key_pre\tkey_sec\tkey_data\n")

    for index in searched_location_dict:

        key_data = (searched_location_dict[index][SEARCHED_KEY_DATA])
        
        key_data = key_data.decode('windows-1252', 'ignore')
        key_data = key_data.replace("\r\n", " ")
        key_data = key_data.replace("\n", " ")
     
        

        searched_location_file.write(
                    searched_location_dict[index][SEARCHED_KEY_PRI] + \
            "\t" + searched_location_dict[index][SEARCHED_KEY_SEC] + \
            "\t" + str(key_data) + "\n"
        )

    print("\n" + str(len(searched_location_dict.values())) +
            " searched location data were processed")



def store_location_data(session_name):
    global savedlocationdb
    global searchlocationdb
    global OUTPUT
    OUTPUT = OUTPUT + SEP + 'data' + SEP + session_name
    savedlocationdb = OUTPUT + SEP + 'db/gmm_myplaces.db'
    searchlocationdb = OUTPUT + SEP + 'db/gmm_storage.db'
    OUTPUT = OUTPUT + SEP + 'tsv'
    mkdir(OUTPUT)
    store_saved_location()
    store_searched_location()


