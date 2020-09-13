import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from './features/routing/PrivateRoute';
import Routing from './features/routing/Routing';

import Layout from './features/layout/Layout';
import { StyledApp } from './AppStyles';

const App = () => {
  return (
    <StyledApp>
      <Switch>
        <Route path={Routing.Login.path}>
          <Routing.Login.Component />
        </Route>

        <PrivateRoute path='/'>
          <Layout />
        </PrivateRoute>
      </Switch>
    </StyledApp>
  );
};

export default App;
