#!/bin/bash

#getting devices list
function lvl0 {
	echo ${YELLOW}[INFO] Listing connected devices${NC}
	$_ADBPATH devices
	printf ${YELLOW}"\n\n[INFO] Partitions\n"${NC}
	$_ADBPATH shell "cat /proc/partitions"
}

#getting dumpstate and logcat
function lvl1 {
	printf ${GREEN}"
	**************************************************\n
	"${YELLOW}"This might take a few minutes...\n"${GREEN}"
	**************************************************\n"

	echo [INFO] Running dumpstate...
	$_ADBPATH shell dumpstate > $CASENAME/dumpstate.txt

	echo [INFO] Running logcat${NC}
	$_ADBPATH shell logcat -d -v long V:* > $CASENAME/logcat.txt
}

#getting system information
function lvl2 {
	printf ${GREEN}"
	**************************************************\n
	"${YELLOW}"This might take a few minutes...\n"${GREEN}"
	**************************************************\n"

	echo [INFO] Running mount
	$_ADBPATH shell mount > $CASENAME/mount.txt

	echo [INFO] Running netstat
	$_ADBPATH shell netstat > $CASENAME/netstat.txt

	echo [INFO] Running netcfg
	$_ADBPATH shell netcfg > $CASENAME/netcfg.txt

	echo [INFO] Running ifconfig
	$_ADBPATH shell ifconfig > $CASENAME/ifconfig.txt

	echo [INFO] Running date
	$_ADBPATH shell date > $CASENAME/date.txt

	echo [INFO] Running df
	$_ADBPATH shell df > $CASENAME/df.txt

	echo [INFO] Running lsof
	$_ADBPATH shell lsof > $CASENAME/lsof.txt

	echo [INFO] Running uptime${NC}
	$_ADBPATH shell uptime > $CASENAME/uptime.txt
}


#getting the full image of the device
function lvl3 {
	printf ${GREEN}"
	**************************************************\n
	"${YELLOW}"This might take a few minutes...\n"${GREEN}"
	**************************************************\n"${NC}

	

	$_ADBPATH devices
	#id=`$_ADBPATH shell cat /proc/partitions | grep -o '[^ ]\+$' | sed -n 2p`
	#$_ADBPATH shell "su busybox dd if=/dev/block/mmcblk0 conv=notrunc,noerror,sync | busybox nc -l -p 9999" 
	$_ADBPATH shell "su -c 'busybox dd if=/dev/block/mmcblk0 conv=notrunc,noerror,sync | busybox nc -l -p 9999'" &


	osascript <<END 
	tell application "Terminal"
	    do script "cd \"`pwd`\"
	    $_ADBPATH forward tcp:9999 tcp:9999
	    nc 127.0.0.1 9999 > $CASENAME/$CASENAME.img
	    [INFO] Please wait while the extraction is done......"
	end tell
END

	# osascript -e 'tell app "Terminal"
	#     do script "~/Sizi/platform-tools/nc 127.0.0.1 9999 > dd.img"
	# end tell'
	#$_ADBPATH forward tcp:9999 tcp:9999
	#open -a Terminal "`pwd`"
	#nc 127.0.0.1 9999 > ./$CASENAME/image.img &
	

	#cat /proc/partitions | grep -o '[^ ]\+$' | sed -n 2p
}

#installing busybox apk
function installBusybox {
	echo ${RED}[REQUIRED] This process REQUIRES the installation of Busybox${GREEN}
	echo "[USER] Do you want to Busybox APK to be installed? (if not already installed)"
	echo ${YELLOW}"(y/n)?"${GREEN}
	read bBox
	if [ "$bBox" == y ]; then 
		$_ADBPATH install busybox.apk
		echo "[INFO] Busybox apk is successfully installed. Please open the Busybox app and manually install the binaries."
		echo "Did you install the binaries?"
		echo ${YELLOW}"(y/n)"${NC}
		read bDone
		if [ "$bDone" == y ]; then
			echo ${GREEN}[INFO] Processing...${NC}
			lvl3
		else
			echo ${RED}"[INFO] Please install "${BLUE}"Busybox"${RED}" manually and retry..."${NC}
			exit
		fi
	elif [ "$bBox" == n ]; then
		echo ${GREEN}"[USER] Do you have Busybox already installed?"
		echo ${YELLOW}"(y/n)"${NC}
		read bUser
		if [ "$bUser" == y ]; then
			echo ${GREEN}[INFO] Processing...${NC}
			lvl3
		else
			echo ${RED}"[INFO] Please install "${BLUE}"Busybox"${RED}" manually and retry..."${NC}
			exit
		fi
	else
		echo ${RED}[INFO] Please retry with ${BLUE}Busybox${RED} installed..${NC}
		exit
	fi
}		



#end of functions

#initializing colors
RED=`tput setaf 1`
YELLOW=`tput setaf 3`
BLUE=`tput setaf 4`
GREEN=`tput setaf 2`
NC=`tput sgr0`




#getting a report number from user
set +v
clear
echo ${BLUE}STARTING ANDROID IMAGE EXTRACTION TOOL...${YELLOW} v201901${NC}



echo ${YELLOW}"Type in report Number (i.e. 01):"${NC}
read CASENAME
echo ${GREEN}You typed: $CASENAME${NC}
clear

#creating a directory for the case
mkdir $CASENAME
printf "\nDirectory $CASENAME created\n\n."
_ADBPATH=./adb



#getting the user's selection
while :
do
echo ${RED}[USER] Select the run level you wish to execute:${GREEN}
echo "0. List ADB devices and Partitions"
echo "1. Collect live information (Dumpstate + Logcat)"
echo "2. System information"
echo "3. FULL Logical Aquisition (dd image) (Device should be rooted and connected with USB Debugging ON)"
echo "x. EXIT"${NC}
read LEVEL
printf ${RED}"\n[INFO] You selected level $LEVEL\n\n"${NC}







#calling the appropriate function according to the user's selection
if [ "$LEVEL" == 0 ]; then 
	lvl0

elif [ "$LEVEL" == 1 ]; then 
	lvl1

elif [ "$LEVEL" == 2 ]; then
	lvl2

elif [ "$LEVEL" == 3 ]; then
	installBusybox 
	

elif [ "$LEVEL" == x ]; then
	exit
else
  echo ${RED}"Invalid Run Level: " ${BLUE}$LEVEL${NC}
fi


done

#initial version
#more customizable with extracting only the desired partitions
#will be added automated installation of busybox also (currently using busybox by Stericson)
#after a good stable version, will be moving to add the rooting facility also



