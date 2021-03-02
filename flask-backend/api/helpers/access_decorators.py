from functools import wraps
from flask_login import current_user

# Use this decorator on routes which only admins should be able to access
def admin_only(fun):
  @wraps(fun)
  def wrap(*args, **kwargs):
    print(current_user)
    # If user is not logged in
    if not current_user.is_authenticated:
      return 'Unauthorized. Please log in as Admin', 401

    # If user is not admin
    if current_user.role != 'admin':
      return 'Unauthorized. Only Admins can access this route', 401

    # Else continue
    return fun(*args, **kwargs)
  return wrap

# Use this decorator on routes which only extractors should be able to access
def extractor_only(fun):
  @wraps(fun)
  def wrap(*args, **kwargs):
    # If user is not logged in
    if not current_user.is_authenticated:
      return 'Unauthorized. Please log in as Extractor', 401

    # If user is not admin
    if current_user.role != 'extractor':
      return 'Unauthorized. Only Extractors can access this route', 401

    # Else continue
    return fun(*args, **kwargs)
  return wrap

# Use this decorator on routes which only management should be able to access
def management_only(fun):
  @wraps(fun)
  def wrap(*args, **kwargs):
    # If user is not logged in
    if not current_user.is_authenticated:
      return 'Unauthorized. Please log in as Management', 401

    # If user is not admin
    if current_user.role != 'management':
      return 'Unauthorized. Only Management can access this route', 401

    # Else continue
    return fun(*args, **kwargs)
  return wrap