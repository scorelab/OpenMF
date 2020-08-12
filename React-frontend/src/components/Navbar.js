import React from 'react';
import '../App.css';
import Logo from '../images/logo.png';
import Ham from '../images/hamburger.png';
import { Navbar, Nav} from 'react-bootstrap';
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem} from "mdbreact";
import { MDBBtn} from "mdbreact";

function Nvb() {
  return (
    <div>
      <Navbar expand="lg" bg="dark" variant="dark">
      <Nav className="mr-auto">
        <a class="navbar-brand" href="/">
          <img src = {Logo} height="50" width="50" alt="logo"></img>
          {' '}
          OpenMF
        </a>
      </Nav>
      <Nav>
      <MDBBtn href="https://github.com/scorelab/OpenMF/" outline color="success" >Help</MDBBtn>{' '}   
      <MDBDropdown>
                <MDBDropdownToggle caret color="dark" >
                  {
                    <img className="thumbnail-image" 
                        src={Ham} 
                        alt="down"
                        height="25" width="28"
                    />
                  }
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
                  <MDBDropdownItem href="#!">Contact Admin</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Request Role</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Contribute</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Report bug</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
      </Nav>
    </Navbar>
    </div>
  );
}

export default Nvb;
