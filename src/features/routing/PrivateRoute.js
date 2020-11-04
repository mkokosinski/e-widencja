import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router';
import { selectAuth, isAuth } from '../auth/authSlice';
import Routing from './RoutingPaths';

const PrivateRoute = ({ children, ...rest }) => {
  const { user } = useSelector(selectAuth);

  console.log(user);

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
