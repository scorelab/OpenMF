import React, { useState } from 'react';
import { MDBBtn, MDBInput } from 'mdbreact';
import { Link, useParams } from 'react-router-dom';

import Layout from '../components/core/Layout';
import { changePassword } from '../utils/resetPassword';
import { useDispatch } from 'react-redux';
import { setAlert } from '../store/actions/alerts';

const ResetPasswordPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const resetPasswordHandler = () => {
    const token = params.token;
    if (!password || !password2) {
      dispatch(setAlert('Please enter password', 'danger'));
      return;
    }
    if (password !== password2) {
      dispatch(setAlert('Passwords do not match', 'danger'));
      return;
    }
    setIsLoading(true);
    changePassword(token, password)
      .then(res => {
        dispatch(setAlert('Password reset. Please log in', 'success'));
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        dispatch(setAlert(err.message, 'danger'));
        setIsLoading(false);
      });
  };

  return (
    <Layout sidebarBool={false} background={false}>
      <div className='col mt-4' align='center'>
        <h1 className='display-4'>Reset Password</h1>
        <div className='col-6'>
          <MDBInput
            disabled={isLoading}
            label='Enter password'
            required
            type='password'
            value={password}
            name='password'
            onChange={event => setPassword(event.target.value)}
          />
          <MDBInput
            disabled={isLoading}
            label='Confirm password'
            required
            type='password'
            value={password2}
            name='password2'
            onChange={event => setPassword2(event.target.value)}
          />
          <MDBBtn onClick={resetPasswordHandler} disabled={isLoading}>
            Reset Password
          </MDBBtn>
          <Link to='/'>
            <MDBBtn disabled={isLoading}>Go to Home</MDBBtn>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default ResetPasswordPage;
