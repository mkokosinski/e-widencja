import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import {
  setIsMobile,
  selectIsMobile,
  setIsLaptop,
  selectIsLaptop,
  setSiteSize,
  selectSiteSize,
  setIsMobileKeyboard,
  selectIsMobileKeyboard,
} from './layoutSlice';

import {
  StyledLayout,
  Menu,
  Body,
  StyledLogo,
  ProfileBar,
} from './LayoutStyles';
import Navbar from '../navbar/Navbar';
import Routing from '../routing/Routing';
import Logo from './Logo';
import Profile from '../profile/Profile';

import { size } from './LayoutStyles';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';

import { fetchRecords } from '../records/recordsSlice';
import { fetchVehicles } from '../vehicles/vehiclesSlice';
import { fetchUsers } from '../users/usersSlice';
import PrivateRoute from '../routing/PrivateRoute';
import Notification from '../profile/Notification';

const Layout = () => {
  const [height, setheight] = useState(0);

  const dispatch = useDispatch();
  const isMobile = useSelector(selectIsMobile);
  const IsLaptop = useSelector(selectIsLaptop);
  const initialSiteSize = useSelector(selectSiteSize);
  const isMobileKeyboard = useSelector(selectIsMobileKeyboard);

  useEffect(() => {
    dispatch(fetchRecords());
    dispatch(fetchVehicles());
    dispatch(fetchUsers());
  });

  const initSize = useCallback(() => {
    const {
      documentElement: { clientHeight, clientWidth },
    } = document;
    dispatch(setSiteSize({ height: clientHeight, width: clientWidth }));
  }, [dispatch]);

  useEffect(() => {
    window.addEventListener('resize', resizeHandler);

    resizeHandler();
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  });

  useEffect(() => {
    initSize();
  }, [initSize]);

  const resizeHandler = (e) => {
    const {
      clientWidth: width,
      clientHeight: height,
    } = document.documentElement;

    setheight(height);

    if (width < size.mobileXL && !isMobile) {
      dispatch(setIsMobile(true));
    }

    if (width > size.mobileXL && isMobile) {
      dispatch(setIsMobile(false));
    }

    if (width > size.laptop && !IsLaptop) {
      dispatch(setIsLaptop(true));
    }

    if (width < size.laptop && IsLaptop) {
      dispatch(setIsLaptop(false));
    }

    if (
      height < initialSiteSize.height &&
      width === initialSiteSize.width &&
      !isMobileKeyboard
    ) {
      dispatch(setIsMobileKeyboard(true));
    } else if (height === initialSiteSize && isMobileKeyboard) {
      dispatch(setIsMobileKeyboard(false));
    }

    if (width !== initialSiteSize.width) {
      dispatch(setSiteSize({ height, width }));
    }
  };

  return (
    <ThemeProvider theme={{ isMobileKeyboard }}>
      <StyledLayout height={height}>
        <StyledLogo>
          <Logo />
        </StyledLogo>
        {!IsLaptop && (
          <ProfileBar>
            <Notification />
            <Profile />
          </ProfileBar>
        )}
        <Menu>
          <Navbar />
        </Menu>
        <Body>
          {IsLaptop && (
            <ProfileBar>
              <Notification />
              <Profile />
            </ProfileBar>
          )}
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
              <Routing.Records.Component />
            </PrivateRoute>

            <PrivateRoute path={Routing.Vehicles.path}>
              <Routing.Vehicles.Component />
            </PrivateRoute>

            <PrivateRoute path={Routing.Users.path}>
              <Routing.Users.Component />
            </PrivateRoute>

            <PrivateRoute path={Routing.Tours.path}>
              <Routing.Tours.Component />
            </PrivateRoute>

            <PrivateRoute path={Routing.Settings.path}>
              <Routing.Settings.Component />
            </PrivateRoute>

            <PrivateRoute path={Routing.Reports.path}>
              <Routing.Reports.Component />
            </PrivateRoute>

            <Route component={() => <div>Error 404</div>} />
          </Switch>
        </Body>
      </StyledLayout>
    </ThemeProvider>
  );
};

export default Layout;
