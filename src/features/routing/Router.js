import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import styled from 'styled-components';
import PrivateRoute from './PrivateRoute';
import Routing from './RoutingPaths';

const ErrorMessage = styled.div`
  color: rgb(151, 1, 1);
  font-size: 1.5em;
  font-weight: bold;
  margin: auto;
  padding: 20px;
`;

const Error404 = () => {
  return (
    <ErrorMessage>Skręciłeś w złą ścieżkę i znalazłeś Error 404!</ErrorMessage>
  );
};

const Router = () => {
  return (
    <Switch>
      <Route exact path='/'>
        <Redirect to={Routing.Dashboard.path} />
      </Route>

      <Route exact path='/e-widencja'>
        <Redirect to={Routing.Dashboard.path} />
      </Route>

      <PrivateRoute exact path={Routing.Dashboard.path}>
        <Routing.Dashboard.Component />
      </PrivateRoute>

      <PrivateRoute path={Routing.Records.path}>
        <Switch>
          <Route exact path={Routing.RecordAdd.path}>
            <Routing.RecordAdd.Component />
          </Route>
          <Route exact path={Routing.RecordEdit.path}>
            <Routing.RecordEdit.Component />
          </Route>
          <Route exact path={Routing.RecordDetails.path}>
            <Routing.RecordDetails.Component />
          </Route>
          <Route exact path={Routing.Records.path}>
            <Routing.Records.Component />
          </Route>
          <Route>
            <Error404 />
          </Route>
        </Switch>
      </PrivateRoute>

      <PrivateRoute path={Routing.Vehicles.path}>
        <Switch>
          <Route exact path={Routing.VehicleAdd.path}>
            <Routing.VehicleAdd.Component />
          </Route>
          <Route exact path={Routing.VehicleEdit.path}>
            <Routing.VehicleEdit.Component />
          </Route>
          <Route exact path={Routing.VehicleDetails.path}>
            <Routing.VehicleDetails.Component />
          </Route>
          <Route exact path={Routing.Vehicles.path}>
            <Routing.Vehicles.Component />
          </Route>
          <Route>
            <Error404 />
          </Route>
        </Switch>
      </PrivateRoute>

      <PrivateRoute path={Routing.Users.path}>
        <Switch>
          <Route exact path={Routing.UserAdd.path}>
            <Routing.UserAdd.Component />
          </Route>
          <Route exact path={Routing.UserEdit.path}>
            <Routing.UserEdit.Component />
          </Route>
          <Route exact path={Routing.UserDetails.path}>
            <Routing.UserDetails.Component />
          </Route>
          <Route exact path={Routing.Users.path}>
            <Routing.Users.Component />
          </Route>
          <Route>
            <Error404 />
          </Route>
        </Switch>
      </PrivateRoute>

      <PrivateRoute path={Routing.Trips.path}>
        <Switch>
          <Route exact path={Routing.TripAdd.path}>
            <Routing.TripAdd.Component />
          </Route>
          <Route exact path={Routing.TripEdit.path}>
            <Routing.TripEdit.Component />
          </Route>
          <Route exact path={Routing.TripDetails.path}>
            <Routing.TripDetails.Component />
          </Route>
          <Route exact path={Routing.Trips.path}>
            <Routing.Trips.Component />
          </Route>
          <Route>
            <Error404 />
          </Route>
        </Switch>
      </PrivateRoute>

      <PrivateRoute path={Routing.TripTemplates.path}>
        <Switch>
          <Route exact path={Routing.TripTemplateAdd.path}>
            <Routing.TripTemplateAdd.Component />
          </Route>
          <Route exact path={Routing.TripTemplateEdit.path}>
            <Routing.TripTemplateEdit.Component />
          </Route>
          <Route exact path={Routing.TripTemplateDetails.path}>
            <Routing.TripTemplateDetails.Component />
          </Route>
          <Route exact path={Routing.TripTemplates.path}>
            <Routing.Trips.Component />
          </Route>
          <Route>
            <Error404 />
          </Route>
        </Switch>
      </PrivateRoute>

      <PrivateRoute path={Routing.Settings.path}>
        <Routing.Settings.Component />
      </PrivateRoute>

      <PrivateRoute path={Routing.Reports.path}>
        <Routing.Reports.Component />
      </PrivateRoute>

      <Route>
        <Error404 />
      </Route>
    </Switch>
  );
};

export default Router;
