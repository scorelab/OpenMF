import os

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))

def mkdir(_dir):
    os.makedirs(_dir, exist_ok=True)