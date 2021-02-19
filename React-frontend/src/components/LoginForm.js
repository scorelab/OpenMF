import React, { useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MDBContainer, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';

import { login } from '../store/actions/auth';
import formReducer from '../utils/formReducer';

const FormPage = () => {
  const dispatch = useDispatch();
  const initialFormData = {
    email: '',
    password: '',
    remember: false,
  };
  const { isLoading } = useSelector(state => state.auth);
  const [formData, setFormData] = useReducer(formReducer, initialFormData);

  const loginHandler = async e => {
    e.preventDefault();
    console.log(formData);
    dispatch(login(formData));
  };

  return (
    <MDBContainer>
      <br />
      <MDBCard>
        <MDBCardBody className='align-center'>
          <form onSubmit={loginHandler}>
            <p className='h4 text-center py-4'>Sign In</p>
            <p className='h7 text-center'>
              {isLoading
                ? 'Authenticating'
                : 'Sign in and choose your role to continue'}
            </p>{' '}
            <div className='grey-text'>
              <MDBInput
                disabled={isLoading}
                label='Your email'
                icon='envelope'
                group
                value={formData.email}
                type='email'
                validate
                error='wrong'
                success='right'
                name='email'
                onChange={event => setFormData(event.target)}
              />
              <MDBInput
                disabled={isLoading}
                label='Your password'
                icon='lock'
                group
                required
                value={formData.password}
                type='password'
                validate
                name='password'
                onChange={event => setFormData(event.target)}
              />
              <div className='d-flex justify-content-center'>
                <div class='form-check m-0'>
                  <input
                    class='form-check-input'
                    type='checkbox'
                    name='remember'
                    value={formData.remember}
                    onChange={event => setFormData(event.target)}
                  />
                  <label class='form-check-label' for='flexCheckDefault'>
                    Remember Me
                  </label>
                </div>
              </div>
            </div>
            <p className='mt-2 font-small blue-text d-flex justify-content-center pb-3'>
              Forgot
              <a href='#!' className='blue-text ml-1'>
                Password?
              </a>
            </p>
            <div className='text-center py-4'>
              <MDBBtn
                disabled={isLoading}
                type='submit'
                color='elegant'
                size='sm'>
                Sign In
              </MDBBtn>
            </div>
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default FormPage;
