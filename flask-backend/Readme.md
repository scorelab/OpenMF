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

**<p align="center">Working demo of some of the Flask REST APIs using Postman are shown below</p>**

<p align="center">
<img src="https://user-images.githubusercontent.com/26167974/89051331-b9314300-d371-11ea-81ed-a4b14ebfa77c.gif">
</p>

**<p align="center">Terminal</p>**


<p align="center">
<img src="https://user-images.githubusercontent.com/26167974/89051359-c2221480-d371-11ea-80fa-a115b4fb4cfa.gif">
</p>

**<p align="center">Create User API</p>**


<p align="center">
<img src="https://user-images.githubusercontent.com/26167974/89051369-c6e6c880-d371-11ea-86de-376fcadd02a1.gif">
</p>

**<p align="center">Login API</p>**


<p align="center">
<img src="https://user-images.githubusercontent.com/26167974/89051381-cbab7c80-d371-11ea-9bb4-e2d9e0092a79.gif">
</p>

**<p align="center">Logout API</p>**


<p align="center">
<img src="https://user-images.githubusercontent.com/26167974/89051422-d9f99880-d371-11ea-8c0a-5aec14eb109b.gif">
</p>

**<p align="center">Error handling</p>**


<p align="center">
<img src="https://user-images.githubusercontent.com/26167974/89051483-f695d080-d371-11ea-8959-d527bbb153db.gif">
</p>

**<p align="center">Change role API</p>**


<p align="center">
<img src="https://user-images.githubusercontent.com/26167974/89051505-fe557500-d371-11ea-85a5-36e7775da734.gif">
</p>

**<p align="center">Delete User API</p>**