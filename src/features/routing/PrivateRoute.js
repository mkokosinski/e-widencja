import React from 'react';
import { Route, Redirect } from 'react-router';
import Routing from './Routing';

const PrivateRoute = ({ children, ...rest }) => {
  const isAuth = localStorage.getItem('token');

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuth ? children : <Redirect to={Routing.Login.path} />
      }
    />
  );
};

export default PrivateRoute;
