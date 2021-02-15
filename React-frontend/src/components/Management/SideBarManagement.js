import React, { Component } from 'react'
import { MDBCardTitle, MDBCard, MDBCol, MDBBtnGroup, MDBBtn} from 'mdbreact';
import FE from '../../images/Dashboard/file_explorer.png';
import An from '../../images/Dashboard/analytics.png';

export default class Sidebar extends Component {
    renderSidebar = () => {
      return <div className="sidebar">
      <MDBCol md="12">
      <MDBCard >
      <MDBCardTitle>
      <br />
      <div className="text-center font-weight-bold "><p>Management</p>
      </div>
      </MDBCardTitle>
      </MDBCard>
      </MDBCol>
      <br /><br /><br /><br /><br /><br />
      <div className="text-center py-4 mt-3">
      <MDBBtnGroup vertical>
        <MDBBtn color="mdb-color" className="ml-0">{
            <img className="thumbnail-image" 
                src={FE} 
                alt="down"
                height="80" width="80"
            />
          }
        <br />
        <div className="text-center font-weight-bolder"><p>File <br/> Explorer</p></div>
        </MDBBtn>
        <MDBBtn color="mdb-color">{
              <img className="thumbnail-image" 
                  src={An} 
                  alt="down"
                  height="80" width="80"
              />
            }
        <br />
        <div className="text-center font-weight-bolder"><p>Analytics</p></div>
        </MDBBtn>

      </MDBBtnGroup>
      </div>
      </div>
    }
    render() {
      return <div className="sidebar-container">
        {this.renderSidebar()}
      </div>
    }
  }