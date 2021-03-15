import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import store from './store/store';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/admin/AdminPage';
import Alert from './components/core/Alert';

function App() {
  return (
    <Provider store={store}>
      <div className='containerBI'>
        <Alert />
        <Switch>
          <Route path='/login' exact component={LoginPage} />
          <Route path='/' exact component={HomePage} />
          <Route path='/about' exact component={AboutPage} />
          <Route path='/contact' exact component={ContactPage} />
          <Route path='/admin' component={AdminPage} />
        </Switch>
      </div>
    </Provider>
  );
}

export default App;
