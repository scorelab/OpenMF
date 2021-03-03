import os
from flask_mail import Message, Mail

from .. import create_app

def send_confirmation_email(recipient, url):
  app = create_app()
  app.config.update(dict(
    DEBUG = True,
    MAIL_SERVER = os.getenv('MAIL_SERVER'),
    MAIL_PORT = os.getenv('MAIL_PORT'),
    MAIL_USE_TLS = True,
    MAIL_USE_SSL = False,
    MAIL_USERNAME = os.getenv('MAIL_USERNAME'),
    MAIL_PASSWORD = os.getenv('MAIL_PASSWORD'),
  ))
  mail = Mail(app)
  msg = Message('Confirm OpenMF account', sender='test@openmf.com', recipients=[recipient])
  msg.body = f'Please use this url to confirm your account: {url}'
  try:
    mail.send(msg)
  except ConnectionRefusedError as err:
    print("Mail Server not working")
    print(err)
    raise ConnectionRefusedError