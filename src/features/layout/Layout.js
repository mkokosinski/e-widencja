import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { darkTheme } from './Theme';

import {
  setIsMobile,
  selectIsMobile,
  setIsLaptop,
  selectIsLaptop,
  setSiteHeight,
  selectSiteHeight,
  setIsMobileKeyboard,
  selectIsMobileKeyboard,
} from './layoutSlice';

import { StyledLayout, Menu, Body } from './LayoutStyles';
import Navbar from '../navbar/Navbar';
import Routing from './Routing';
import Logo from './Logo';
import Profile from '../profile/Profile';

import { size } from './LayoutStyles';
import { useDispatch, useSelector } from 'react-redux';

const Layout = () => {
  const [height, setheight] = useState(0);

  const dispatch = useDispatch();
  const isMobile = useSelector(selectIsMobile);
  const IsLaptop = useSelector(selectIsLaptop);
  const initialSiteHeight = useSelector(selectSiteHeight);
  const isMobileKeyboard = useSelector(selectIsMobileKeyboard);

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

    if (height < initialSiteHeight && !isMobileKeyboard) {
      dispatch(setIsMobileKeyboard(true));
    } else if (height === initialSiteHeight && isMobileKeyboard) {
      dispatch(setIsMobileKeyboard(false));
    }
  };

  useEffect(() => {
    window.addEventListener('resize', resizeHandler);

    resizeHandler();
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  });

  useEffect(() => {
    dispatch(setSiteHeight(document.documentElement.clientHeight));
  }, []);

  return (
    <ThemeProvider theme={{ ...darkTheme, isMobileKeyboard }}>
      <StyledLayout height={height}>
        <Logo />
        {!IsLaptop && <Profile />}
        <Menu>
          <Navbar />
        </Menu>
        <Body>
          {IsLaptop && <Profile />}
          <Switch>

            <Route exact path='/'>
              <Redirect to={Routing.Dashboard.path} />
            </Route>
            <Route exact path={Routing.Dashboard.path}>
              <Routing.Dashboard.Component />
            </Route>

            <Route exact path={Routing.Records.path}>
              <Routing.Records.Component />
            </Route>
            <Route exact path={Routing.RecordDetails.path}>
              <Routing.RecordDetails.Component />
            </Route>

            <Route exact path={Routing.Vehicles.path}>
              <Routing.Vehicles.Component />
            </Route>
            <Route exact path={Routing.VehicleForm.path}>
              <Routing.VehicleForm.Component />
            </Route>
            <Route exact path={Routing.VehicleDetails.path}>
              <Routing.VehicleDetails.Component />
            </Route>

            <Route exact path={Routing.Drivers.path}>
              <Routing.Drivers.Component />
            </Route>
            <Route exact path={Routing.DriverForm.path}>
              <Routing.DriverForm.Component />
            </Route>
            <Route exact path={Routing.DriversDetails.path}>
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
            <Route component={()=><div>Error 404</div>} />

          </Switch>
        </Body>
      </StyledLayout>
    </ThemeProvider>
  );
};

export default Layout;
