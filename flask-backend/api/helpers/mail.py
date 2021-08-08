"""
Helper function to send message.
"""

from flask_mail import Message
from api.extansions import mail

def send_reset_link_mail(recipient, reset_link):
    """
    Function to send password reset link through mail.
    Parameters:
    1. recipiant: Email address of recipient.
    2. reset_link: Reset Link for changing password.

    Result:
    returns none
    """

    # create message instance
    message = Message("OpenMF: Reset Password Link", sender='test@openmf.com', recipients=[recipient])

    # Create message body
    message.body = f"Use this link to reset your password: {reset_link}"

    # send message
    try:
        mail.send(message)

    # Handle error
    except ConnectionRefusedError as e:
        print(f"MAIL ERROR: {e}")
        raise ConnectionRefusedError

    except Exception as e:
        print(f"MAIL ERROR: {e}")
        raise Exception


def send_verify_link_mail(recipient, verify_link):
    """
    Function to send email verify link through mail.
    Parameters:
    1. recipiant: Email address of recipient.
    2. reset_link: Reset Link for changing password.

    Result:
    returns none
    """

    # create message instance
    message = Message("OpenMF: Email Verification Link", sender='test@openmf.com', recipients=[recipient])

    # Create message body
    message.body = f"Use this link to verify your email: {verify_link}"

    # send message
    try:
        mail.send(message)

    # Handle error
    except ConnectionRefusedError as e:
        print(f"MAIL ERROR: {e}")
        raise ConnectionRefusedError

    except Exception as e:
        print(f"MAIL ERROR: {e}")
        raise Exception
