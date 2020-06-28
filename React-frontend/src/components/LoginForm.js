import React from "react";
import { MDBContainer, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';

const FormPage = () => {
  return (
    <MDBContainer>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
      <MDBCard>
        <MDBCardBody>
          <form>
            <p className="h4 text-center py-4">Sign In</p>
            <p className="h7 text-center">Sign in and choose your role to continue</p>{' '}
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
              <MDBInput
                label="Your password"
                icon="lock"
                group
                type="password"
                validate
              />
            </div>
            <p className="font-small blue-text d-flex justify-content-end pb-3">
            Forgot
            <a href="#!" className="blue-text ml-1">

              Password?
            </a>
            </p>
            <div className="text-center py-4 mt-3">
            <MDBBtn color="elegant" size="sm">Sign In</MDBBtn>
            </div>
            
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default FormPage;