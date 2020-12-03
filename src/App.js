import React, { useCallback, useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

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
import { FETCH_STATUS } from './utils/fetchUtils';
import Loading from './features/loading/Loading';
import { fetchSettings } from './features/settings/settingsSlice';
import { fetchVehicles } from './features/vehicles/vehiclesSlice';
import { fetchUsers } from './features/users/usersSlice';
import { fetchRecords } from './features/records/recordsSlice';
import { fetchTrips } from './features/trips/tripsSlice';
import { fetchTripTemplates } from './features/tripTemplates/tripTemplatesSlice';
import { fetchCarBrands } from './features/vehicles/carBrandsSlice';
import { fetchCarModels } from './features/vehicles/carModelsSlice';

const App = () => {
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const { status, error, user: appUser } = useSelector(selectAuth);

  const dispatch = useDispatch();

  const fetchAllData = useCallback(() => {
    Promise.all([
      dispatch(fetchSettings()),
      dispatch(fetchVehicles()),
      dispatch(fetchUsers()),
      dispatch(fetchRecords()),
      dispatch(fetchTrips()),
      dispatch(fetchTripTemplates()),
      dispatch(fetchCarBrands()),
      dispatch(fetchCarModels())
    ])
      .then((dataEntities) => {
        const hasErrors = dataEntities.some((data) => data.error);
        if (hasErrors) {
          const err = dataEntities
            .filter((de) => de.error)
            .map((de) => de.error.message);
          setErrors(err);
        }
        setIsDataLoading(false);
      })
      .catch((err) => setErrors(err));
  }, [dispatch]);

  useEffect(() => {
    if (appUser) {
      fetchAllData();
    }
  }, [fetchAllData, appUser]);

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        dispatch(authorize({ user }));
      } else {
        setIsUserLoading(false);
      }
    });
  }, [dispatch]);

  if (!isUserLoading && !appUser) {
    return <Routing.Login.Component />;
  }

  return (
    <>
      {isDataLoading || errors ? (
        <Loading errors={errors} />
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
