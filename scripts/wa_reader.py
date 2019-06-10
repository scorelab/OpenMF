
import sys
import sqlite3
import os
import json
import datetime
import urllib

from dbm import OUTPUT_INIT
# location of databases
msgstoredb = OUTPUT_INIT+"/db/msgstore.db"
contactsdb = OUTPUT_INIT+"/db/wa.db" 

if os.path.isfile(msgstoredb):
    msgstore_conn = sqlite3.connect(msgstoredb)
else:
    print("msgstoredb does not exist")

if os.path.isfile(contactsdb):
    contacts_conn = sqlite3.connect(contactsdb)
else:
    print("contactsdb does not exist")

contacts_cursor = contacts_conn.cursor()
contacts_query = "select jid, number, display_name, wa_name from wa_contacts ;"
contacts_cursor.execute(contacts_query)

CONTACTS_JID_INDX = 0 
CONTACTS_NUMBER_INDX = 1
CONTACTS_DISP_NAME_INDX = 2
CONTACTS_WA_NAME_INDX = 3

contacts_dict = {}

row = contacts_cursor.fetchone()
while row:

    jid = " "
    number = " "
    disp_name = " "
    wa_name = " "


    if (row[CONTACTS_JID_INDX] is not None):
        jid = row[CONTACTS_JID_INDX]
   
    if (row[CONTACTS_NUMBER_INDX] is not None):
        number = row[CONTACTS_NUMBER_INDX]
       
    if (row[CONTACTS_DISP_NAME_INDX] is not None):
        disp_name = row[CONTACTS_DISP_NAME_INDX]
        disp_name = disp_name.replace("\r\n", " ")
        disp_name = disp_name.replace("\n", " ")

    if (row[CONTACTS_WA_NAME_INDX] is not None):
        wa_name = row[CONTACTS_WA_NAME_INDX]
        wa_name = wa_name.replace("\r\n", " ")
        wa_name = wa_name.replace("\n", " ")


    contacts_dict[row[0]] = (jid, number, disp_name, wa_name)
    row = contacts_cursor.fetchone()

contacts_cursor.close()
contacts_conn.close()


sorted_contact_dict = sorted(contacts_dict, key = lambda x : contacts_dict[x][CONTACTS_DISP_NAME_INDX]) 

contacts_output_file = "wa_contacts.tsv"

contacts_file = open(contacts_output_file, "w+", encoding = "utf-8")
contacts_file.write("jid\tnumber\tdisplayName\twhatsappaName\n")

for value in sorted_contact_dict:
    contacts_file.write(contacts_dict[value][CONTACTS_JID_INDX] + \
        "\t" + contacts_dict[value][CONTACTS_NUMBER_INDX] + \
        "\t" + contacts_dict[value][CONTACTS_DISP_NAME_INDX] + \
        "\t" + contacts_dict[value][CONTACTS_WA_NAME_INDX] + "\n"  
        )

###### msgstoredb
msgstore_query = "select _id, key_remote_jid, key_from_me, data, timestamp, media_url, media_wa_type, media_name, remote_resource, received_timestamp from messages order by key_remote_jid, timestamp;"
msgstore_cursor = msgstore_conn.cursor()
msgstore_cursor.execute(msgstore_query)

MESGS_ID_COL_INDX = 0
MESGS_JID_COL_INDX = 1
MESGS_KEY_FROM_ME_ID_COL_INDX = 2
MESGS_DATA_COL_INDX = 3
MESGS_TIMESTAMP_COL_INDX = 4
MESGS_MEDIA_URL_COL_INDX = 5
MESGS_MEDIA_TYPE_COL_INDX = 6
MESGS_MEDIA_NAME_COL_INDX = 7
MESGS_REM_RES_COL_INDX = 8
MESGS_REC_TIMESTAMP_COL_INDX = 9

messages_dict = {}

