import React from 'react';
import { MDBTable, MDBTableHead, MDBTableBody, MDBRow } from 'mdbreact';

const UsersTable = ({ users, onEdit, onDelete }) => {
  return (
    <MDBTable>
      <MDBTableHead>
        <tr>
          <th>No</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {users.map((user, index) => (
          <tr>
            <td>{index + 1}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
              <MDBRow>
                <button
                  className='m-0 mr-2 btn btn-warning btn-sm'
                  onClick={() => onEdit(user.email)}>
                  Edit
                </button>
                <button
                  className='m-0 btn btn-danger btn-sm'
                  onClick={() => onDelete(user.email)}>
                  Delete
                </button>
              </MDBRow>
            </td>
          </tr>
        ))}
      </MDBTableBody>
    </MDBTable>
  );
};

export default UsersTable;
