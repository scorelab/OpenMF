import React from 'react';
import Hl from '../components/core/HomeLogo';
import Lf from '../components/LoginForm';
import { useSelector } from 'react-redux';

import { MDBRow, MDBCol } from 'mdbreact';
import Layout from '../components/core/Layout';
import { Redirect } from 'react-router-dom';

const LoginPage = () => {
  const { isLoading, isAuthenticated } = useSelector(state => state.auth);

  if (!isLoading && isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <Layout sidebarBool={false}>
      <MDBRow>
        <MDBCol md='5'>
          <Hl />
        </MDBCol>
        <MDBCol md='2'></MDBCol>
        <MDBCol md='5'>
          <Lf />
        </MDBCol>
      </MDBRow>

      <br />
      <br />
    </Layout>
  );
};

export default LoginPage;
