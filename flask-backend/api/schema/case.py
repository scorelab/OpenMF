"""
Schema for Case Model.
"""
from api.extansions import ma


class CaseSchema(ma.Schema):
    class Meta:
        fields = ('case_name', 'data_path', 'extracted_on', 'extractor_id', 'device_id')