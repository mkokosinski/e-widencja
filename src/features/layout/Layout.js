import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { darkTheme } from './Theme';

import { setIsMobile, selectIsMobile } from './layoutSlice';

import { StyledLayout, Menu, Body } from './LayoutStyles';
import Navbar from '../navbar/Navbar';
import Routing from './Routing';
import Logo from './Logo';
import Profile from '../profile/Profile'

import { size } from './LayoutStyles';
import { useDispatch, useSelector } from 'react-redux';

const Layout = () => {
  const dispatch = useDispatch();
  const isMobile = useSelector(selectIsMobile);

  const resizeHandler = (e) => {
    const {
      screen: { width },
    } = window;
    if (width < size.mobileXL && !isMobile) {
      console.log('mobile');
      dispatch(setIsMobile(true));
    }

    if (width > size.mobileXL && isMobile) {
      console.log('not mobile');
      dispatch(setIsMobile(false));
    }
  };

  useEffect(() => {
    window.addEventListener('resize', resizeHandler);
    resizeHandler();
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <StyledLayout>
        <Logo />
        <Menu>
          <Navbar />
        </Menu>
        <Body>
        <Profile />
          <Switch>
            <Route exact path='/'>
              <Redirect to={Routing.Dashboard.path} />
            </Route>
            <Route path={Routing.Dashboard.path}>
              <Routing.Dashboard.Component />
            </Route>

            <Route path={Routing.Records.path}>
              <Routing.Records.Component />
            </Route>

            <Route exact path={Routing.Vehicles.path}>
              <Routing.Vehicles.Component />
            </Route>
            <Route exact path={Routing.VehicleForm.path}>
              <Routing.VehicleForm.Component />
            </Route>
            <Route path={Routing.VehicleDetails.path}>
              <Routing.VehicleDetails.Component />
            </Route>

            <Route exact path={Routing.Drivers.path}>
              <Routing.Drivers.Component />
            </Route>
            <Route path={Routing.DriversDetails.path}>
              <Routing.DriversDetails.Component />
            </Route>

            <Route path={Routing.Tours.path}>
              <Routing.Tours.Component />
            </Route>

            <Route path={Routing.Settings.path}>
              <Routing.Settings.Component />
            </Route>

            <Route path={Routing.Reports.path}>
              <Routing.Reports.Component />
            </Route>
          </Switch>
        </Body>
      </StyledLayout>
    </ThemeProvider>
  );
};

export default Layout;
