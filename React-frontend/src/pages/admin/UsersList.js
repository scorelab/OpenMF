import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MDBContainer, MDBRow } from 'mdbreact';

import UsersTable from '../../components/Admin/UsersTable';
import { fetchUsers, selectUser } from '../../store/actions/users';
import DeleteUserModal from '../../components/Admin/DeleteUserModal';
import EditUserModal from '../../components/Admin/EditUserModal';

const UsersList = () => {
  const dispatch = useDispatch();
  const [showDeleteModal, toggleShowDeleteModal] = useState(false);
  const [showEditModal, toggleShowEditModal] = useState(false);
  const { users, isLoading } = useSelector(state => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const selectUserForDeletion = email => {
    dispatch(selectUser(email));
    toggleShowDeleteModal(true);
    console.log('Test' + showDeleteModal);
  };

  const selectUserForEdit = email => {
    dispatch(selectUser(email));
    toggleShowEditModal(true);
    console.log('Test' + showEditModal);
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
      <UsersTable
        users={users}
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
