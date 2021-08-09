'''
    This script is responsible for extracting EXIF data
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
mediadb = ''


def store_files_data():
    if os.path.isfile(mediadb):
        media_conn = sqlite3.connect(mediadb)
    else:
        print("mediadb does not exist")
        return

    q = {
        59: '''SELECT _id, _data, _size, datetaken, mime_type,
        title, description, _display_name, picasa_id, orientation, latitude,
        longitude, date_added, date_modified, mini_thumb_magic, bucket_id, bucket_display_name, 
        album, tags, category, language, storage_id, width, height FROM files WHERE media_type=1 ORDER BY files.date_added'''
    }


    media_query = q[59]

    media_cursor = media_conn.cursor()
    media_cursor.execute(media_query)

    '''
    col:
    _id, _data, _size, date_added, date_modified, mime_type,
        title, description, _display_name, picasa_id, orientation, latitude,
        longitude, datetaken,  mini_thumb_magic, bucket_id, bucket_display_name, 
        album, tags, category, language, storage_id, width, height
    '''

    MEDIA_ID = 0
    MEDIA_DATA = 1
    MEDIA_SIZE = 2
    MEDIA_DATE_TAKEN = 3
    MEDIA_MIME_TYPE = 4
    MEDIA_TITLE = 5
    MEDIA_DESCRIPTION = 6
    MEDIA_DISPLAY_NAME = 7
    MEDIA_PICASA_ID = 8
    MEDIA_ORIENTATION = 9
    MEDIA_LATITUDE = 10
    MEDIA_LONGITUDE = 11
    MEDIA_DATE_ADDED = 12
    MEDIA_DATE_MODIFIED = 13
    MEDIA_MINI_THUMB_MAGIC = 14
    MEDIA_BUCKET_ID =15
    MEDIA_BUCKET_DISPLAY_NAME =16
    MEDIA_ALBUM = 17
    MEDIA_TAGS = 18
    MEDIA_CATEGORY = 19
    MEDIA_LANGUAGE = 20
    MEDIA_STORAGE_ID = 21
    MEDIA_WIDTH = 22
    MEDIA_HEIGHT = 23

    media_dict = {}

    row = media_cursor.fetchone()

    while row:
        _id = " "
        _data = " "
        _size = " "
        datetaken = " "
        mime_type = " "
        title = " "
        description = " "
        _display_name = " "
        picasa_id = " "
        orientation = " "
        latitude = " "
        longitude = " "
        date_added = " "
        date_modified = " "
        mini_thumb_magic = " "
        bucket_id = " "
        bucket_display_name = " "
        album = " "
        tags = " "
        category = " "
        language = " "
        storage_id = " "
        width = " "
        height = " "

  
        if row[MEDIA_ID] is not None:
            _id = str(row[MEDIA_ID])

        if row[MEDIA_DATA] is not None:
            _data = str(row[MEDIA_DATA])

        if row[MEDIA_SIZE] is not None:
            _size = str(row[MEDIA_SIZE])

        if row[MEDIA_DATE_TAKEN] is not None:
            datetaken = (row[MEDIA_DATE_TAKEN])

        if row[MEDIA_MIME_TYPE] is not None:
            mime_type = str(row[MEDIA_MIME_TYPE])

        if row[MEDIA_TITLE] is not None:
            title = str(row[MEDIA_TITLE])

        if row[MEDIA_DESCRIPTION] is not None:
            description = str(row[MEDIA_DESCRIPTION])

        if row[MEDIA_DISPLAY_NAME] is not None:
            _display_name = str(row[MEDIA_DISPLAY_NAME])

        if row[MEDIA_PICASA_ID] is not None:
            picasa_id = str(row[MEDIA_PICASA_ID])

        if row[MEDIA_ORIENTATION] is not None:
            orientation = str(row[MEDIA_ORIENTATION])

        if row[MEDIA_LATITUDE] is not None:
            latitude = str(row[MEDIA_LATITUDE])

        if row[MEDIA_LONGITUDE] is not None:
            longitude = str(row[MEDIA_LONGITUDE])

        if row[MEDIA_DATE_ADDED]:
            date_added = str(row[MEDIA_DATE_ADDED])

        if row[MEDIA_DATE_MODIFIED]:
            date_modified = str(row[MEDIA_DATE_MODIFIED])

        if row[MEDIA_MINI_THUMB_MAGIC] is not None:
            mini_thumb_magic = str(row[MEDIA_MINI_THUMB_MAGIC])

        if row[MEDIA_BUCKET_ID] is not None:
            bucket_id = str(row[MEDIA_BUCKET_ID])

        if row[MEDIA_BUCKET_DISPLAY_NAME] is not None:
            bucket_display_name = str(row[MEDIA_BUCKET_DISPLAY_NAME])

        if row[MEDIA_ALBUM] is not None:
            album = str(row[MEDIA_ALBUM])

        if row[MEDIA_TAGS] is not None:
            tags = str(row[MEDIA_TAGS])

        if row[MEDIA_CATEGORY] is not None:
            category = str(row[MEDIA_CATEGORY])

        if row[MEDIA_LANGUAGE] is not None:
            language = str(row[MEDIA_LANGUAGE])

        if row[MEDIA_STORAGE_ID] is not None:
            storage_id = str(row[MEDIA_STORAGE_ID])

        if row[MEDIA_WIDTH] is not None:
            width = str(row[MEDIA_WIDTH])

        if row[MEDIA_HEIGHT] is not None:
            height = str(row[MEDIA_HEIGHT])

        media_dict[row[0]] = (_id,
                         _data,
                         _size,
                         datetaken,
                         mime_type,
                         title,
                         description,
                         _display_name,
                         picasa_id,
                         orientation,
                         latitude,
                         longitude,
                         date_added,
                         date_modified,
                         mini_thumb_magic,
                         bucket_id,
                         bucket_display_name,
                         album,
                         tags,
                         category,
                         language,
                         storage_id,
                         width,
                         height)

        row = media_cursor.fetchone()

    media_cursor.close()
    media_conn.close()

    media_output_file = OUTPUT + SEP + "mediadata.tsv"
    media_file = open(media_output_file, "w+", encoding="utf-8")

    media_file.write("_id\t_data\t_size\tdatetaken\tmime_type\ttitle\tdescription\t_display_name\tpicasa_id\torientation\tlatitude\tlongitude\tdate_added\tdate_modified\tmini_thumb_magic\tbucket_id\tbucket_display_name\talbum\ttags\tcategory\tlanguage\tstorage_id\twidth\theight\n")

    for index in media_dict:
        
        if media_dict[index][MEDIA_DATE_TAKEN] > 0:
            datetaken = datetime.datetime.fromtimestamp((media_dict[index][MEDIA_DATE_TAKEN]) / 1000).strftime('%Y-%m-%dT%H:%M:%S')
        else:
            datetaken = str(media_dict[index][MEDIA_DATE_TAKEN])


        media_file.write(
            media_dict[index][MEDIA_ID] + \
            "\t" + media_dict[index][MEDIA_DATA] + \
            "\t" + media_dict[index][MEDIA_SIZE] + \
            "\t" + datetaken + \
            "\t" + media_dict[index][MEDIA_MIME_TYPE] + \
            "\t" + media_dict[index][MEDIA_TITLE] + \
            "\t" + media_dict[index][MEDIA_DESCRIPTION] + \
            "\t" + media_dict[index][MEDIA_DISPLAY_NAME] + \
            "\t" + media_dict[index][MEDIA_PICASA_ID] + \
            "\t" + media_dict[index][MEDIA_ORIENTATION] + \
            "\t" + media_dict[index][MEDIA_LATITUDE] + \
            "\t" + media_dict[index][MEDIA_LONGITUDE] + \
            "\t" + media_dict[index][MEDIA_DATE_ADDED] + \
            "\t" + media_dict[index][MEDIA_DATE_MODIFIED] + \
            "\t" + media_dict[index][MEDIA_MINI_THUMB_MAGIC] + \
            "\t" + media_dict[index][MEDIA_BUCKET_ID] + \
            "\t" + media_dict[index][MEDIA_BUCKET_DISPLAY_NAME] + \
            "\t" + media_dict[index][MEDIA_ALBUM] + \
            "\t" + media_dict[index][MEDIA_TAGS] + \
            "\t" + media_dict[index][MEDIA_CATEGORY] + \
            "\t" + media_dict[index][MEDIA_LANGUAGE] + \
            "\t" + media_dict[index][MEDIA_STORAGE_ID] + \
            "\t" + media_dict[index][MEDIA_WIDTH] + \
            "\t" + media_dict[index][MEDIA_HEIGHT] + "\n"
        )

    print("\n" + str(len(media_dict.values())) +
          " media data were processed")


def store_media_data(session_name):
    global mediadb
    global OUTPUT
    OUTPUT = OUTPUT + SEP + 'data' + SEP + session_name
    mediadb = OUTPUT + SEP + 'db/external.db'
    OUTPUT = OUTPUT + SEP + 'tsv'
    mkdir(OUTPUT)
    store_files_data()



