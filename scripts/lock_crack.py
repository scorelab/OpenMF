
import sys
from subprocess import Popen
from subprocess import PIPE, STDOUT

from os_check import ADB, SUC, SEP
from general_info import DEVICE_MANUF, DEVICE_MODEL


print("Removing lockscreen ...")
Popen([ADB, 'shell', SUC, 'rm', '/data/system/*.key' ],stdout=PIPE,stderr=STDOUT).stdout.read().decode('UTF-8')
Popen([ADB, 'shell', SUC, 'rm', '/data/system/locksettings.*' ],stdout=PIPE,stderr=STDOUT).stdout.read().decode('UTF-8')