import React, { useReducer, useState } from 'react';
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
  const [passwordShown, setPasswordShown] = useState(false)
  const [isValidEmail, setIsValidEmail] = useState(true)
  const [isValidPassword, setIsValidPassword] = useState(true)

  // password  toggle handler
  const togglePasswordVisibilty = () => {
    setPasswordShown(passwordShown ? false : true)
  } 

  const loginHandler = async e => {
    e.preventDefault();
    e.target.className += " was-validated"
    console.log(formData)
    if (formData.email !== "" && formData.password !== ""){
      dispatch(login(formData));
    }
  };

  const validateEmail = e => {
    if(e.target.checkValidity()){
      setFormData(e.target);
      setIsValidEmail(true);
    }else{
      setIsValidEmail(false)
    }
  };

  const validatePasword = e => {
    if(e.target.checkValidity()){
      setFormData(e.target);
      setIsValidPassword(true);
    }else{
      setIsValidPassword(false);
    }
  }
  return (
    <MDBContainer>
      <br />
      <MDBCard>
        <MDBCardBody className='align-center'>
          <form 
            className='needs-validation'  
            onSubmit={loginHandler}
            noValidate
          >
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
                type='email'
                error='wrong'
                required 
                success='right'
                name='email'
                pattern="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
                onChange={validateEmail}
              >
                {!isValidEmail && (<span className='invalid-input'>Please provide a valid email.</span>)}
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
                type={passwordShown ? 'text': 'password'}
                minLength={6}
                maxLength={64}
                pattern="^[^\s].[a-zA-Z0-9/_]+$"
                name='password'
                onChange={validatePasword}
                // onChange={event => setFormData(event.target)}
              >
                {!isValidPassword && (<span className='invalid-input'>Must be between 6-64 characters.</span>)}
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
                <div class='form-check m-0'>
                  <input
                    class='form-check-input'
                    type='checkbox'
                    name='remember'
                    value={formData.remember}
                    onChange={event => setFormData(event.target)}
                  />
                  <label class='form-check-label' htmlFor='flexCheckDefault'>
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
                disabled={isLoading || formData.email === "" || formData.password === "" || !isValidEmail || !isValidPassword}
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
