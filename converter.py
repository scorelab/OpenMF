import os
import sqlite3
import sys
from scripts.file_helper import *
from utils import ROOT_DIR


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
        python converter.py <src-file-path> <destination-folder>
        example : 
            python converter.py /home/user/Downloads/accounts.db /home/user/data/ json or tsv
    """
    print(help_str)


if __name__ == '__main__':
    args = sys.argv
    if len(args) < 4:
        print('Insufficient arguments')
        print_help()
    elif len(args) == 4:
        src_path = args[1]
        dest_dir = args[2]
        file_type = args[3]
        if not os.path.exists(src_path):
            print('Given db file path is incorrect. This filepath doesn\'t exists ::' + src_path)
        case_name = src_path.split("/")[-3]
        folder_name = os.path.splitext(os.path.basename(src_path))[0]
        file_dir = dest_dir+"/"+case_name+"/"+folder_name
        if file_type == 'json':
            file_dir = file_dir+'/'+'json'
            if not os.path.exists(file_dir):
                os.makedirs(file_dir, exist_ok=True)
            convert_to_json(src_path, file_dir)
        elif file_type == 'tsv':
            file_dir = file_dir+'/'+'tsv'
            if not os.path.exists(file_dir):
                os.makedirs(file_dir, exist_ok=True)
            convert_to_tsv(src_path, file_dir)
        pass
    else:
        print('Incorrect no. of arguments passed')
        print_help()
    pass
