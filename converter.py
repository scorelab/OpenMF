import os
import sqlite3
import sys
from scripts.file_helper import *
from utils import ROOT_DIR, mkdir


def get_os_based_sqlite():
    os_check = sys.platform
    window_tool = ROOT_DIR + '\\' + 'tools' + '\\' + 'sqlite3.dll'
    linux_tool = ROOT_DIR + '/tools/sqlite3'
    mac_tool = ROOT_DIR + '/tools/sqlite3_mac'
    if os_check == 'linux' or os_check == 'linux2':
        return linux_tool
    elif os_check == 'win32':
        return window_tool
    elif os_check == 'darwin':
        return mac_tool

def print_help():
    help_str = """
        converter is a simple script to convert DB files to tsv (tab separated value)
        python converter.py <case_name> <db_name>
        example : 
            python converter.py Case#01 wa.db tsv
                            or
            python converter.py Case#01 wa.db json
    """
    print(help_str)


if __name__ == '__main__':
    args = sys.argv
    if len(args) < 4:
        print('Insufficient arguments')
        print_help()
    elif len(args) == 4:
        CaseName = args[1]
        dbName = args[2]
        file_type = args[3]
        src_path = ROOT_DIR + '/data/' + CaseName  + '/db/' + dbName
        if not os.path.exists(src_path):
            print('Given db file path is incorrect. This filepath doesn\'t exists ::' + src_path)
        if file_type == 'json':
            file_dir = ROOT_DIR + '/data/' + CaseName + '/json/'
            mkdir(file_dir)
            convert_to_json(src_path, file_dir)
        elif file_type == 'tsv':
            file_dir = file_dir = ROOT_DIR + '/data/' + CaseName + '/tsv/'
            mkdir(file_dir)
            convert_to_tsv(src_path, file_dir)
        pass
    else:
        print('Incorrect no. of arguments passed')
        print_help()
    pass
