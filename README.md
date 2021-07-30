<p align="center">
  <img width="250" height="250" src=Logo.png>
</p>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
![Python](https://img.shields.io/badge/python-v3.6+-blue.svg)
[![Gitter](https://img.shields.io/gitter/room/scorelab/OpenMF)](https://gitter.im/scorelab/OpenMF)
[![GitHub Issues](https://img.shields.io/github/issues/scorelab/OpenMF)](https://github.com/scorelab/OpenMF/issues)
![Contributions welcome](https://img.shields.io/badge/contributions-welcome-orange.svg)
[![License](https://img.shields.io/github/license/scorelab/OpenMF)](https://opensource.org/licenses/Apache-2.0)

## Project Overview
OpenMF is an open source forensic tool for Android smartphones that helps digital forensic investigators throughout the life cycle of digital forensic investigation.

For e.g. let us say we have a crime scene in which we have captured some suspects and we have their mobile phones. If we want to extract all the data from their phones and see which of them are actually involved in the crime scene then we require a software to perform this task and produce Meaningful evidence and Analysis report for every phone (Digital forensic case).
The OpenMF project is a dedicated software to:
1) Extract the relevant data
2) Manage all the cases separately
3) Produce Analysis report

This open source project is an important tool for Digital forensic organization.
At present OpenMF is only a commmand line tool but we are planing to make a complete web client with additional features like Admin, Management and Extractor. These roles will have different privileges to the tool and as a whole it will become a complete open source forensic tool for Android smartphones which then can be used by any Digital forensic investigation organization.

### User Guide
**Step:1 - Cloning the project.**\
Clone the master branch of OpenMF locally by running `git clone https://github.com/scorelab/OpenMF.git` or download the project by clicking [here](https://github.com/scorelab/OpenMF/archive/master.zip).

**Step:2 - Installing the project dependencies**\
Install the required dependencies of the project by running `pip3 install -r requirements.txt`.

**Step:3 - Extract data from rooted Android device**\
Connect a rooted Android device using a data cable to your system, make sure that you have enabled the USB debugging.
Once connected, you can run `python3 collector.py --option all --session_name CaseNo1 --tags tag1,tag2​` or `python3 collector.py -o all -sn CaseNo1 --tag tag1,tag2`. Please ​note that this script will extract the requested data in `.db` format in the project directory inside `session name` (CaseNo1 for the above command) folder.

**Step:4 - Convert the data `.db` files to readable format like `.tsv/.json`**\
Run `converter.py` and pass three arguments, the first one contains path to .db file, the second argument contains desired path to store converted files and the last argument contains file type (either `.json` or `.tsv`) for e.g. `python3 converter.py /home/user/Downloads/accounts.db /home/user/data/ json` converts `accounts.db` files in `.json` format.

**Step:5 - Setting up Backend and Frontend**\
Backend: [flask-backend](https://github.com/scorelab/OpenMF/blob/master/flask-backend/Readme.md)<br>
Frontend: [React-frontend](https://github.com/scorelab/OpenMF/tree/master/React-frontend/Readme.md)

### Developer Guide
Follow all the instructions given in the User Guide.
Explore the project repository. The major files are `collector.py`, `converter.py`, and all the files which are present inside `scripts` folder.
Also, explore the current [issues](https://github.com/scorelab/OpenMF/issues), and [pull requests](https://github.com/scorelab/OpenMF/pulls).

### Contact information
Please join the [Gitter channel](https://gitter.im/scorelab/OpenMF) for further discussions.
