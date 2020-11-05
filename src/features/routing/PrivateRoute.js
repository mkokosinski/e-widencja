import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router';
import { selectAuth } from '../auth/authSlice';
import Routing from './RoutingPaths';

const PrivateRoute = ({ children, ...rest }) => {
  const { user } = useSelector(selectAuth);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? children : <Redirect to={Routing.Login.path} />
      }
    />
  );
};

export default PrivateRoute;
