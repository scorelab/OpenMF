import React, { useState } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
} from 'mdbreact';
import { useSelector, useDispatch } from 'react-redux';

import { updateUserRole } from '../../store/actions/users';
import Dropdown from '../core/Dropdown';

const EditUserModal = ({ isOpen, onToggle }) => {
  const dispatch = useDispatch();
  const email = useSelector(state => state.users.selectedUser);
  const options = ['admin', 'extractor', 'management'];
  const [role, setRole] = useState(options[0]);

  const updateUserHandler = () => {
    dispatch(updateUserRole(email, role, onToggle));
  };

  return (
    <MDBModal isOpen={isOpen}>
      <MDBModalHeader>Edit User Role</MDBModalHeader>
      <MDBModalBody>
        <Dropdown
          name='role'
          value={role}
          label='Select role'
          options={options}
          onChange={event => setRole(event.target.value)}
        />
      </MDBModalBody>
      <MDBModalFooter>
        <MDBBtn color='secondary' onClick={() => onToggle(false)}>
          Cancel
        </MDBBtn>
        <MDBBtn color='primary' onClick={updateUserHandler}>
          Update User
        </MDBBtn>
      </MDBModalFooter>
    </MDBModal>
  );
};

export default EditUserModal;
