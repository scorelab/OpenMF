os=$1
if [ $os == "windows" ]
then
  source venv/Scripts/activate
else
  source /venv/bin/activate
fi
export FLASK_APP='api'
export FLASK_DEBUG=1
flask run