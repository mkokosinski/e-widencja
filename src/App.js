import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from './features/routing/PrivateRoute';
import Routing from './features/routing/RoutingPaths';

import Layout from './features/layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from './app/firebase/firebase';
import {
  setUser,
  getFirebaseUser,
  selectAuth,
  authorize
} from './features/auth/authSlice';
import { STATUS } from './utils/fetchUtils';

const App = () => {
  const [isUserLoading, setIsUserLoading] = useState(true);
  const { status, error } = useSelector(selectAuth);
  const dispach = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        dispach(authorize({ user }));
      } else {
        setIsUserLoading(false);
      }
    });
  }, [dispach]);

  return (
    <>
      {isUserLoading && status !== STATUS.SUCCESS ? (
        <div>Loading...</div>
      ) : (
        <Switch>
          <Route path={Routing.Login.path}>
            <Routing.Login.Component />
          </Route>

          <PrivateRoute path='/'>
            <Layout />
          </PrivateRoute>
        </Switch>
      )}
    </>
  );
};

export default App;
