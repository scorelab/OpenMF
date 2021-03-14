import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const extractorRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, isLoading, user } = useSelector(state => state.auth);

  return (
    <Route
      {...rest}
      render={props =>
        (!isLoading && !isAuthenticated) ||
        (!isLoading && isAuthenticated && user.role !== 'extractor') ? (
          <Redirect to='/' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default extractorRoute;
