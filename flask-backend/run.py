"""
Flask CLI/Application entry point.
"""
import sys
import os
from dotenv import load_dotenv

from api import create_app

# Load dotenv variables
sys.path.insert(0,os.getcwd())
dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
if os.path.exists(dotenv_path):
    load_dotenv(dotenv_path)

app = create_app(os.environ.get("FLASK_APP"))


