#!/bin/sh

isPhoneConnectedInDebugMode=0
DEVICE_LIST=$(adb devices); # check if device was connected by usb in debug mode

First_device=${DEVICE_LIST:24} ;# Remove first 4 letters


stringarray=($First_device)  ;# get the first connected device info
DEVICE_IDENTIFIER=${stringarray[0]};
DEVICE_STATE=${stringarray[1]};
if [ "$DEVICE_STATE" = "device" ]
then
    echo "Device is successfully connected in debug mode"
    echo "-------------------------------------------------------"
    isPhoneConnectedInDebugMode=1
elif [ "$DEVICE_STATE" =  "unauthorized" ]
then
    echo "Plese authorize the device with debug mode "
elif [ "$DEVICE_STATE" =  "" ]
then
    echo "No device found"
else
    echo "Plese check adb client is installed and running and only one android device is connected"
fi



#check if this can be rooted 
if [ $isPhoneConnectedInDebugMode ]
then
echo "-------------------------------------------------------"
echo "DETECTED DEVICE INFORMATION"
echo "-------------------------------------------------------"


PRODUCT_NAME=$(adb -s $DEVICE_IDENTIFIER shell getprop ro.product.model)
BOOTLOADER=$(adb -s $DEVICE_IDENTIFIER shell getprop ro.bootloader) 
OS_TYPE=$(adb -s $DEVICE_IDENTIFIER shell getprop net.bt.name)
PRODUCT_VERSION=$(adb -s $DEVICE_IDENTIFIER shell getprop ro.product.version)
BUILD_VERSION=$(adb -s $DEVICE_IDENTIFIER shell getprop ro.build.version.release)

ADB_CONNECTION_STATE=$(adb -s $DEVICE_IDENTIFIER shell getprop ro.adb.secure)

echo "Connected device is $PRODUCT_NAME"
echo "with product version $PRODUCT_VERSION"
echo "Running Android $BUILD_VERSION"
echo "-------------------------------------------------------"

fi


#push the apk to phone

if [ $ADB_CONNECTION_STATE  ]
then 
echo "Do you need to Install kingoRoot?(y/n) :"
read VAR1
echo "Do you need to Install busybox?(y/n) :"
read VAR2
echo "-------------------------------------------------------"

FLAG1=0
FLAG2=0
    if [ "$VAR1" = "y" ] || [ "$VAR1" = "Y" ]
    then
    FLAG1=1
    KINGOROOT_INSTALL_STATUS=$(adb install -r KingoRoot.apk) | rev | cut -d' ' -f 1 | rev
        if [ "$KINGOROOT_INSTALL_STATUS"="Success" ]
        then
        echo "KingOroot was installed successfully "
        echo "activate it from the android device to get root access"
        echo "-------------------------------------------------------"
        else
        echo "error " $KINGOROOT_INSTALL_STATUS
        fi
    fi

    

    if [ "$VAR2" = "y" ] || [ "$VAR2" = "Y" ]
    then
    FLAG2=1
    BUSYBOX_INSTALL_STATUS=$(adb install -r busybox-62.apk) | rev | cut -d' ' -f 1 | rev
        if [ "$BUSYBOX_INSTALL_STATUS"="Success" ]
        then
        echo "busybox was installed successfully "
        echo "Now activate it from the android device "
        echo "-------------------------------------------------------"
        else
        echo "error " $BUSYBOX_INSTALL_STATUS
        fi
    fi


    if [ $FLAG1 -eq 0 ] && [ $FLAG2 -eq 0 ] 
    then
    echo "no apk was installed"
    fi

fi 



adb forward tcp:8888 tcp:8888 #binding the ports


echo "Run the program with default values?(y/n) "
read RUN_WITH_DEFAULT_VALUE
echo "-------------------------------------------------------"

if [ "$RUN_WITH_DEFAULT_VALUE" = "y" ] || [ "$RUN_WITH_DEFAULT_VALUE" = "Y" ]
then
DATE_WITH_TIME=`date "+%Y_%m_%d_%H_%M_%S"`
adb shell "su -c 'dd if=/dev/block/mmcblk0 | busybox nc -l -p 8888'" & nc 127.0.0.1 8888 > /Users/damitha/Desktop/android_dd_imager/$DATE_WITH_TIME.dd && echo "DD Image was created succesfully"
elif [ "$RUN_WITH_DEFAULT_VALUE" = "n" ] || [ "$RUN_WITH_DEFAULT_VALUE" = "N" ]
then
adb shell "su -c 'cat -l /proc/partitions'"
echo "Enter a partitian name from above :"
read PARTITION_ID
echo "Enter the name of the image :"
read IMAGE_NAME
adb shell "su -c 'dd if=/dev/block/$PARTITION_ID | busybox nc -l -p 8888'" & nc 127.0.0.1 8888 > $IMAGE_NAME.dd && echo "DD Image was created succesfully"
else 
echo "OOPS! no option was choosen "
fi
