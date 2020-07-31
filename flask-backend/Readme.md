REST-auth and REST-APIs for OpenMF
=========

Installation
------------

After cloning, create a virtual environment and install the requirements. For Linux and Mac users:

    $ virtualenv venv
    $ source venv/bin/activate
    (venv) $ pip install -r requirements.txt

If you are on Windows, then use the following commands instead:

    $ virtualenv venv
    $ venv\Scripts\activate
    (venv) $ pip install -r requirements.txt

Running
-------

To run the server use the following command:

    (venv) $ export FLASK_APP = api
    (venv) $ export FLASK_DEBUG=1
    (venv) $ flask run

Eithr from a terminal window or from postman you can send requests.

API Documentation
-----------------
[click here](https://github.com/shivanshu1333/My-GSoC-Proposals/blob/master/GSoC'20-SCoReLab-OpenMF.pdf)