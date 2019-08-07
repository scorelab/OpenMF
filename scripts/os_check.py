import sys
import os
from subprocess import call
from subprocess import check_output as co
from subprocess import Popen
from subprocess import PIPE, STDOUT

from scripts.report import REPORT

# Check OS and define adb
from utils import ROOT_DIR

download_adb = 'file is not present!\n Download it from http://android.saz.lt/download/adb.zip; \n Unzip, and place ' \
               'them into this directory;\n Run the program again. '
OS_CHECK = sys.platform
if OS_CHECK == 'linux' or OS_CHECK == 'linux2':
    if call(['which', 'adb']) == 0:
        ADB = ROOT_DIR + '/tools/adb'
        SEP = '/'
    else:
        ADB = ROOT_DIR + '/tools/adb'
        SEP = '/'
        if os.path.isfile(ADB):
            os.chmod(ADB, 755)
        else:
            sys.exit(' ERROR! \n {}{}'.format(ADB, download_adb))
elif OS_CHECK == 'win32':
    ADB = ROOT_DIR + '/tools/adb.exe'
    SEP = '\\'
    if not os.path.isfile(ADB):
        sys.exit(' ERROR! \n {}{}'.format(ADB, download_adb))
elif OS_CHECK == 'darwin':
    ADB = ROOT_DIR + "/tools/adb_mac"
    SEP = '/'
    if not os.path.isfile(ADB):
        sys.exit(' ERROR! \n {}{}'.format(ADB, download_adb))
try:
    co([ADB, 'start-server'])
    co([ADB, 'root'])
except NameError:
    sys.exit(" Cannot determine OS!")

# Permission check
PERMA = Popen([ADB, 'shell', 'id'], stdout=PIPE, stderr=STDOUT).stdout.read().decode('UTF-8')

if 'root' in PERMA:
    PERM = 'root'
    SUC = ''
else:
    PERMASU = Popen([ADB, 'shell', 'su', '-c', 'id'], stdout=PIPE, stderr=STDOUT).stdout.read().decode('UTF-8')
    if 'root' in PERMASU:
        PERM = 'root(su)'
        SUC = 'su -c'
    else:
        PERM = 'shell'
try:
    print(" Shell permissions: " + PERM)
    REPORT.append(["Shell permissions", PERM])
except NameError:
    sys.exit("Permission cannot be determined!")
