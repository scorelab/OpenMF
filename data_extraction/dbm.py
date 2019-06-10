
import sys
import os
import time
import hashlib
from subprocess import check_output as co
from subprocess import Popen
from subprocess import PIPE, STDOUT

from os_check import ADB, SEP, SUC, PERM
from general_info import DEVICE_MANUF, DEVICE_MODEL



# Create output directory
OR_DATE = time.strftime('%Y-%m-%d')
OR_TIME = time.strftime('%H.%M.%S')
OUTPUT_INIT = "../"+DEVICE_MANUF+"_"+DEVICE_MODEL+"_"+OR_DATE+"_"+OR_TIME
OUTPUT = OUTPUT_INIT+SEP
try:
	os.mkdir(OUTPUT)
	os.mkdir(OUTPUT+SEP+'db')
except:
	sys.exit(" Insufficient permissions to create a folder in this directory!")

# Database links

DBLS = [
#'/data/data/com.android.providers.settings/databases/settings.db',
#'/data/data/com.android.providers.contacts/databases/contacts2.db',
#'/data/data/com.sec.android.provider.logsprovider/databases/logs.db',
#'/data/data/com.android.providers.telephony/databases/mmssms.db',
#'/data/data/com.facebook.katana/databases/fb.db',
'/data/data/com.facebook.katana/databases/contacts_db2',
'/data/data/com.facebook.orca/databases/threads_db2',
#'/data/data/com.facebook.katana/databases/photos_db',
'/data/data/com.whatsapp/databases/wa.db',
'/data/data/com.whatsapp/databases/msgstore.db',
#'/data/data/kik.android/databases/kikDatabase.db',
#'/data/system/gesture.key',
#'/data/system/cm_gesture.key',
#'/data/system/locksettings.db',
#'/data/system/password.key' 
]

# DOWNLOADING DATABASES

DLLS = []	# downloaded databases empty list
def download_database(DB_PATH):
	DB_NAME = DB_PATH.split('/')[-1]
	if Popen([ADB, 'shell', SUC, 'ls', DB_PATH],stdout=PIPE,stderr=STDOUT).stdout.read().decode('UTF-8').replace('\r', '').replace('\n', '') == DB_PATH:
		if 'su' in PERM:
			Popen([ADB, 'shell', SUC, 'dd', 'if='+DB_PATH, 'of=/data/local/tmp/'+DB_NAME],stdout=PIPE,stderr=STDOUT).stdout.read()
			Popen([ADB, 'shell', SUC, 'chmod', '777', '/data/local/tmp/'+DB_NAME],stdout=PIPE,stderr=STDOUT).stdout.read()
			Popen([ADB, 'pull', '/data/local/tmp/'+DB_NAME, OUTPUT+SEP+'db'+SEP+DB_NAME],stdout=PIPE,stderr=STDOUT).stdout.read()
			Popen([ADB, 'shell', SUC, 'rm', '/data/local/tmp/'+DB_NAME],stdout=PIPE, stderr=STDOUT).stdout.read()
		else:
			Popen([ADB, 'pull', DB_PATH, OUTPUT+SEP+'db'+SEP+DB_NAME], stdout= PIPE, stderr=STDOUT).stdout.read()
		if os.path.isfile(OUTPUT+SEP+'db'+SEP+DB_NAME) == True:
			fileh = open(OUTPUT+SEP+'db'+SEP+'md5sums', 'a')
			DB_MD5 = hashlib.md5(open(OUTPUT+SEP+'db'+SEP+DB_NAME, 'rb').read()).hexdigest()
			DLLS.append(DB_NAME) #; DLLS.append(DB_MD5)
			fileh.write(DB_MD5+'\t'+DB_NAME+'\n')
			fileh.close()

if 'root' in PERM:
	for db in DBLS:
		download_database(db)
