import React, { useState } from 'react';
import { MDBContainer, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';

const FormPage = () => {

  const [passwordType, setPasswordType] = useState('Password')

  return (
    <MDBContainer>
      <br />
      <MDBCard>
        <MDBCardBody>
          <form>
            <p className="h4 text-center py-4">Sign In</p>
            <p className="h7 text-center">
              Sign in and choose your role to continue
            </p>{' '}
            <div className="grey-text">
              <MDBInput
                label="Your email"
                icon="envelope"
                group
                type="email"
                validate
                error="wrong"
                success="right"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <MDBInput
                  label="Your password"
                  icon="lock"
                  group
                  type={passwordType}
                  validate
                  style={{ width: '125%' }}
                />
                {
                  (passwordType == 'Password') ?
                    (<i class="fas fa-eye  fa-lg" style={{ marginBottom: '30px', cursor: 'pointer' }} onClick={() => { setPasswordType('Text') }}></i>)
                    :
                    (<i class="fas fa-eye-slash  fa-lg" style={{ marginBottom: '30px', cursor: 'pointer' }} onClick={() => { setPasswordType('Password') }}></i>)
                }
              </div>
            </div>
            <p className="font-small blue-text d-flex justify-content-end pb-3">
              Forgot
              <a href="#!" className="blue-text ml-1">
                Password?
              </a>
            </p>
            <div className="text-center py-4 mt-3">
              <MDBBtn color="elegant" size="sm">
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

