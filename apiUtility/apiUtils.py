import sys
import os
path = os.getcwd()
ROOT_PATH = os.path.dirname(path)
sys.path.append(ROOT_PATH)
from data_store.report_helper import generate_pdf_report
from scripts.extract_all import extract_all_data_toTsv
from scripts.fb_reader import store_fb_data
from scripts.wa_reader import store_wa_data
from scripts.phone import store_phone_data
from scripts.file_helper import convert_to_tsv
from scripts import dbm
from scripts.report import REPORT
from scripts.utils import ROOT_DIR, mkdir
from scripts.os_check import SEP
from scripts.io_helper import write_to_file
from scripts.message import store_sms_data, store_sms_messages
from scripts.browser import store_browser_history_data, store_browser_history
from scripts.bluetooth import store_bluetooth_data,store_btopp
from scripts.location import store_location_data,store_saved_location,store_searched_location
from scripts.media import store_media_data,store_files_data

def save_report(case_name, tags):
    db_store_path = ROOT_DIR + SEP + 'data' + SEP + case_name
    file_path = db_store_path + SEP + 'report' + SEP + 'report.txt'
    mkdir(db_store_path+ SEP + 'report')
    REPORT.append(["Case Name", case_name])
    REPORT.append(["Tags", tags])
    return write_to_file(file_path, REPORT)

def apiReport(case_name, tags):
    save_report(case_name, tags)

def apiExtactAll(case_name):
    extract_all_data_toTsv(case_name)
    store_fb_data(case_name)
    store_wa_data(case_name)
    store_browser_history_data(case_name)
    store_sms_data(case_name)
    store_phone_data(case_name)
    store_bluetooth_data(case_name)
    store_location_data(case_name)
    store_media_data(case_name)

def apiExtractFb(case_name):
    dbm.start_download_databases(case_name)
    store_fb_data(case_name)

def apiExtractWa(case_name):
    dbm.start_download_databases(case_name)
    store_wa_data(case_name)

def apiExtractBrowser(case_name):
    dbm.start_download_databases(case_name)
    store_browser_history_data(case_name)

def apiExtractSMS(case_name):
    dbm.start_download_databases(case_name)
    store_sms_data(case_name)

def apiExtractPhone(case_name):
    dbm.start_download_databases(case_name)
    store_phone_data(case_name)
    
def apiExtractBluetooth(case_name):
    dbm.start_download_databases(case_name)
    store_bluetooth_data(case_name)

def apiExtractLocation(case_name):
    dbm.start_download_databases(case_name)
    store_location_data(case_name)

def apiExtractMedia(case_name):
    dbm.start_download_databases(case_name)
    store_media_data(case_name)


