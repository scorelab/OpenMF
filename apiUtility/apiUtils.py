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



def save_report(case_name):
    db_store_path = ROOT_DIR + SEP + 'data' + SEP + case_name
    file_path = db_store_path + SEP + 'report' + SEP + 'report.txt'
    mkdir(db_store_path+ SEP + 'report')
    REPORT.append(["Case Name", case_name])
    return write_to_file(file_path, REPORT)

def apiReport(case_name):
    save_report(case_name)

def apiExtactAll(case_name):
    extract_all_data_toTsv(case_name)

def apiExtractFb(case_name):
    dbm.start_download_databases(case_name)
    store_fb_data(case_name)

def apiExtractWa(case_name):
    dbm.start_download_databases(case_name)
    store_wa_data(case_name)

def apiExtractPhone(case_name):
    dbm.start_download_databases(case_name)
    store_phone_data(case_name)

