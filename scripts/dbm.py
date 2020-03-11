import sys
import os
import hashlib
from subprocess import Popen
from subprocess import PIPE, STDOUT

from scripts.os_check import ADB, SEP, SUC, PERM
from scripts.utils import OUTPUT

# Database links

DBS_LIST = [
    '/data/data/com.google.android.apps.messaging/databases/bugle_db',
    '/data/data/com.google.android.dialer/databases/dialer.db',
    '/data/data/com.android.providers.contacts/databases/calllog.db',
    '/data/data/com.android.providers.settings/databases/settings.db',
    '/data/data/com.android.providers.contacts/databases/contacts2.db',
    '/data/data/com.sec.android.provider.logsprovider/databases/logs.db',
    '/data/data/com.android.providers.telephony/databases/mmssms.db',
    '/data/data/com.facebook.katana/databases/fb.db',
    '/data/data/com.facebook.katana/databases/contacts_db2',
    '/data/data/com.facebook.orca/databases/threads_db2',
    '/data/data/com.facebook.katana/databases/photos_db',
    '/data/data/com.whatsapp/databases/wa.db',
    '/data/data/com.whatsapp/databases/msgstore.db',
    '/data/data/kik.android/databases/kikDatabase.db',
    '/data/system/gesture.key',
    '/data/system/cm_gesture.key',
    '/data/system/locksettings.db',
    '/data/system/password.key'
]

# DOWNLOADING DATABASES

DLLS = []  # downloaded databases empty list


def download_database(db_path):
    db_name = db_path.split('/')[-1]
    if Popen([ADB, 'shell', SUC, 'ls', db_path], stdout=PIPE, stderr=STDOUT).stdout.read().decode('UTF-8') \
            .replace('\r', '') \
            .replace('\n', '') == db_path:
        if 'su' in PERM:
            Popen([ADB, 'shell', SUC, 'dd', 'if=' + db_path, 'of=/data/local/tmp/' + db_name], stdout=PIPE,
                  stderr=STDOUT).stdout.read()
            Popen([ADB, 'shell', SUC, 'chmod', '777', '/data/local/tmp/' + db_name], stdout=PIPE,
                  stderr=STDOUT).stdout.read()
            Popen([ADB, 'pull', '/data/local/tmp/' + db_name, OUTPUT + SEP + 'db' + SEP + db_name], stdout=PIPE,
                  stderr=STDOUT).stdout.read()
            Popen([ADB, 'shell', SUC, 'rm', '/data/local/tmp/' + db_name], stdout=PIPE, stderr=STDOUT).stdout.read()
        else:
            Popen([ADB, 'pull', db_path, OUTPUT + SEP + 'db' + SEP + db_name], stdout=PIPE, stderr=STDOUT).stdout.read()
        if os.path.isfile(OUTPUT + SEP + 'db' + SEP + db_name):
            fileh = open(OUTPUT + SEP + 'db' + SEP + 'md5sums', 'a')
            db_md5 = hashlib.md5(open(OUTPUT + SEP + 'db' + SEP + db_name, 'rb').read()).hexdigest()
            DLLS.append(db_name)  # ; DLLS.append(db_md5)
            fileh.write(db_md5 + '\t' + db_name + '\n')
            fileh.close()


def start_download_databases():
    if 'root' in PERM:
        for db in DBS_LIST:
            download_database(db)
