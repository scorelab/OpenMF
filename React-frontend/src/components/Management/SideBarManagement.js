import React, { Component } from 'react';
import { MDBBtnGroup, MDBBtn } from 'mdbreact';
import FE from '../../images/Dashboard/file_explorer.png';
import An from '../../images/Dashboard/analytics.png';
import Cpr from '../../images/copyright.png';
import Glogo from '../../images/github.png';

export default class Sidebar extends Component {
  renderSidebar = () => {
    return (
      <div className='sidebar bg-dark'>
        <div className='text-center'>
          <a
            className='navbar-brand text-white'
            href='http://www.scorelab.org/'>
            <img src={Cpr} height='25' width='25' alt='Copyright'></img> SCoRe
            Lab
          </a>
          <p className='lead text-light'>
            Management <br />
            Dashboard
          </p>
        </div>
        <div className='text-center py-2 mt-2'>
          <MDBBtnGroup vertical>
            <MDBBtn color='white' className='ml-0'>
              {
                <img
                  className='thumbnail-image'
                  src={FE}
                  alt='down'
                  height='50'
                  width='50'
                />
              }
              <br />
              <div class='text-center font-weight-bold'>
                <p>File Explorer</p>
              </div>
            </MDBBtn>
            <MDBBtn color='white'>
              {
                <img
                  className='thumbnail-image'
                  src={An}
                  alt='down'
                  height='50'
                  width='50'
                />
              }
              <br />
              <div class='text-center font-weight-bold'>
                <p>Analytics</p>
              </div>
            </MDBBtn>
            <div className='text-center navbar-brand ml-4 my-2'>
              <a
                className='text-white'
                href='https://github.com/scorelab/OpenMF/'>
                Contact Us: <br />
                <img src={Glogo} height='25' width='25' alt='Github Logo'></img>
              </a>
            </div>
          </MDBBtnGroup>
        </div>
      </div>
    );
  };
  render() {
    return <div className='sidebar-container'>{this.renderSidebar()}</div>;
  }
}
