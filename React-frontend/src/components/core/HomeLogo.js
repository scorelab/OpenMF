import React from 'react';
import Logo from '../../images/HomeLogo.png';
import { MDBContainer } from 'mdbreact';

function Hl() {
    return (
      <MDBContainer>
          <div id="wrapper">
            <div className="h-50 d-inline-block">
            <form>     
            <br />
            <br />
                <img src = {Logo} alt="logo"></img>{' '}
                <br />
                <br />
                <br />
                <p className="h5 text-center mb-4">Open Source forensic tool for Android smartphones</p>
                <div className="text-center">
                <button color="elegant" href="https://github.com/scorelab/OpenMF//wiki">Know More</button>
                </div>
            </form>
            </div>
                </div>
             <br />
            <br />
      </MDBContainer>
  );
}

export default Hl;