import { MDBBtn, MDBInput } from 'mdbreact';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Layout from '../components/core/Layout';
import { setAlert } from '../store/actions/alerts';
import { sendResetPasswordMail } from '../utils/resetPassword';

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendResetMailHandler = () => {
    if (!email) {
      dispatch(setAlert('Please enter an email'));
      return;
    }
    setIsLoading(true);
    sendResetPasswordMail(email)
      .then(res => {
        dispatch(setAlert('Reset link sent. Check your email', 'success'));
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
        <h1 className='display-4'>Forgot Password</h1>
        <div className='col-6'>
          <MDBInput
            disabled={isLoading}
            label='Enter email'
            icon='email'
            required
            value={email}
            name='email'
            onChange={event => setEmail(event.target.value)}
          />
          <MDBBtn onClick={sendResetMailHandler} disabled={isLoading}>
            Send Reset Password Mail
          </MDBBtn>
          <Link to='/'>
            <MDBBtn disabled={isLoading}>Go to Home</MDBBtn>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPasswordPage;
