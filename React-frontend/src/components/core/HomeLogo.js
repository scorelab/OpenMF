import React from 'react';
import Logo from '../../images/HomeLogo.png';
import { MDBBtn, MDBContainer } from 'mdbreact';

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
                  <MDBBtn color="elegant">
                    <a 
                      style={{color: 'white'}}
                      href="https://github.com/scorelab/OpenMF//wiki" 
                      target="_blank" 
                      rel="noopener noreferrer">Know More</a>
                  </MDBBtn>
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
