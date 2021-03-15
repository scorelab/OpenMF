from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user

from .. import db
from ..models.models import User
from ..models.RoleRequest import RoleRequest, RoleRequestSchema

rolerequests = Blueprint('rolerequests', __name__, url_prefix='/rolerequests')

rolerequests_schema = RoleRequestSchema(many=True)

# Fetch all requests for an admin
@rolerequests.route('/', methods=['GET'])
@login_required
def get_all_rolerequests():

  # Only admins can view role requests
  if current_user.has_admin:
    response = {
      'success': False,
      'msg': 'Role requests can only be viewed by an admin',
    }
    return jsonify(response), 400

  # Admin can only see the requests of his created users
  admin_id = current_user.id
  rolerequests = RoleRequest.query.filter_by(admin_id=admin_id).order_by(RoleRequest.timestamp).all()
  result = rolerequests_schema.dump(rolerequests)
  response = {
    'success': True,
    'data': result,
    'msg': 'Role requests fetched successfully'
  }
  return jsonify(response), 200

# Fetch a request by id
@rolerequests.route('/<id>', methods=['GET'])
@login_required
def get_rolerequest_by_id(id):

  if not id:
    response = {
      'success': False,
      'msg': 'Please provide an id',
    }
    return jsonify(response), 400

  rolerequest = RoleRequest.query.filter_by(id=id).first()
  if not rolerequest:
    response = {
      'success': False,
      'msg': 'Role request not found',
    }
    return jsonify(response), 404

  # Only the concerned admin or the user who posted this request should be able to access it
  if rolerequest.admin_id != current_user.id and rolerequest.user_id != current_user.id:
    response = {
      'success': False,
      'msg': 'Not authorized to view this request',
    }
    return jsonify(response), 401

  response = {
    'success': True,
    'data': rolerequest,
    'msg': 'Role requests fetched successfully',
  }
  return jsonify(response), 200

# submit a role request
@rolerequests.route('/', methods=['POST'])
@login_required
def submit_role_request():
  
  # Only extractor or management can submit a role request
  if not current_user.has_admin:
    response = {
      'success': False,
      'msg': 'You\'re already an admin',
    }
    return jsonify(response), 400

  # Check if requested role is provided or not
  try:    
    req = request.get_json()
    requested_role = str(req['requested_role'])
  except:
    response = {
      'success': False,
      'msg': 'Please provide a role',
    }
    return jsonify(response), 400

  # Check if user already has the role he is requesting
  if requested_role == current_user.role:
    response = {
      'success': False,
      'msg': f'You are already {requested_role}',
    }
    return jsonify(response), 400

  # Check if role provided is a valid one
  if requested_role not in ['admin', 'extractor', 'management']:
    response = {
      'success': False,
      'msg': 'Please provide a valid role',
    }
    return jsonify(response), 400

  user_id = current_user.id

  # Find admin using email
  admin = User.query.filter_by(email=current_user.admin).first()

  # If admin is absent
  if not admin:
    response = {
      'success': False,
      'msg': 'Error submiting the request',
    }
    return jsonify(response), 500

  admin_id = admin.id
  rolerequest = RoleRequest(user_id=user_id, admin_id=admin_id, requested_role=requested_role)
  db.session.add(rolerequest)
  db.session.commit()

  response = {
    'success': True,
    'data': rolerequest.map(),
    'msg': 'Requested successfully submitted',
  }
  return jsonify(response), 200

# Accept a role request by its id
@rolerequests.route('/accept/<id>', methods=['PUT'])
@login_required
def accept_rolerequest(id):

  # Only admins can accept role requests
  if current_user.has_admin:
    response = {
      'success': False,
      'msg': 'Role requests can only be accepted by an admin',
    }
    return jsonify(response), 400

  if not id:
    response = {
      'success': False,
      'msg': 'Please provide an id',
    }
    return jsonify(response), 400
  
  rolerequest = RoleRequest.query.filter_by(id=id).first()

  # Check if request exists
  if not rolerequest:
    response = {
      'success': False,
      'msg': 'Role request not found',
    }
    return jsonify(response), 404

  # Check if request belongs to this admin
  if rolerequest.admin_id != current_user.id:
    response = {
      'success': False,
      'msg': 'Not authorized to accept this request',
    }
    return jsonify(response), 401

  requested_role = rolerequest.requested_role
  user = User.query.filter_by(id=rolerequest.user_id).first()

  # Check if user exists
  if not user:
    response = {
      'success': False,
      'msg': 'User not found',
    }
    return jsonify(response), 404

  # Update user role
  user.role = requested_role
  db.session.commit()

  # Delete the request as it is now resolved
  db.session.delete(rolerequest)
  db.session.commit()

  response = {
    'success': True,
    'msg': 'Role request accepted',
  }
  return jsonify(response), 200

# Reject a role request by its id
@rolerequests.route('/reject/<id>', methods=['DELETE'])
@login_required
def reject_rolerequest(id):

  # Only admins can reject role requests
  if current_user.has_admin:
    response = {
      'success': False,
      'msg': 'Role requests can only be rejected by an admin',
    }
    return jsonify(response), 400

  if not id:
    response = {
      'success': False,
      'msg': 'Please provide an id',
    }
    return jsonify(response), 400
  
  rolerequest = RoleRequest.query.filter_by(id=id).first()

  # Check if request exists
  if not rolerequest:
    response = {
      'success': False,
      'msg': 'Role request not found',
    }
    return jsonify(response), 404

  # Check if request belongs to this admin
  if rolerequest.admin_id != current_user.id:
    response = {
      'success': False,
      'msg': 'Not authorized to accept this request',
    }
    return jsonify(response), 401

  # Delete the request
  db.session.delete(rolerequest)
  db.session.commit()

  response = {
    'success': True,
    'msg': 'Role request rejected',
  }
  return jsonify(response), 200

