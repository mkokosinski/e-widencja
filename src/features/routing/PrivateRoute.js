import React from 'react';
import { Route, Redirect } from 'react-router';

const PrivateRoute = ({ component: Component, ...restProps }) => {
  const isAuth = localStorage.getItem('token');

  console.log(isAuth);

  return (
    <Route
      {...restProps}
      render={(props) =>
        isAuth ? <Component {...props} /> : <Redirect to='/e-widencja/login' />
      }
    />
  );
};

export default PrivateRoute;
