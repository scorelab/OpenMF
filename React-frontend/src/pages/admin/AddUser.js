import React, { useReducer } from 'react';
import { MDBBtn, MDBCol, MDBContainer, MDBInput } from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';

import formReducer from '../../utils/formReducer';
import { addUser } from '../../store/actions/users';
import Dropdown from '../../components/core/Dropdown';

const AddUser = ({ history }) => {
  const dispatch = useDispatch();

  const { isLoading } = useSelector(state => state.users);
  const options = ['admin', 'extractor', 'management'];
  const initialFormData = {
    name: '',
    email: '',
    password: '',
    role: options[0],
  };
  const [formData, setFormData] = useReducer(formReducer, initialFormData);

  const addUserHandler = e => {
    e.preventDefault();
    dispatch(addUser(formData, () => history.push('/admin')));
  };

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <MDBContainer className='my-4'>
      <h1>Add User</h1>
      <hr />
      <MDBCol lg={8}>
        <form onSubmit={addUserHandler}>
          <MDBInput
            name='name'
            label='Enter Name'
            value={formData.name}
            required
            onChange={event => setFormData(event.target)}
          />
          <MDBInput
            name='email'
            label='Enter Email Address'
            value={formData.email}
            required
            type='email'
            onChange={event => setFormData(event.target)}
          />
          <MDBInput
            name='password'
            label='Enter Password'
            value={formData.password}
            required
            type='password'
            onChange={event => setFormData(event.target)}
          />
          <Dropdown
            name='role'
            value={formData.role}
            label='Select role'
            options={options}
            onChange={event => setFormData(event.target)}
          />
          <MDBBtn type='submit'>Save User</MDBBtn>
        </form>
      </MDBCol>
    </MDBContainer>
  );
};

export default AddUser;
