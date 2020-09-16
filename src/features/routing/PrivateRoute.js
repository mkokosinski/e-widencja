import React from 'react';
import { Route, Redirect } from 'react-router';
import Routing from './Routing';
import { isAuth } from '../DAL/api';

const PrivateRoute = ({ children, ...rest }) => {

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuth() ? children : <Redirect to={Routing.Login.path} />
      }
    />
  );
};

export default PrivateRoute;
