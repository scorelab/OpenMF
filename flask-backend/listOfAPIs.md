List of APIs

User Related APIs
-----------------

1)   -P    http://127.0.0.1:5000/login
2)   -P    http://127.0.0.1:5000/logout
3)   -G    http://127.0.0.1:5000/user/profile
4)   -G    http://127.0.0.1:5000/user/getUser/<id>
5)   -G    http://127.0.0.1:5000/user/count
6)   -G    http://127.0.0.1:5000/user/list
7)   -P    http://127.0.0.1:5000/user/create
8)   -P    http://127.0.0.1:5000/user/role-update
9)   -P    http://127.0.0.1:5000/user/delete   
10)  -P    http://127.0.0.1:5000/user/add-user
11)  -G    http://127.0.0.1:5000/user/all-user
12)  -P    http://127.0.0.1:5000/user/remove-user

Case Related APIs
-----------------

3)   -G    http://127.0.0.1:5000/case/count
4)   -G    http://127.0.0.1:5000/case/list
5)   -P    http://127.0.0.1:5000/case/delete
6)   -G    http://127.0.0.1:5000/case/open/<case_name>
7)   -G    http://127.0.0.1:5000/case/list-files/<case_name>/<folder_name>
8)   -G    http://127.0.0.1:5000/case//list-files/<case_name>/<folder_name>/<file_name>  

Analytics Related APIs
----------------------

9)   -P    http://127.0.0.1:5000/analytics/query

Extaction Related APIs
----------------------

10)   -G    http://127.0.0.1:5000/extraction/list_devices
11)   -P    http://127.0.0.1:5000/extraction/extract_data