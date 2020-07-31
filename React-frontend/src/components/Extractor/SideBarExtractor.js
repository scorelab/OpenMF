import React, { Component } from 'react'
import { MDBCardTitle, MDBCard, MDBCol, MDBBtnGroup, MDBBtn} from 'mdbreact';
import LD from '../../images/Dashboard/live_devices.png';

export default class Sidebar extends Component {
    renderSidebar = () => {
      return <div className="sidebar">
      <MDBCol md="12">
      <MDBCard >
      <MDBCardTitle>
      <br />
      <div class="text-center font-weight-bold "><p>Extractor</p>
      </div>
      </MDBCardTitle>
      </MDBCard>
      </MDBCol>
      <br /><br /><br /><br /><br /><br />
      <div className="text-center py-4 mt-3">
      <MDBBtnGroup vertical>
        <MDBBtn color="mdb-color" className="ml-0">{
            <img className="thumbnail-image" 
                src={LD} 
                alt="down"
                height="90" width="90"
            />
          }
        <br /><br />
        <div class="text-center font-weight-bolder"><p>Live<br/>Connected<br/>Devices</p></div>
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