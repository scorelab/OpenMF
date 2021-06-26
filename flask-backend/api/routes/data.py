import os
from flask import Blueprint
from api.models.case import Case
from api.schema.case import CaseSchema
from api.extansions import db

ROOT_DIR = os.getcwd()

case_schema = CaseSchema()
cases_schema = CaseSchema(many=True)

data = Blueprint('data', __name__, url_prefix='/data')
dirname = os.path.dirname(__file__)
cases_data_path = os.path.join(dirname, '../../../data/')


@data.route('/<case_name>/sms',methods = ["GET"])
def sms(case_name):
    File = cases_data_path +  case_name + "/tsv/" + "sms.tsv"
    os.chdir(ROOT_DIR)
    return File


@data.route('/<case_name>/browsers',methods = ["GET"])
def browsers(case_name):
    File = cases_data_path + case_name + "/tsv/" + "history.tsv"
    os.chdir(ROOT_DIR)
    return File


@data.route('/<case_name>/bluetooth',methods = ["GET"])
def bluetooth(case_name):
    File = cases_data_path + case_name + "/tsv/" + "bluetooth.tsv"
    os.chdir(ROOT_DIR)
    return File

@data.route('/<case_name>/location',methods = ["GET"])
def location(case_name):
    File1 = cases_data_path + case_name + "/tsv/" + "savedlocation.tsv"
    File2 = cases_data_path + case_name + "/tsv/" + "searchedlocation.tsv"
    os.chdir(ROOT_DIR)
    return jsonify(File1, File2)

@data.route('/<case_name>/media', methods = ["GET"])
def media(case_name):
    File = cases_data_path + case_name + "/tsv/" + "mediadata.tsv"
    os.chdir(ROOT_DIR)
    return File

