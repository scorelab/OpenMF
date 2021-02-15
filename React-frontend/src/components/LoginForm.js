import React, {useState} from 'react';
import { MDBContainer, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../store/actions/auth';
import { Redirect } from 'react-router-dom'
const FormPage = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  })
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const submitHandler = async e => {
    e.preventDefault();
    await dispatch(loginUser(values))
  }
  if(user.user){
    return <Redirect to='/' />
  }
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
                value={values.email}
                onChange={(e) => setValues({...values, email: e.target.value})}
                type="email"
                validate
                error="wrong"
                success="right"
              />
              <MDBInput
                label="Your password"
                icon="lock"
                group
                value={values.password}
                onChange={(e) => setValues({...values, password: e.target.value})}
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
              <MDBBtn onClick={submitHandler} color="elegant" size="sm">
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

