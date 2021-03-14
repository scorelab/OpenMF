import React , { Suspense } from 'react';
import { useSelector } from 'react-redux';

import { MDBRow, MDBCol } from 'mdbreact';
import { Redirect } from 'react-router-dom';
const Layout = React.lazy(() => import('../components/core/Layout'));
const Hl = React.lazy(() => import('../components/core/HomeLogo'));
const Lf = React.lazy(() => import('../components/LoginForm'));

const LoginPage = () => {
  const { isLoading, isAuthenticated } = useSelector(state => state.auth);

  if (!isLoading && isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
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
    </Suspense>
  );
};

export default LoginPage;
