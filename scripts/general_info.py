import sys
import time
import re
from subprocess import Popen
from subprocess import PIPE, STDOUT

from scripts.report import REPORT
from scripts.os_check import ADB

try:
    from scripts.os_check import SUC
except:
    pass

''' Device General Device Information '''

print(" \nGeneral Device Information\n")

# Serial no.
if 'error' in Popen([ADB, 'get-state'], stdout=PIPE, stderr=STDOUT).stdout.read().decode('UTF-8'):
    sys.exit(" No Android device found !")
else:
    ADB_SN = Popen([ADB, 'get-serialno'], stdout=PIPE, stderr=STDOUT).stdout.read().decode('UTF-8')
    print(" ADB serial: " + ADB_SN)
    REPORT.append(["ADB serial", ADB_SN])

''' Build properties '''
BUILDPROP = Popen([ADB, 'shell', SUC, 'cat', '/system/build.prop'], stdout=PIPE, stderr=STDOUT).stdout.read().decode(
    'UTF-8')
# Manufacturer & Model
for manuf in BUILDPROP.split('\n'):
    if 'ro.product.manufacturer' in manuf:
        DEVICE_MANUF = manuf.strip().split('=')[1]
for model in BUILDPROP.split('\n'):
    if 'ro.product.model' in model:
        DEVICE_MODEL = model.strip().split('=')[1]
print(" Device model: %s %s" % (DEVICE_MANUF, DEVICE_MODEL))
REPORT.append(["Manufacturer", DEVICE_MANUF])
REPORT.append(["Model", DEVICE_MODEL])

# IMEI
IMEI = Popen([ADB, 'shell', SUC, 'dumpsys', 'iphonesubinfo'], stdout=PIPE, stderr=STDOUT).stdout.read().decode('UTF-8')
try:
    print(" IMEI: " + IMEI)
    REPORT.append(["IMEI", IMEI])
except:
    pass

# A version
for aver in BUILDPROP.split('\n'):
    if 'ro.build.version.release' in aver:
        ANDROID_VER = aver.strip().split('=')[1]
try:
    print(" Android version: " + ANDROID_VER)
    REPORT.append(["Android version", ANDROID_VER])
except:
    pass

# Build ID
for buildid in BUILDPROP.split('\n'):
    if 'ro.build.display.id' in buildid:
        BUILD_ID = buildid.strip().split('=')[1]
try:
    print(" Build number: " + BUILD_ID)
    REPORT.append(["Build name", BUILD_ID])
except:
    pass

# Wifi
DUMPSYS_W = Popen([ADB, 'shell', SUC, 'dumpsys', 'wifi'], stdout=PIPE, stderr=STDOUT).stdout.read().decode('UTF-8')
try:
    wifi_beg = DUMPSYS_W.index('MAC:') + 5
    wifi_end = DUMPSYS_W[wifi_beg:].index(',')
    if wifi_end == 17:
        WIFI_MAC = DUMPSYS_W[wifi_beg:wifi_beg + wifi_end].lower()
        try:
            print(" Wi-fi MAC: " + WIFI_MAC)
            REPORT.append(["Wifi MAC", WIFI_MAC])
        except:
            pass
except:
    pass

# Time and date
LOCAL_TIME = time.strftime('%Y-%m-%d %H:%M:%S %Z')
try:
    print(" Local time: " + LOCAL_TIME)
    REPORT.append(["Local time", LOCAL_TIME])
except:
    pass
ANDROID_TIME = Popen([ADB, 'shell', SUC, 'date', '+%F %T %Z'], stdout=PIPE, stderr=STDOUT).stdout.read().decode(
    'UTF-8').replace('\r\n', '')
try:
    print(" Android time: " + ANDROID_TIME)
    REPORT.append(["Android time", ANDROID_TIME])
except:
    pass

# SIM card extraction 
SIM_LOC = '/data/system/SimCard.dat'
if Popen([ADB, 'shell', SUC, 'ls', SIM_LOC], stdout=PIPE, stderr=STDOUT).stdout.read().decode('UTF-8'). \
        replace('\r', '') \
        .replace('\n', '') == SIM_LOC:
    SIM_DATA = Popen([ADB, 'shell', SUC, 'cat', SIM_LOC], stdout=PIPE, stderr=STDOUT).stdout.read().decode(
        'UTF-8').replace('\r', '')
    for sim_d in SIM_DATA.split('\n'):
        if 'CurrentSimSerialNumber' in sim_d:
            SIM_ICCID = sim_d.split('=')[1]
            if SIM_ICCID != '' and SIM_ICCID != 'null':
                REPORT.append(['SIM ICCID', SIM_ICCID])
        if 'CurrentSimPhoneNumber' in sim_d:
            SIM_MSISDN = sim_d.split('=')[1]
            if SIM_MSISDN != '' and SIM_MSISDN != 'null':
                REPORT.append(['SIM MSISDN', SIM_MSISDN])
        if 'CurrentSimOperatorName' in sim_d:
            SIM_OP = sim_d.split('=')[1]
            if SIM_OP != '' and SIM_OP != 'null':
                REPORT.append(['SIM Operator', SIM_OP])
        if 'PreviousSimSerialNumber' in sim_d:
            PRV_SIM_ICCID = sim_d.split('=')[1]
            if PRV_SIM_ICCID != '' and PRV_SIM_ICCID != 'null':
                REPORT.append(['SIM ICCID (Previous)', PRV_SIM_ICCID])
        if 'PreviousSimPhoneNumber' in sim_d:
            PRV_SIM_MSISDN = sim_d.split('=')[1]
            if PRV_SIM_MSISDN != '' and PRV_SIM_MSISDN != 'null':
                REPORT.append(['SIM MSISDN (Previous)', PRV_SIM_MSISDN])

#
# Accounts
ALLACC = Popen([ADB, 'shell', SUC, 'dumpsys', 'account'], stdout=PIPE, stderr=STDOUT).stdout.read().decode('UTF-8')
all_acc = re.compile('Account {name=', re.DOTALL).finditer(ALLACC)
ACCOUNTS = []
for acc in all_acc:
    hit_pos = acc.start()
    tacc = ALLACC[hit_pos + 14:]
    end_pos = tacc.index('}')
    acc0 = tacc[:end_pos].replace(' type=', '').split(',')
    acc = acc0[1] + ": " + acc0[0]
    ACCOUNTS.append(acc)
if ACCOUNTS != '':
    print(" Sync'ed Accounts.")
    for account in ACCOUNTS:
        print(account)
    REPORT.append(["Accounts", ACCOUNTS])
