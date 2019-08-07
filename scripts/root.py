import sys
from subprocess import Popen
from subprocess import PIPE, STDOUT

import scripts.os_check as os_check

ADB = os_check.ADB

device_connected = 0
if 'device' in Popen([ADB, 'adb devices'], stdout=PIPE, stderr=STDOUT).stdout.read().decode('UTF-8'):
    print("Device is successfully connected")
    device_connected = 1
else:
    print("NO device found with debugging enabled")

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
except NameError:
    sys.exit("Permission cannot be determined!")

if device_connected:
    print("DETECTED DEVICE INFORMATION")

    BUILDPROP = Popen([ADB, 'shell', SUC, 'cat', '/system/build.prop'], stdout=PIPE,
                      stderr=STDOUT).stdout.read().decode('UTF-8')

    for p_model in BUILDPROP.split('\n'):
        if 'ro.product.model' in p_model:
            PRODUCT_MODEL = p_model.strip().split('=')[1]
    for p_brand in BUILDPROP.split('\n'):
        if 'ro.product.brand' in p_brand:
            P_BRAND = p_brand.strip().split('=')[1]
    for p_device in BUILDPROP.split('\n'):
        if 'ro.build.product=' in p_device:
            P_DEVICE = p_device.strip().split('=')[1]
    for p_cpu_abi in BUILDPROP.split('\n'):
        if 'ro.product.cpu.abilist=' in p_cpu_abi:
            CPU = p_cpu_abi.strip().split('=')[1]

print("Connected device model is {}".format(PRODUCT_MODEL))
print("of brand {}".format(P_BRAND))
print("and {} device".format(P_DEVICE))
print("with cpu {}".format(CPU))

# Install apk to phone

install_cr = 0
SuperSU = "supersu.zip"

if device_connected:
    install_cr = input("To install custom recovery enter 1\n")
    if install_cr == 1:
        print("Proceeding to recovery mode")
        Popen([ADB, "reboot bootloader"], stdout=PIPE, stderr=STDOUT).stdout.read().decode('UTF-8')
        print("Select Advanced from TWRP recovery main menu.\nSelect ADB Sideload "
              "from advanced options.\nCheck the Wipe Dalvik Cache and Wipe Cache "
              "check boxes.\nFinally Swipe to Start Sideload from the bottom bar.")
        print("SELECT Apply Update from ADB Sideload")
        Popen([ADB, "sideload", SuperSU], stdout=PIPE, stderr=STDOUT).stdout.read().decode('UTF-8')
