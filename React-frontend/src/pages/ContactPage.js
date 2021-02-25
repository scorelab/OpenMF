import React from 'react';
import Layout from '../components/core/Layout';

import GithubLogo from '../images/github.png';
import GitterLogo from '../images/gitter.png';
import ScorelabsLogo from '../images/scorelabs.jpeg';

const ContactPage = () => {
  return (
    <Layout sidebarBool={true} background={false}>
      <div className='p-4 flex text-center'>
        <div align='center mb-5'>
          <p className='lead'>OpenMF is a project under</p>
          <a href='https://scorelab.org/' target='_'>
            <img src={ScorelabsLogo} alt='Scorelabs' width='400px' />
          </a>
        </div>
        <hr />
        <div className='mt-5' align='center'>
          <p className='lead'>
            Contribute to the project on{' '}
            <a
              href='https://github.com/scorelab/OpenMF'
              target='_'
              className='ml-5 btn btn-dark'>
              <img
                className='mr-3'
                src={GithubLogo}
                alt='Github'
                height='30px'
                width='30px'
              />
              <span className='lead'>Github</span>
            </a>
          </p>
        </div>
        <div className='mt-5' align='center'>
          <p className='lead'>
            Join the discussion group on{' '}
            <a
              href='https://gitter.im/scorelab/OpenMF'
              target='_'
              className='ml-5 btn btn-light'>
              <img
                className='mr-3'
                src={GitterLogo}
                alt='Github'
                height='30px'
                width='30px'
              />
              <span className='lead'>Gitter</span>
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
