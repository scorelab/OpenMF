"""
Schema for Case Model.
"""
from api.extansions import ma


class CaseSchema(ma.Schema):
    class Meta:
        fields = ('case_name', 'data_size', 'extracted_on', 'extractor_id', 'data_path')