os=$1
if [ $os == "windows" ]
then
  virtualenv venv
  source venv/Scripts/activate
  pip install -r requirements.txt
else
  virtualenv venv
  source venv/bin/activate
  pip install -r requirements.txt
fi
python create_database.py