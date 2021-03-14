import React from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
} from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '../../store/actions/users';

const DeleteUserModal = ({ isOpen, onToggle }) => {
  const dispatch = useDispatch();
  const email = useSelector(state => state.users.selectedUser);

  const deleteUserHandler = () => {
    dispatch(deleteUser(email, onToggle));
  };

  return (
    <MDBModal isOpen={isOpen}>
      <MDBModalHeader>Confirmation</MDBModalHeader>
      <MDBModalBody>
        <p className='lead'>Are you sure you want to delete this user?</p>
      </MDBModalBody>
      <MDBModalFooter>
        <MDBBtn color='secondary' onClick={() => onToggle(false)}>
          Cancel
        </MDBBtn>
        <MDBBtn color='primary' onClick={deleteUserHandler}>
          Delete User
        </MDBBtn>
      </MDBModalFooter>
    </MDBModal>
  );
};

export default DeleteUserModal;
