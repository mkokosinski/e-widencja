import React, { useCallback, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from './features/routing/PrivateRoute';
import Routing from './features/routing/RoutingPaths';

import Layout from './features/layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from './app/firebase/firebase';
import { selectAuth, authorize } from './features/auth/authSlice';
import Loading from './features/loading/Loading';
import { fetchSettings } from './features/settings/settingsSlice';
import { fetchVehicles } from './features/vehicles/redux/vehicleThunk';
import { fetchUsers } from './features/users/usersSlice';
import { fetchRecords } from './features/records/recordsSlice';
import { fetchTrips } from './features/trips/tripsSlice';
import { fetchTripTemplates } from './features/tripTemplates/tripTemplatesSlice';
import { fetchCarBrands } from './features/vehicles/carBrandsSlice';
import { fetchCarModels } from './features/vehicles/carModelsSlice';
import { subscribeAll, unsubscribeAll } from './app/firebase/firebaseListeners';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  setIsLaptop,
  setIsMobile,
  setInitSiteSize,
  selectSiteSize,
  selectIsMobile,
  setCurrSiteSize,
} from './features/layout/layoutSlice';
import { ThemeProvider } from 'styled-components';
import { fetchCompany } from './features/company/companySlice';

const App = () => {
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const { user: appUser } = useSelector(selectAuth);
  const isMobile = useSelector(selectIsMobile);
  const currSiteSize = useSelector(selectSiteSize);

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

  const handleInitSize = useCallback(() => {
    const {
      documentElement: { clientHeight, clientWidth },
    } = document;
    dispatch(setInitSiteSize({ height: clientHeight, width: clientWidth }));
    dispatch(setCurrSiteSize({ x: clientWidth, y: clientHeight }));
  }, [dispatch]);

  useEffect(() => {
    handleInitSize();
  }, [handleInitSize]);

  const handleCurrSite = useCallback(() => {
    const {
      documentElement: { clientHeight, clientWidth },
    } = document;

    if (!isMobile && clientWidth < 768) {
      dispatch(setIsLaptop(false));
      dispatch(setIsMobile(true));
    }

    if (isMobile && clientWidth >= 768) {
      dispatch(setIsLaptop(true));
      dispatch(setIsMobile(false));
    }
    dispatch(setCurrSiteSize({ x: clientWidth, y: clientHeight }));
  }, [dispatch, isMobile]);

  useEffect(() => {
    handleCurrSite();
    window.addEventListener('resize', handleCurrSite);

    return () => {
      window.removeEventListener('resize', handleCurrSite);
    };
  }, [handleCurrSite]);

  return (
    <ThemeProvider theme={{ currSiteSize }}>
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
            <Layout />
          </PrivateRoute>
        </Switch>
      )}
    </ThemeProvider>
  );
};

export default App;
