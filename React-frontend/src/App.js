import React, { useEffect } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/admin/AdminPage';
import Alert from './components/core/Alert';
import { loadUser } from './store/actions/auth';

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])

  return (
      <div className='containerBI'>
        <Alert />
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/about' exact component={AboutPage} />
          <Route path='/contact' exact component={ContactPage} />
          <Route path='/admin' component={AdminPage} />
        </Switch>
      </div>
  );
}

export default App;
