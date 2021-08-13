OpenMF - Flask Backend
==================================

# SetUp and Run
----------------

## Fork, Clone and Remote

1. **Fork** :-  If You want to Contribute to this project you will need to have your own   copy of the project as your Remote repository over GitHub. For this purpose, you can fork the project by clicking the **Fork** Button that you can be found on the top right corner of the landing page of this repository.Refer the below picture :-
    <br ></br>
    ![forkImage](https://user-images.githubusercontent.com/64790109/129328021-89fcf73b-5b3c-4a4a-95c6-8fc96961d196.jpeg)


1. **Clone** :- After forking the Project, run the following command inside any  specific directory :-

    ```
    $ git clone https://github.com/YOUR_GITHUB_USER_NAME/OpenMF.git
    ```
2. **Remote** :- By defualt after clonning the remote pointing to your remote repository is the **origin** remote. To keep track of the original repository, you should add another remote named **upstream**. For this Project, it can be done by running the following command -

    ```
    $ git remote add upstream https://github.com/scorelab/OpenMF.git
    ```
    You can also check out whether **upstream** remote is correctly added or not by using the following command :-
    ```
    $ git remote -v
    ```
    You should see the following output :-
    ```text
    origin  https://github.com/YOUR_GITHUB_USER_NAME/OpenMF.git (fetch)
    origin  https://github.com/YOUR_GITHUB_USER_NAME/OpenMF.git (push)
    upstream        https://github.com/scorelab/OpenMF.git (fetch)
    upstream        https://github.com/scorelab/OpenMF.git (push)
    ```

## Sync with Upstream

Always keep your local copy of repository updated with the original repository.

Before making any changes and/or in an appropriate interval, run the following commands carefully to update your local repository.

```sh
# Fetch all remote repositories and delete any deleted remote branches
$ git fetch --all --prune

# Switch to `master` branch
$ git checkout master

# Reset local `main` branch to match `upstream` repository's `master` branch
$ git reset --hard upstream/master

# Push changes to your forked `OpenMF` repo
$ git push origin master

```

**Note**: Always keep remmeber to sync your local repository to the upstream repository before raising a PR.

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

Step 1: Set up FLASK_APP
(For Linux or Mac)
```sh
(venv) $ `export FLASK_APP=api`
```

(For Windows)
```sh
(venv) $ `set FLASK_APP=api`
```

Step 2: Now, Upgrade the Migrated Database, using the following command
```sh
(venv) $ flask db upgrade
```

Step 3:Start the backend server
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