row = msgstore_cursor.fetchone()
while row:
    _id = " "
    key_remote_jid = " "
    key_from_me = " "
    data = " "
    timestamp = " "
    media_url = " "
    media_wa_type = " "
    media_name  = " "
    remote_resource = " "
    received_timestamp = " "

    if(row[MESGS_ID_COL_INDX] is not None):
        _id = row[MESGS_ID_COL_INDX]

    if (row[MESGS_JID_COL_INDX] is not None):
        key_remote_jid = row[MESGS_JID_COL_INDX]

    if (row[MESGS_KEY_FROM_ME_ID_COL_INDX] is not None):
        key_from_me = " "
        if(row[MESGS_KEY_FROM_ME_ID_COL_INDX] == 0):
            key_from_me = "Received"
        if(row[MESGS_KEY_FROM_ME_ID_COL_INDX] == 1):
            key_from_me = "Sent"

    if (row[MESGS_DATA_COL_INDX] is not None):
        data = row[MESGS_DATA_COL_INDX]
        data = data.replace("\r\n", " ")
        data = data.replace("\n", " ")

    if (row[MESGS_TIMESTAMP_COL_INDX] is not None):
        timestamp = row[MESGS_TIMESTAMP_COL_INDX]

    if (row[MESGS_MEDIA_URL_COL_INDX] is not None):
        media_url = row[MESGS_MEDIA_URL_COL_INDX]

    if (row[MESGS_MEDIA_TYPE_COL_INDX] == '0'):
        media_wa_type = "TEXT"
        
    if (row[MESGS_MEDIA_TYPE_COL_INDX] == '1'):
        media_wa_type = "IMAGE"
        
    if (row[MESGS_MEDIA_TYPE_COL_INDX] == '2'):
        media_wa_type = "AUDIO"
        
    if (row[MESGS_MEDIA_TYPE_COL_INDX] == '3'):
        media_wa_type = "VIDEO"
        
    if (row[MESGS_MEDIA_TYPE_COL_INDX] == '4'):
        media_wa_type = "CONTACT"
        
    if (row[MESGS_MEDIA_TYPE_COL_INDX] == '5'):
        media_wa_type = "LOCATION"
    
    if (row[MESGS_MEDIA_NAME_COL_INDX] is not None):
        media_name = row[MESGS_MEDIA_NAME_COL_INDX]
        media_name = media_name.replace("\r\n", " ")
        media_name = media_name.replace("\n", " ")
    
    if (row[MESGS_REM_RES_COL_INDX] is not None):
        remote_resource = row[MESGS_REM_RES_COL_INDX]
    
    if (row[MESGS_REC_TIMESTAMP_COL_INDX] is not None):
        received_timestamp = row[MESGS_REC_TIMESTAMP_COL_INDX]
    
    messages_dict[row[0]] = (_id, key_remote_jid, key_from_me, data, timestamp, media_url, media_wa_type, media_name, remote_resource, received_timestamp)
   
    row = msgstore_cursor.fetchone()

msgstore_cursor.close()
msgstore_conn.close()


messages_output_file = "messages_wa.tsv"
message_file = open(messages_output_file,"w+", encoding = "utf-8")
message_file.write("key_remote_jid\tkey_from_me\tdata\ttimestamp\tmedia_url\tmedia_wa_type\tmedia_name\tremote_resource\treceived_timestamp\n")

for value in messages_dict:

    if(messages_dict[value][MESGS_TIMESTAMP_COL_INDX] > 0):
        datetimestr = datetime.datetime.fromtimestamp(messages_dict[value][MESGS_TIMESTAMP_COL_INDX]/1000).strftime('%Y-%m-%dT%H:%M:%S')
    else:
        datetimestr = str(messages_dict[value][MESGS_TIMESTAMP_COL_INDX])

    if(messages_dict[value][MESGS_REC_TIMESTAMP_COL_INDX] > 0):
        rec_datetimestr = datetime.datetime.fromtimestamp(messages_dict[value][MESGS_REC_TIMESTAMP_COL_INDX]/1000).strftime('%Y-%m-%dT%H:%M:%S')
    else:
        rec_datetimestr = str(messages_dict[value][MESGS_REC_TIMESTAMP_COL_INDX])

    message_file.write(messages_dict[value][MESGS_JID_COL_INDX] + \
        "\t" + messages_dict[value][MESGS_KEY_FROM_ME_ID_COL_INDX] + \
        "\t" + messages_dict[value][MESGS_DATA_COL_INDX] + \
        "\t" + datetimestr + \
        "\t" + messages_dict[value][MESGS_MEDIA_URL_COL_INDX] + \
        "\t" + messages_dict[value][MESGS_MEDIA_TYPE_COL_INDX] + \
        "\t" + messages_dict[value][MESGS_MEDIA_NAME_COL_INDX] + \
        "\t" + messages_dict[value][MESGS_REM_RES_COL_INDX] + \
        "\t" + rec_datetimestr + "\n")
print ("\n" + str(len(contacts_dict.values())) + " contacts were processed")
print ("\n" + str(len(messages_dict.values())) + " messages were processed")