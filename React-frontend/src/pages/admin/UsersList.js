import React, { useEffect, useState, useReducer } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MDBCol, MDBContainer, MDBInput, MDBRow } from 'mdbreact';

import UsersTable from '../../components/Admin/UsersTable';
import { fetchUsers, searchUser, selectUser } from '../../store/actions/users';
import DeleteUserModal from '../../components/Admin/DeleteUserModal';
import EditUserModal from '../../components/Admin/EditUserModal';
import Dropdown from '../../components/core/Dropdown';
import formReducer from '../../utils/formReducer';

const UsersList = () => {
  const options = ['all', 'admin', 'extractor', 'management'];
  const initialFormData = {
    query: '',
    role: options[0],
  };
  const [formData, setFormData] = useReducer(formReducer, initialFormData);

  const dispatch = useDispatch();
  const [showDeleteModal, toggleShowDeleteModal] = useState(false);
  const [showEditModal, toggleShowEditModal] = useState(false);
  const { filteredUsers, isLoading } = useSelector(state => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const selectUserForDeletion = email => {
    dispatch(selectUser(email));
    toggleShowDeleteModal(true);
  };

  const selectUserForEdit = email => {
    dispatch(selectUser(email));
    toggleShowEditModal(true);
  };

  const searchUserHandler = event => {
    setFormData(event.target);
    const data = { ...formData, [event.target.name]: event.target.value };
    dispatch(searchUser(data.query, data.role));
  };

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <MDBContainer className='my-4'>
      <h1>Admin Dashboard</h1>
      <hr />
      <MDBRow>
        <Link to='admin/add-user' className='btn btn-success'>
          Add User
        </Link>
      </MDBRow>
      <hr />
      <MDBCol size='6'>
        <Dropdown
          value={formData.role}
          name='role'
          label='User Role'
          options={options}
          onChange={searchUserHandler}
        />
        <MDBInput
          name='query'
          value={formData.query}
          label='Search by name/email'
          onChange={searchUserHandler}
        />
      </MDBCol>
      <hr />
      <UsersTable
        users={filteredUsers}
        onDelete={selectUserForDeletion}
        onEdit={selectUserForEdit}
      />
      <EditUserModal isOpen={showEditModal} onToggle={toggleShowEditModal} />
      <DeleteUserModal
        isOpen={showDeleteModal}
        onToggle={toggleShowDeleteModal}
      />
      <hr />
    </MDBContainer>
  );
};

export default UsersList;
