import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import Sidebar from '../Sidebar';
import '../../App.css';

const Layout = ({ children, sidebarBool = true, background = true }) => {
  return (
    <div className='containerBI'>
      <Navbar />
      <MDBRow className={!background ? 'bg-white' : null}>
        <MDBCol md='2'>{sidebarBool && <Sidebar />}</MDBCol>
        <MDBCol md={sidebarBool ? '10' : '12'}>
          <MDBContainer>{children}</MDBContainer>
        </MDBCol>
      </MDBRow>
      <Footer />
    </div>
  );
};

export default Layout;
