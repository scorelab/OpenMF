from subprocess import Popen
from subprocess import PIPE, STDOUT

from scripts.os_check import ADB, SUC, SEP

print("Removing lockscreen ...")
Popen([ADB, 'shell', SUC, 'rm', '/data/system/*.key'], stdout=PIPE, stderr=STDOUT).stdout.read().decode('UTF-8')
Popen([ADB, 'shell', SUC, 'rm', '/data/system/locksettings.*'], stdout=PIPE, stderr=STDOUT).stdout.read()\
    .decode('UTF-8')
