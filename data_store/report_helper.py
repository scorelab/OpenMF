"""
This one contain abstract and general methods of generating original report for a particular case
"""
import os

import pdfkit

from data_store.layout_generator import *
from scripts.io_helper import write_to_file
from scripts.os_check import SEP
from utils import ROOT_DIR


def load_list_from_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
        f.close()
    return eval(content)


def generate_html_report(session_name):
    report_file = ROOT_DIR + SEP + session_name + SEP + 'report.txt'
    report = load_list_from_file(report_file)
    case_name = None
    for x in report:
        if str(x[0]).__contains__('Case Name'):
            case_name = x[1]
    style = css_style_generator()
    header = header_generator(style)

    table = table_generator(None, report)
    body_head = '<center style="font-size:40px;margin:25px;">' + 'Case Name - ' + case_name + '</center>'
    body = body_generator(body_head + table)
    html = wrap_html(header, body)
    html_file_path = ROOT_DIR + SEP + session_name + SEP + 'report' + SEP + 'report.html'

    os.makedirs(ROOT_DIR + SEP + session_name + SEP + 'report', exist_ok=True)
    if write_to_file(html_file_path, html):
        return html_file_path
    else:
        return None


def generate_pdf_report(session_name):
    html_filepath = generate_html_report(session_name)
    return pdfkit.from_file(html_filepath, ROOT_DIR + SEP + session_name + SEP + 'report' + SEP + 'report.pdf')
