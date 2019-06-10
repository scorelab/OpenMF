
import sys
import sqlite3
import os
import json
import datetime
import urllib

from dbm import OUTPUT_INIT

# location of databases
threadsdb = OUTPUT_INIT+"/db/threads_db2"
contactsdb = OUTPUT_INIT+"/db/contacts_db2" 

if os.path.isfile(threadsdb):
    threads_conn = sqlite3.connect(threadsdb)
else:
    print("threadsdb does not exist")

if os.path.isfile(contactsdb):
    contacts_conn = sqlite3.connect(contactsdb)
else:
    print("contactsdb does not exist")

contacts_cursor = contacts_conn.cursor()
contacts_query = "select contact_id, data from contacts ;"
contacts_cursor.execute(contacts_query)

CONTACTS_CONTACTS_ID_INDX = 0 
CONTACTS_DATA_INDX = 1
contacts_dict = {}

row = contacts_cursor.fetchone()
while row:
    try:
        extracted_data = json.loads(row[CONTACTS_DATA_INDX])
    except:
        print("Could not get data for contact_id = " + row[CONTACTS_CONTACTS_ID_INDX])
        row = contacts_cursor.fetchone()
        continue

    dis_num = "None"
    univ_num = "None"
    if(len(extracted_data["phones"])):
        dis_num = extracted_data["phones"][0]["displayNumber"]
        univ_num = extracted_data["phones"][0]["universalNumber"]

    contacts_dict[row[0]] = (extracted_data["profileFbid"], extracted_data["name"]["displayName"], dis_num, univ_num, extracted_data["hugePictureUrl"])
    row = contacts_cursor.fetchone()

contacts_cursor.close()
contacts_conn.close()

CONTACTS_PROFILE_ID_INDX = 0
CONTACTS_DISPLAY_NAME_ID_INDX = 1
CONTACTS_DISPLAY_PHONE_INDX = 2
CONTACTS_UNIV_PHONE_INDX = 3
CONTACTS_HUGE_PIC_URL_INDX = 4

sorted_contact_dict = sorted(contacts_dict, key = lambda x : contacts_dict[x][CONTACTS_DISPLAY_NAME_ID_INDX]) 

contacts_output_file = "contacts.tsv"

contacts_file = open(contacts_output_file, "w+", encoding = "utf-8")
contacts_file.write("contact_id\tprofileFbid\tdisplayName\tdisplayNumber\tuniversalNumber\thugePictureUrl\n")

for value in sorted_contact_dict:
    contacts_file.write(value + "\t" + contacts_dict[value][CONTACTS_PROFILE_ID_INDX] + \
        "\t" + contacts_dict[value][CONTACTS_DISPLAY_NAME_ID_INDX] + \
        "\t" + contacts_dict[value][CONTACTS_DISPLAY_PHONE_INDX] + \
        "\t" + contacts_dict[value][CONTACTS_UNIV_PHONE_INDX] + \
        "\t" + contacts_dict[value][CONTACTS_HUGE_PIC_URL_INDX] + "\n"  
        )

###### threadsdb
threads_query = "select messages.msg_id, messages.thread_key, messages.text, messages.sender, messages.timestamp_ms from messages, threads where messages.thread_key=threads.thread_key order by messages.thread_key, messages.timestamp_ms;"
threads_cursor = threads_conn.cursor()
threads_cursor.execute(threads_query)

MESGS_MSG_ID_COL_INDX = 0
MESGS_THREAD_ID_COL_INDX = 1
MESGS_TEXT_COL_INDX = 2
MESGS_SENDER_COL_INDX = 3
MESGS_TIMESTAMP_COL_INDX = 4

messages_dict = {}

row = threads_cursor.fetchone()
while row:
    sender = "NONE"
    
    textstr = ""
    sourcestr = ""

    try:
        extracted_sender = json.loads(row[MESGS_SENDER_COL_INDX])
        sender = extracted_sender["name"]
       
    except:
        
        print("Could not get sender data")
        print(row[MESGS_SENDER_COL_INDX])
        
    
    if (row[MESGS_TEXT_COL_INDX] is not None):
        textstr = row[MESGS_TEXT_COL_INDX]
        textstr = textstr.replace("\r\n", " ")
        textstr = textstr.replace("\n", " ")

    
    messages_dict[row[MESGS_MSG_ID_COL_INDX]] = (row[MESGS_THREAD_ID_COL_INDX],textstr, sender, row[MESGS_TIMESTAMP_COL_INDX])

    row = threads_cursor.fetchone()

threads_cursor.close()
threads_conn.close()

MESGS_THR_ID_INDX = 0
MESGS_TEXT_INDX = 1
MESGS_SENDER_INDX = 2

MESGS_TIMESTAMP_INDX = 3


sorted_messages_dict = sorted(messages_dict, key = lambda x : (messages_dict[x][MESGS_THR_ID_INDX], messages_dict[x][MESGS_TIMESTAMP_INDX]))

messages_output_file = "messages.tsv"
message_file = open(messages_output_file,"w+", encoding = "utf-8")
message_file.write("msg_id\tthread_id\ttext\tsender\ttimestamp_ms\n")

for value in sorted_messages_dict:
   
    if(messages_dict[value][MESGS_TIMESTAMP_INDX] > 0):
        datetimestr = datetime.datetime.fromtimestamp(messages_dict[value][MESGS_TIMESTAMP_INDX]/1000).strftime('%Y-%m-%dT%H:%M:%S')
    else:
        datetimestr = str(messages_dict[value][MESGS_TIMESTAMP_INDX])
    
    message_file.write(value + "\t" + messages_dict[value][MESGS_THR_ID_INDX] + \
        "\t" + messages_dict[value][MESGS_TEXT_INDX] + \
        "\t" + messages_dict[value][MESGS_SENDER_INDX] + \
        
        "\t" + datetimestr + "\n")
print ("\n" + str(len(contacts_dict.values())) + " contacts were processed")
print ("\n" + str(len(messages_dict.values())) + " messages were processed")
