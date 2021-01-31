import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import Sb from './components/Management/SideBarManagement';
import Nvb from './components/Navbar';
import Ftr from './components/Footer';
import Alert from './components/Alert';
// import Hl from './components/HomeLogo';
// import Lf from './components/LoginForm';

import store from './store/store';

// import { MDBContainer, MDBRow, MDBCol} from 'mdbreact';

function App() {
  return (
    <Provider store={store}>
      <div className='containerBI'>
        <Alert />
        <Nvb />
        <Sb />
        <Ftr />
      </div>
    </Provider>
  );
}

export default App;
