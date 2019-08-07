import os
import time

from scripts.general_info import DEVICE_MANUF, DEVICE_MODEL
from scripts.os_check import SEP
from utils import ROOT_DIR

OR_DATE = time.strftime('%Y-%m-%d')
OR_TIME = time.strftime('%H.%M.%S')
OUTPUT_INIT = ROOT_DIR + SEP + DEVICE_MANUF + "_" + DEVICE_MODEL + "_" + OR_DATE + "_" + OR_TIME
OUTPUT = OUTPUT_INIT + SEP
DATA_DIR = ROOT_DIR + SEP + "data" + SEP
DB_DATA_DIR = ROOT_DIR + SEP + 'dbs' + SEP
os.makedirs(DATA_DIR, exist_ok=True)

FILE_NAMES = {
    'wa.contacts': 'wa-contacts.tsv',
    'wa.messages': 'wa-messages.tsv',
    'fb.messages': 'fb-messages.tsv',
    'fb.contacts': 'fb-contacts.tsv',
    'phone.calllogs': 'phone-calllogs.tsv',
    'phone.messages': 'phone-messages.tsv',
    'phone.contacts': 'phone-contacts.tsv',
    'general.info.device': 'device-general-info.tsv'
}


def mkdir(_dir):
    os.makedirs(_dir, exist_ok=True)
