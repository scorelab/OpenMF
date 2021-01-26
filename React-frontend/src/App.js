import React from 'react';
import './App.css';
import Sb from './components/Management/SideBarManagement';
import Nvb from './components/Navbar';
//import Ftr from './components/Footer';
// import Hl from './components/HomeLogo';
// import Lf from './components/LoginForm';

// import { MDBContainer, MDBRow, MDBCol} from 'mdbreact';

function App() {
  return (
    <div className='containerBI'>
      <Nvb />
      <Sb />
      {/* <Ftr /> */}
    </div>
  );
}

export default App;
