import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Alert from './components/core/Alert';

import store from './store/store';
import PageNotFound from './pages/PageNotFound';

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
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </Provider>
  );
}

export default App;
