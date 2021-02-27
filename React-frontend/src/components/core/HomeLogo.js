import React from 'react';
import Logo from '../../images/HomeLogo.png';
import { MDBContainer } from 'mdbreact';
import { Link } from 'react-router-dom';

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
                
                <a className= "btn block-example rounded-pill border border-dark" color = "elegant"  href="http://www.scorelab.org/">
                    Know More
                  </a>
                
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