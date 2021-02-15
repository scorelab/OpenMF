import React from 'react';
import Hl from '../components/core/HomeLogo';
import LoginForm from '../components/LoginForm';

import { MDBRow, MDBCol } from 'mdbreact';
import Layout from '../components/core/Layout';

function LoginPage() {
  return (
    <Layout sidebarBool={false}>
      <MDBRow>
        <MDBCol md="5">
          <Hl />
        </MDBCol>
        <MDBCol md="2"></MDBCol>
        <MDBCol md="5">
          <LoginForm />
        </MDBCol>
      </MDBRow>
      <br />
      <br />
    </Layout>
  );
}

export default LoginPage;
