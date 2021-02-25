import React, { useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom'; 
import { MDBContainer, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import axios from 'axios';
import { setAlert } from '../store/actions/alerts';

import formReducer from '../utils/formReducer';

const FormPage = () => {
  const history = useHistory()
  const dispatch = useDispatch();
  const initialFormData = {
    name: '',
    email: '',
    password: '',
    role: 'admin'
  };
  const { isLoading } = useSelector(state => state.auth);
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useReducer(formReducer, initialFormData);
  const [passwordShown, setPasswordShown] = useState(false);

  // password  toggle handler
  const togglePasswordVisibilty = () => {
    setPasswordShown(passwordShown ? false : true)
  } 

  const signUpHandler = async e => {
    setSending(true)
    e.preventDefault();
    e.target.className += " was-validated"
    if (formData.name && formData.email && formData.password){
        try{
            await axios.post('/user/create', formData, {
              headers: {
                'Content-Type': 'application/json',
              }
            });
            dispatch(setAlert('Success! You have registered', 'success'))
            setSending(false)
            history.push('/login')
          } catch(error) {
            const errorMsg = error.response.data
            dispatch(setAlert(errorMsg, 'danger'))
            setSending(false)
        } 
    }
    setSending(false)
  };

  return (
    <MDBContainer>
      <br />
      <MDBCard>
        <MDBCardBody className='align-center'>
          <form 
            className='needs-validation'  
            onSubmit={signUpHandler}
            noValidate
          >
            <p className='h4 text-center py-4'>For Admins</p>
            <p className='h7 text-center'>
              {isLoading
                ? 'Authenticating'
                : 'Create Account and organize your workspace'}
            </p>{' '}
            <div className='grey-text'>
                <MDBInput
                    disabled={isLoading}
                    label='Your name'
                    icon='user'
                    group
                    value={formData.name}
                    type='text'
                    error='wrong'
                    required
                    success='right'
                    name='name'
                    onChange={event => setFormData(event.target)}
                >
                    <div className='invalid-feedback'>
                        Please provide a name.
                    </div>
                    <div className='valid-feedback'>Looks good!</div>
                </MDBInput>

              <MDBInput
                disabled={isLoading}
                label='Your email'
                icon='envelope'
                group
                value={formData.email}
                type='email'
                error='wrong'
                required 
                success='right'
                name='email'
                onChange={event => setFormData(event.target)}
              >
                <div className='invalid-feedback'>
                  Please provide a valid email.
                </div>
                <div className='valid-feedback'>Looks good!</div>
              </MDBInput>
              <MDBInput
                disabled={isLoading}
                label='Your password'
                icon='lock'
                group
                required
                value={formData.password}
                type={passwordShown ? 'text': 'password'}
                name='password'
                onChange={event => setFormData(event.target)}
              >
                <div className="invalid-feedback mb-4">
                  Please provide a password.
                </div>
                <div className="valid-feedback">Looks good!</div>
              </MDBInput>
              <div class='form-check m-0'>
                  <input
                    class='form-check-input'
                    type='checkbox'
                    name='remember'
                    value={passwordShown}
                    onChange={togglePasswordVisibilty}
                  />
                  <label class='form-check-label' htmlFor='flexCheckDefault'>
                    Show Password
                  </label>
                </div>
              <div className='d-flex justify-content-center'>
              </div>
            </div>
            <p className='mt-3  font-small blue-text d-flex justify-content-center pb-3'>
              <Link to='/login' className='blue-text ml-1'>
                Already have an accont ? Login.
              </Link>
            </p>
            <div className='text-center py-4'>
              <MDBBtn
                disabled={isLoading || sending}
                type='submit'
                color='elegant'
                size='md'>
                {
                    (sending) ?
                    'wait...'
                    : 'register'
                }
              </MDBBtn>
            </div>
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default FormPage;
