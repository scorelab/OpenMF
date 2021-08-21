OpenMF - Flask Backend
==================================

# SetUp and Run

## Fork, Clone and Remote

If you have not forked and cloned this repository before, please go to this [Forking and Cloning](https://github.com/scorelab/OpenMF/wiki/Forking-and-Cloning) wiki page to get instructions regarding the same.

## Update Enviornment Variables
To run the project you need to update the following ENVIORNMENT VARIABLES.

    export FLASK_APP="api"
    export FLASK_ENV="development or production or testing"
    SECRET_KEY="your secret key"
    MAIL_USERNAME="<Enter Mail User Name />"
    MAIL_PASSWORD="<Enter Mail App Password />"
    MAIL_SERVER="<Enter Mail Server />"
    MAIL_PORT="<Enter Mail Port Number />"

To run the project successfully, you need to create .**env** file using .envsample file

## Installation

After cloning, create a virtual environment and install the requirements. For Linux and Mac users:

    $ virtualenv venv
    $ source venv/bin/activate
    (venv) $ pip install -r requirements.txt

If you are on Windows, then use the following commands instead:

    $ virtualenv venv
    $ venv\Scripts\activate
    (venv) $ pip install -r requirements.txt

## Running the Flask Server

Step 1: Change the current directory to Flask-backend
```sh
(venv) $ cd flask-backend
```

Step 2: Set up FLASK_APP
(For Linux or Mac)
```sh
(venv) $ `export FLASK_APP=api`
```

(For Windows)
```sh
(venv) $ `set FLASK_APP=api`
```

Step 3: Now, Upgrade the Migrated Database, using the following command
```sh
(venv) $ flask db upgrade
```

Step 4:Start the backend server
To run the server use the following command:
```sh
(venv) $ flask run
```


# API Endpoints List

```
Endpoint                   Methods       Rule
-------------------------  ------------  ---------------------------------------
analytics.execute_query    POST          /analytics/query
auth.login_post            POST          /login
auth.logout                POST          /logout
case._get_file             POST          /case/get-file
case.case_tree             GET, POST     /case/case-tree
case.count                 GET           /case/count
case.deletecase            POST          /case/delete
case.extracted_cases       GET           /case/extracted-cases
case.filter                POST          /case/filter
case.getCase               GET           /case/get_case/<casename>
case.list                  GET           /case/list
case.openCase              GET           /case/open/<case_name>
case.openFile              GET           /case/list-files/<case_name>/<folder_name>/<file_name>
case.openFolder            GET           /case/list-files/<case_name>/<folder_name>
common.commonwordlist      POST          /common/<case1>/<case2>
common.mostcommonwordlist  POST          /common/words/<case1>/<case2>
data.bluetooth             GET           /data/<case_name>/bluetooth
data.browsers              GET           /data/<case_name>/browsers
data.location              GET           /data/<case_name>/location
data.media                 GET           /data/<case_name>/media
data.sms                   GET           /data/<case_name>/sms
extraction.extract         POST          /extraction/extract_data
extraction.list_devices    GET           /extraction/list_devices
keyword.customsearch       POST          /keyword/custom/search
keyword.search             POST          /keyword/search
keyword.searchfromCase     POST          /keyword/<case_name>/search
keyword.searchtags         POST          /keyword/search/tags
report.browserdata         POST          /report/browserdata
report.generalinfo         POST          /report/generalinfo
report.locationinfo        POST          /report/locations
static                     GET           /static/<path:filename>
task.assigned_tasks        GET           /task/assigned-tasks
task.completed_tasks       GET           /task/completed-tasks
task.create                POST          /task/create
task.delete                DELETE        /task/delete/<int:id>
task.edit_title            PUT           /task/edit-title
task.get_all_tasks         GET           /task/all-tasks
task.mark_complete         PUT           /task/mark-complete/<int:id>
task.todo_tasks            GET           /task/todo-tasks
user.add_users             POST          /user/add-user
user.all_users             GET           /user/all-users
user.create_user           POST          /user/create
user.delete                DELETE        /user/delete
user.deleteuser            DELETE, POST  /user/delete-user
user.extracted_cases       POST          /user/extracted-cases
user.getUser               GET           /user/getAdmin/<int:id>
user.get_extracted_cases   GET           /user/extractor/extracted-cases
user.get_extractor         GET           /user/getExtractor/<int:id>
user.get_management        GET           /user/getManagement/<int:id>
user.profile               GET           /user/profile
user.roleupdate            PUT           /user/role-update
```

**Note** : You can find the updated list of API endpoints using the following command
```sh
(venv) $ flask routes
```
