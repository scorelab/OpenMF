import React, { Component } from 'react'
import { MDBCardTitle, MDBCard, MDBCol, MDBBtnGroup, MDBBtn} from 'mdbreact';
import UM from '../../images/Dashboard/user_management.png';
import DM from '../../images/Dashboard/data_management.png';
import AR from '../../images/Dashboard/assign_role.png';

export default class Sidebar extends Component {
    renderSidebar = () => {
      return <div className="sidebar">
      <MDBCol md="12">
      <MDBCard >
      <MDBCardTitle>
      <br />
      <div class="text-center font-weight-bold "><p>Admin</p>
      </div>
      </MDBCardTitle>
      </MDBCard>
      </MDBCol>
      <br /><br /><br />
      <div className="text-center py-4 mt-3">
      <MDBBtnGroup vertical>
        <MDBBtn color="mdb-color" className="ml-0">{
            <img className="thumbnail-image" 
                src={UM} 
                alt="down"
                height="70" width="70"
            />
          }
        <br />
        <div class="text-center font-weight-bolder"><p>User <br/> Management</p></div>
        </MDBBtn>
        <MDBBtn color="mdb-color">{
              <img className="thumbnail-image" 
                  src={DM} 
                  alt="down"
                  height="70" width="70"
              />
            }
        <br />
        <div class="text-center font-weight-bolder"><p>Data <br/> Management</p></div>
        </MDBBtn>
        <MDBBtn color="mdb-color">{
              <img className="thumbnail-image" 
                  src={AR} 
                  alt="down"
                  height="70" width="70"
              />
            }
        <br />
        <div class="text-center font-weight-bolder"><p>Assign Role</p></div>
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