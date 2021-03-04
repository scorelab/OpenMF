import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Logo from '../../images/logo.png';
import Ham from '../../images/hamburger.png';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import {
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from 'mdbreact';
import { MDBBtn } from 'mdbreact';

import { logout } from '../../store/actions/auth';

const Nvb = () => {
  const dispatch = useDispatch();
  const { isLoading, isAuthenticated } = useSelector(state => state.auth);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div>
      <Navbar expand='lg' bg='dark' variant='dark'>
        <Nav className='mr-auto'>
          <Link class='navbar-brand' to='/'>
            <img src={Logo} height='50' width='50' alt='logo'></img>
            OpenMF
          </Link>
        </Nav>
        <Nav>
          <a href='https://github.com/scorelab/OpenMF/'>
            <MDBBtn outline color='success'>
              Help
            </MDBBtn>
          </a>
          {!isLoading && isAuthenticated ? (
            <MDBBtn onClick={logoutHandler} outline color='primary'>
              Logout
            </MDBBtn>
          ) : (
            <Link to='/login'>
              <MDBBtn outline color='primary'>
                Login
              </MDBBtn>
            </Link>
          )}
          <MDBDropdown>
            <MDBDropdownToggle caret color='dark'>
              {
                <img
                  className='thumbnail-image'
                  src={Ham}
                  alt='down'
                  height='25'
                  width='28'
                />
              }
            </MDBDropdownToggle>
            <MDBDropdownMenu className='dropdown-default'>
              <MDBDropdownItem href='#!'>Contact Admin</MDBDropdownItem>
              <MDBDropdownItem href='#!'>Request Role</MDBDropdownItem>
              <MDBDropdownItem href='#!'>Contribute</MDBDropdownItem>
              <MDBDropdownItem href='#!'>Report bug</MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>
        </Nav>
      </Navbar>
    </div>
  );
};

export default Nvb;
