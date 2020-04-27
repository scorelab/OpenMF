from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return 'Welcome to home page of OpenMF, the project is under development and expected to get completed in GSOC-2020'