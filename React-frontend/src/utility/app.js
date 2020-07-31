import React from 'react';
import './App.css';
import Nvb from './components/Navbar';
import Ftr from './components/Footer';
import Hl from './components/HomeLogo';
import Lf from './components/LoginForm';

import { MDBContainer, MDBRow, MDBCol} from 'mdbreact';

function App() {
  return (
    <div className="containerBI">
      <Nvb />
        <MDBContainer>
        <MDBRow>
        <MDBCol md="5">
        <Hl />
        </MDBCol>
        <MDBCol md="2"></MDBCol>
        <MDBCol md="5">
        <Lf />
        </MDBCol>
        </MDBRow>
        </MDBContainer>
      <Ftr />
      <br />
      <br />
      </div>
  );
}

export default App;

