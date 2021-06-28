import React, { useEffect } from 'react';
import './App.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/admin/AdminPage';
import Alert from './components/core/Alert';
import { loadUser } from './store/actions/auth';
import MemberList from './pages/admin/MemberList';
import CircularProgress from '@material-ui/core/CircularProgress';
import NotFound from './pages/NotFound';



// private route accessbile for only authenticated users
function PrivateRoute ({component: Component, ...rest}) {
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])

  return <Route
    {...rest}
    render={props => {
      if(auth.isLoading){
        return <CircularProgress style={{ margin: '50vh 50vw' }} />
      } else if(!auth.isAuthenticated){
        return <Redirect to="/"/>
      } else {
        return <Component {...props}/>
      }
    }}
  />
}

// Public routes accessible to all users.
function PublicRoute ({ component: Component, restricted, ...rest }) {
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(() => dispatch(loadUser()), [dispatch])

  return <Route {...rest} render={props => {
    if (auth.isLoading) {
      return <CircularProgress style={{ margin: '50vh 50vw' }} />
    } else if (auth.isAuthenticated && restricted) {
      return <Redirect to="/" />
    } else {
      return <Component {...props} />
    }
  }} />
}


function App() {
  return (
      <div className='containerBI'>
        <Alert />
        <Switch>
          <PublicRoute path='/' exact component={HomePage} />
          <PublicRoute path='/about' exact component={AboutPage} />
          <PublicRoute path='/contact' exact component={ContactPage} />
          <PrivateRoute path='/admin' component={AdminPage} />
          <PrivateRoute path='/list-members' component={MemberList} />
          <PublicRoute restricted={false} component={NotFound} />
        </Switch>
      </div>
  );
}

export default App;
