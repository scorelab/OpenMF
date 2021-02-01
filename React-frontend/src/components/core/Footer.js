import React from 'react';
import Cpr from '../../images/copyright.png';
import Glogo from '../../images/github.png';
import { Navbar, Nav} from 'react-bootstrap';

function Ftr() {
  return (
    <div>
      <Navbar fixed="bottom" expand="lg" bg="dark" variant="dark">
      <Nav className="mr-auto">
        <a class="navbar-brand" href="http://www.scorelab.org/">
          <img src = {Cpr} height="25" width="25" alt="Copyright"></img>
          {' '}
          SCoRe Lab
        </a>
      </Nav>
      <Nav>
        <a class="navbar-brand" href="https://github.com/scorelab/OpenMF/">
        Contact us:{' '}
        <img src = {Glogo} height="25" width="25" alt="Github Logo"></img>
        </a>      
      </Nav>
    </Navbar>
    </div>
  );
}

export default Ftr;
