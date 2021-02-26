import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/core/Layout';

const PageNotFound = () => {
  return (
    <Layout sidebarBool={false} background={false}>
      <div className='col p-4' align='center'>
        <h1 className='display-4 mt-5'>Page Not Found</h1>
        <p className='lead'>The page you're looking for does not exist</p>
        <Link className='btn btn-lg btn-success' to='/'>
          Go to Home
        </Link>
      </div>
    </Layout>
  );
};

export default PageNotFound;
