"""
This script is to extract all databases from Android device and store extracted db files.
Command used to find common databases - find /data/ -name '*.db'

"""
import hashlib
import os
from subprocess import Popen, PIPE, STDOUT

from scripts.os_check import ADB, SUC, PERM, SEP
from scripts.utils import ROOT_DIR, mkdir

dbs_list_str = Popen([ADB, 'shell', SUC, 'find', '/data/', '-name', '*.db'], stdout=PIPE, stderr=STDOUT)\
    .stdout.read().decode('UTF-8')
dbs_list_str = dbs_list_str.strip()
DB_LIST = dbs_list_str.split('\n')

DLLS = []
OUTPUT = ROOT_DIR + SEP


def download_database(db_path):
    db_name = db_path.split('/')[-1]
    if Popen([ADB, 'shell', SUC, 'ls', db_path], stdout=PIPE, stderr=STDOUT).stdout.read().decode('UTF-8') \
            .replace('\r', '') \
            .replace('\n', '') == db_path:
        # print(db_path + " Exists")
        if 'su' in PERM:
            Popen([ADB, 'shell', SUC, 'dd', 'if=' + db_path, 'of=/data/local/tmp/' + db_name], stdout=PIPE,
                  stderr=STDOUT).stdout.read()
            Popen([ADB, 'shell', SUC, 'chmod', '777', '/data/local/tmp/' + db_name], stdout=PIPE,
                  stderr=STDOUT).stdout.read()
            Popen([ADB, 'pull', '/data/local/tmp/' + db_name, OUTPUT + SEP + 'db' + SEP + db_name], stdout=PIPE,
                  stderr=STDOUT).stdout.read()
            Popen([ADB, 'shell', SUC, 'rm', '/data/local/tmp/' + db_name], stdout=PIPE, stderr=STDOUT).stdout.read()
        else:
            print(OUTPUT + SEP + 'db' + SEP + db_name)
            Popen([ADB, 'pull', db_path, OUTPUT + SEP + 'db' + SEP + db_name], stdout=PIPE, stderr=STDOUT).stdout.read()
        if os.path.isfile(OUTPUT + SEP + 'db' + SEP + db_name):
            fileh = open(OUTPUT + SEP + 'db' + SEP + 'md5sums_all', 'a')
            db_md5 = hashlib.md5(open(OUTPUT + SEP + 'db' + SEP + db_name, 'rb').read()).hexdigest()
            DLLS.append(db_name)  # DLLS.append(db_md5)
            fileh.write(db_md5 + '\t' + db_name + '\n')
            fileh.close()


def extract_all_data(session_name):
    global OUTPUT
    if 'root' in PERM:
        OUTPUT = OUTPUT + session_name
        mkdir(OUTPUT)
        mkdir(OUTPUT + SEP + 'db')
        for db in DB_LIST:
            download_database(db)
