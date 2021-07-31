'''
    script for extraction of location data
'''
import sys
import sqlite3
import os
import json
import datetime
import urllib
import base64
import re


from scripts import dbm
from scripts.os_check import SEP
from scripts.utils import ROOT_DIR, mkdir
OUTPUT = ROOT_DIR

''' location of databases '''

searchlocationdb = ''
savedlocationdb = ''

def store_saved_location():
    
    '''
        store_saved_location() stores all the saved locations from device.
        All the necessary informations like latitude, longitude, timestamp, and saved location link are available in savedlocation.tsv
    '''

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
            latitude = (row[SAVED_LOCATION_LATITUDE])
            latitude = str(float(latitude/1000000))

        if row[SAVED_LOCATION_LONGITUDE] is not None:
            longitude = (row[SAVED_LOCATION_LONGITUDE])
            longitude = str(float(longitude/1000000))

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
            
            '''
                changing timestamp to readable format
            '''
            timestamp = datetime.datetime.fromtimestamp(saved_location_dict[index][SAVED_LOCATION_TIMESTAMP] / 1000).strftime(
                '%Y-%m-%dT%H:%M:%S')
        else:
            timestamp = str(saved_location_dict[index][SAVED_LOCATION_TIMESTAMP])
        
        '''
            parsing sync_item to get location link
        '''
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
    
    '''
        store_searched_location() is responsible for getting searched location from android device
        which stores data in searchedlocation.tsv
    '''

    if os.path.isfile(searchlocationdb):
        searched_location_conn = sqlite3.connect(searchlocationdb)
    else:
        print("searched location db does not exist")
        return

    q = {
        59: '''SELECT * FROM gmm_storage_table'''
    }
    searched_location_cursor = searched_location_conn.cursor()
    searched_location_query = q[59]

    
    searched_location_cursor.execute(searched_location_query)

    '''
    _key_pri	_key_sec	_data
    '''


    records = searched_location_cursor.fetchall()
    
    

    searched_location_dict = {}


    searched_location_output_file = OUTPUT + SEP + "searchedlocation.tsv"
    searched_location_file = open(searched_location_output_file, "w+", encoding="utf-8")

    searched_location_file.write("key_pre\tkey_sec\tkey_data\n")
    for row in records:
        key_pri = row[0]
        key_sec = row[1]
        key_data = row[2]
        
        key_data = key_data.decode('windows-1252','ignore')
        final_letters = " "
        '''
        parsing key_data to erase garbage from key_data
        '''
        for letters in key_data:
            if letters in (map(chr, range(97, 123)) or map(chr, range(65, 91))):
                final_letters += str(letters)
        key_data = final_letters

        searched_location_dict[row[0]] = (key_pri, key_sec, key_data)
        searched_location_file.write(key_pri + "\t" +key_sec+"\t["+str(key_data)+"]\n")


    searched_location_cursor.close()
    searched_location_conn.close()

    

    print("\n" + " searched location data were processed\n")



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


