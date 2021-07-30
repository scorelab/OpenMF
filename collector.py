"""
Collector script is a simple CLI tool to collect and persist data in Solr indexes.
On the flag basis, user can select whether just show data or show + persis the data
Usage ::
    collector.py [OPTIONS]
    collector.py --help | -h
    collector.py --option
        Explain - {option}
            collector.py --option general_info phone whatsapp facebook
    collector.py
"""

import sys

from data_store.report_helper import generate_pdf_report
from scripts import dbm
from scripts.extract_all import extract_all_data
from scripts.fb_reader import store_fb_data
from scripts.os_check import SEP
from scripts.report import REPORT
from scripts.phone import store_phone_data
from scripts.wa_reader import store_wa_data
from scripts.utils import ROOT_DIR, mkdir
from scripts.io_helper import write_to_file
from scripts.message import store_sms_data
from scripts.browser import store_browser_history_data
from scripts.bluetooth import store_bluetooth_data
from scripts.location import store_location_data
from scripts.media import store_media_data



help_str = """
Collector is a simple CLI tool to collect data from rooted android device and persist data for analysis 
    collector.py [OPTIONS]
    collector.py --help | -h
    collector.py --option | -o <space separated options> --session_name | -sn <name_for_session_without_spaces>
        Explain - {option}
        0. all : collect all common dbs
        1. general_info : To collect general device information
        2. phone : To collect mobile contacts, call logs and messages information
        3. whatsapp : To collect general whatsapp message information and contact details
        4. facebook : To collect facebook messages and profile information
            
            collector.py --option general_info phone whatsapp facebook
        
        Explain - {session_name} - {No_Space-In-Name}
        To query the data later on, we can use session_name as a identifier of current session for later use cases
    collector.py --report | -rp <session_name>
        Generate a PDF report for a case using session name.
        Make sure, data extraction has been done for given case.
    Example - 
    collector.py -h
    collector.py --option general_info phone --session_name case_001_john_snow
    collector.py --report case_001_john_snow
"""

OPTION_KEYS = {"--option", "-o"}
SESSION_KEYS = {"--session_name", "-sn"}
HELP_KEYS = {"-h", "--help"}
REPORT_GEN_KEYS = {"-rp", "--report"}
CASE_TAG = {"--tag"}


def print_general_info(session_name):
    print(REPORT)


FUNC_MAP = {
    'all': extract_all_data,
    'facebook': store_fb_data,
    'whatsapp': store_wa_data,
    'phone': store_phone_data,
    'message': store_sms_data,
    'browser': store_browser_history_data,
    'general_info': print_general_info,
    'bluetooth': store_bluetooth_data,
    'location' : store_location_data,
    'media': store_media_data,
}


def collect_data(extract_options, session_name, tags):
    print('Options to parse are : ', extract_options)
    print('Session name : ', session_name)
    print('Tags : ', tags)
    print('Extracting all common databases ...')
    dbm.start_download_databases(session_name)
    print('databases extraction completed...')
    for option in extract_options:
        key = option.lower().strip()
        if key in FUNC_MAP:
            FUNC_MAP[key](session_name)
    print(REPORT)


def save_report(session_name, tags):
    db_store_path = ROOT_DIR + SEP + 'data' + SEP + session_name
    file_path = db_store_path + SEP + 'report' + SEP + 'report.txt'
    mkdir(db_store_path+ SEP + 'report')
    REPORT.append(["Case Name", session_name])
    REPORT.append(["Tags", tags])
    return write_to_file(file_path, REPORT)


if __name__ == '__main__':
    args = sys.argv
    args_set = set(args)
    print(HELP_KEYS)
    if HELP_KEYS & args_set:
        print(help_str)
        sys.exit()
    elif REPORT_GEN_KEYS & args_set:
        session_name = args[2]
        if generate_pdf_report(session_name):
            print('Generated report as a PDF successfully for case :: ' + session_name)
        else:
            print('Unable to generate PDF report for case :: ' + session_name)
    elif len(OPTION_KEYS & args_set) > 0 and len(SESSION_KEYS & args_set) > 0:
        print('Starting data extraction plan for given options')
        arg_iter = iter(args)
        file_name = next(arg_iter)

        first_flag = next(arg_iter)
        options = []
        tags = []
        session_name = ''
        if OPTION_KEYS.__contains__(first_flag):
            print('Running data extraction for selected options : ')
            option = ''
            while not option.__contains__('-'):
                if option != '':
                    options.append(option)
                option = next(arg_iter)

            if SESSION_KEYS.__contains__(option):
                session_name = next(arg_iter)
                option = next(arg_iter)
            if CASE_TAG.__contains__(option):
                tags.extend(next(arg_iter).split(','))
        else:
            print('Incorrectly options are provided, correct way is : ')
            print('collector.py -o facebook whatsapp phone -sn case_007_james-bond')
            sys.exit()
        if options.__contains__('all'):
            print('Extracting all common databases ...')
            extract_all_data(session_name)
            print('databases extraction completed...')
        else:
            collect_data(options, session_name, tags)
        if save_report(session_name, tags):
            print('Saved report successfully')
        else:
            print('Unable to save report file')
    else:
        print('Invalid / Not Sufficient options provided')
        print(help_str)
        sys.exit()
