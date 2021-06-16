import React from 'react';
import Layout from '../components/core/Layout';

import Logo from '../images/logo.png';
import Phone from '../images/phone.jpg';

const AboutPage = () => {
  return (
    <Layout sidebarBool={true} background={false}>
      <div className='p-4 flex'>
        <h1 className='display-4 text-center'>About OpenMF</h1>
        <hr />
        <div className='row mt-5 mb-5'>
          <div className='col-2'>
            <img src={Logo} alt='Logo' height='100px' />
          </div>
          <div className='col-10'>
            <p className='lead'>
              OpenMF is an open source forensic tool for Android smartphones
              that helps digital forensic investigators throughout the life
              cycle of digital forensic investigation.
            </p>
          </div>
        </div>
        <div className='row mb-5'>
          <div className='col-9'>
            <p className='lead'>
              Let's say we have a crime scene in which we have captured some
              suspects and we have their mobile phones. If we want to extract
              all the data from their phones and see which of them are actually
              involved in the crime scene then we require a software to perform
              this task and produce Meaningful evidence and Analysis report for
              every phone (Digital forensic case).
            </p>
          </div>
          <div className='col-3'>
            <img src={Phone} alt='Logo' height='200px' />
          </div>
        </div>
        <div className='mb-5'>
          <p className='lead'>The OpenMF project is a dedicated software to:</p>
          <ul class='list-group mb-5'>
            <li class='list-group-item list-group-item-dark'>
              <p class='lead'>Extract the relevant data</p>
            </li>
            <li class='list-group-item list-group-item-dark'>
              <p class='lead'>Manage all the cases separately</p>
            </li>
            <li class='list-group-item list-group-item-dark'>
              <p class='lead'>Produce Analysis report</p>
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
