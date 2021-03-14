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
Step1: Create the Database
Run `python create_database.py`

Step2:Start the backend server
(For Linux or Mac)
To run the server use the following command:

    (venv) $ `export FLASK_APP=api`
    (venv) $ `export FLASK_DEBUG=1`
    (venv) $ `flask run`

(For Windows)
To run the server use the following command:

    (venv) $ `set FLASK_APP=api`
    (venv) $ `set FLASK_DEBUG=1`
    (venv) $ `flask run`

Either from a terminal window or from postman you can send requests.

Setting up a rooted device for data extraction
-------
There are 2 ways of setting up a device

**1. Using an Actual Rooted Physical Device**

1. Connect a rooted physical device to the system via USB.

2. Turn on USB Debugging in the developer options

**B) Setting up an Emulator**

1. Install Android Studio
2. Go to AVD Manager
3. Create a new virtual device using an image that does not have google playstore.

    ![1](https://user-images.githubusercontent.com/45410599/110638417-8cc98900-81d4-11eb-85a0-261789053e8f.png)
    
4. Start the virtual device.
5. To root this device, run the following commands in Command Prompt/Terminal -

    ```
    adb shell
    adb root
    ```

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



<p align="center">
<img src="https://github.com/sachinsom93/temp/blob/master/addusers.jpg?raw=true">
</p>

**<p align="center">Add user (Only admin can add a user)</p>**


<p align="center">
<img src="https://github.com/sachinsom93/temp/blob/master/roleUpdate.jpg?raw=true">
</p>

**<p align="center">Update role an user(Only an admin can update role of his user)</p>**


<p align="center">
<img src="https://github.com/sachinsom93/temp/blob/master/removeusers.jpg?raw=true">
</p>

**<p align="center">Delete a user(Only an admin can delete his users)</p>**


<p align="center">
<img src="https://github.com/sachinsom93/temp/blob/master/allusers.jpg?raw=true">
</p>

**<p align="center">View all users(Only an admin can view his users)</p>**

