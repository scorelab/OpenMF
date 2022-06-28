Setting up frontend for OpenMF
==============================

## Fork, Clone and Remote
If you have not forked and cloned this repository before, please go to this [Forking and Cloning](https://github.com/scorelab/OpenMF/wiki/Forking-and-Cloning) wiki page to get instructions regarding the same.

## General Guidelines

 - Before working on any issue, kindly go through the instructions given in the     [Contribution Guidelines](https://github.com/scorelab/OpenMF/wiki/Contribution-Guidelines) and readme the file carefully.
 - Also before raising an issue make sure that you have checked out, whether the issue is not created previously.
 - For each issue, a detailed explanation is mentioned in the issue ticket itself, for more details refer to [Issue templates](https://github.com/scorelab/OpenMF/tree/master/.github/ISSUE_TEMPLATE).
 - while making any new component, make sure that you have wrapped that component inside a page component, for have an idea about this please refer [src->pages](https://github.com/scorelab/OpenMF/tree/master/React-frontend/src/pages/) folder.
 - While making any component for any specific role, make sure that the code for the all related components is kept in the folder specific to that user. For example, if your are working on an component related to **Extractor**, then you should keep in [src->components->Extractor](https://github.com/scorelab/OpenMF/tree/master/React-frontend/src/components/Extractor/).
 - Kindly keep the source code in the [src->pages](https://github.com/scorelab/OpenMF/tree/master/React-frontend/src/pages/) folder while making specific pages.
 - Please make sure to adhere to the folder structure of the project.


## Installation

After cloning, create a virtual environment and install the requirements. For Linux and Mac users:

    $ virtualenv venv
    $ source venv/bin/activate
    (venv) $ pip install -r requirements.txt

If you are on Windows, then use the following commands instead:

    $ virtualenv venv
    $ venv\Scripts\activate
    (venv) $ pip install -r requirements.txt

<!-- create .env -->
Create a new `.env` file as in `/React-frontend` folder. Add the following lines to the file:
```
REACT_APP_GOOGLE_CLIENT_ID=<your-google-client-id>
```

You can refer .env.example file for more details.



Running
-------
Step1: Change directory to React-Frontend
```sh
 (venv) $ cd React-Frontend
```

Step2: Install required dependencies
```sh
(venv) $ npm install
```
Step3: Run the react server:
```sh
(venv) $ npm start
```

And use localhost:3000 to browse.

**Note :-** To run the Frontend side of the application is recommended to run the backend server too. For more details regarding Flask Backend Setup instrucstions, Please refer [Flask Backend-Setup](https://github.com/scorelab/OpenMF/wiki/OpenMF-Set-up#openmf---flask-backend) wiki page.
