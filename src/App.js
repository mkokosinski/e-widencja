import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import PrivateRoute from './features/routing/PrivateRoute';
import Routing from './features/routing/RoutingPaths';
import AppRouter from './features/routing/AppRouter';

import LayoutProvider from './features/layout/LayoutProvider';
import { auth } from './app/firebase/firebase';
import Loading from './features/loading/Loading';
import { selectAuth, authorize } from './features/auth/authSlice';
import { fetchCompany } from './features/company/companySlice';
import { fetchRecords } from './features/records/recordsSlice';
import { fetchSettings } from './features/settings/redux/settingsSlice';
import { fetchTrips } from './features/trips/tripsSlice';
import { fetchTripTemplates } from './features/tripTemplates/tripTemplatesSlice';
import { fetchUsers } from './features/users/usersSlice';
import { fetchVehicles } from './features/vehicles/redux/vehicleThunk';
import { fetchCarBrands } from './features/vehicles/carBrandsSlice';
import { fetchCarModels } from './features/vehicles/carModelsSlice';
import { subscribeAll, unsubscribeAll } from './app/firebase/firebaseListeners';
import Logo from './features/layout/Logo';
import Navbar from './features/navbar/Navbar';
import Profilebar from './features/profile/Profilebar';
import {
  StyledLayout,
  Menu,
  Body,
  StyledLogo,
} from './features/layout/LayoutStyles';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const { user: appUser } = useSelector(selectAuth);

  const dispatch = useDispatch();
  const shouldSignIn = !isUserLoading && !appUser;

  const fetchAllData = useCallback(() => {
    Promise.all([
      dispatch(fetchSettings()),
      dispatch(fetchVehicles()),
      dispatch(fetchUsers()),
      dispatch(fetchRecords()),
      dispatch(fetchTrips()),
      dispatch(fetchTripTemplates()),
      dispatch(fetchCarBrands()),
      dispatch(fetchCarModels()),
      dispatch(fetchCompany()),
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
        subscribeAll(dispatch);
      } else {
        setIsUserLoading(false);
        unsubscribeAll();
      }
    });
  }, [dispatch]);

  return (
    <LayoutProvider>
      <ToastContainer
        position='top-right'
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
      />
      {shouldSignIn ? (
        <Routing.Login.Component />
      ) : isDataLoading || errors ? (
        <Loading errors={errors} />
      ) : (
        <Switch>
          <Route path={Routing.Login.path}>
            <Routing.Login.Component />
          </Route>

          <PrivateRoute path='/'>
            <StyledLayout>
              <StyledLogo>
                <Logo />
              </StyledLogo>
              <Menu>
                <Navbar />
              </Menu>
              <Body>
                <Profilebar />
                <AppRouter />
              </Body>
            </StyledLayout>
          </PrivateRoute>
        </Switch>
      )}
    </LayoutProvider>
  );
};

export default App;
