import os
import sqlite3
import sys
from scripts.file_helper import write_as_tsv
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


def convert_to_tsv(db_path, tsv_file_path):
    connection = sqlite3.connect(db_path)
    cursor = connection.cursor()
    cursor.execute('SELECT name FROM sqlite_master WHERE type = "table"')
    tables = []
    print('Tables in database are :: ')
    for table_tuple in cursor.fetchall():
        tables.append(table_tuple[0])
        print(table_tuple[0])
    for table in tables:
        schema_query = 'pragma table_info("{0}")'.format(table)
        schema = cursor.execute(schema_query).fetchall()
        columns = []
        for columns_tpl in schema:
            columns.append(columns_tpl[1])
        select_query = 'SELECT * from {0};'.format(table)
        rows = cursor.execute(select_query).fetchall()
        write_as_tsv(tsv_file_path + '/' + table + '.tsv', columns, rows)


def print_help():
    help_str = """
        converter is a simple script to convert DB files to tsv (tab separated value)
        python converter.py <src-file-path> <destination-folder>
        example : 
            python converter.py /home/user/Downloads/accounts.db /home/user/data/
    """
    print(help_str)


if __name__ == '__main__':
    args = sys.argv
    if len(args) < 3:
        print('Insufficient arguments')
        print_help()
    elif len(args) == 3:
        src_path = args[1]
        dest_dir = args[2]
        if not os.path.exists(src_path):
            print('Given db file path is incorrect. This filepath doesn\'t exists ::' + src_path)
        file_dir = os.path.dirname(dest_dir)
        os.makedirs(file_dir, exist_ok=True)
        convert_to_tsv(src_path, file_dir)
        pass
    else:
        print('Incorrect no. of arguments passed')
        print_help()
    pass
