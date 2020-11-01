import React, { useEffect } from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ThemeProvider } from 'styled-components';

import {
  selectIsLaptop,
  setSiteSize,
  selectIsMobileKeyboard
} from './layoutSlice';

import { fetchRecords } from '../records/recordsSlice';
import { fetchUsers } from '../users/usersSlice';
import { fetchVehicles } from '../vehicles/vehiclesSlice';

import Navbar from '../navbar/Navbar';

import Logo from './Logo';
import Profilebar from '../profile/Profilebar';

import { StyledLayout, Menu, Body, StyledLogo } from './LayoutStyles';
import Router from '../routing/Router';

const Layout = () => {
  const dispatch = useDispatch();
  const IsLaptop = useSelector(selectIsLaptop);
  const isMobileKeyboard = useSelector(selectIsMobileKeyboard);

  const initSize = useCallback(() => {
    const {
      documentElement: { clientHeight, clientWidth }
    } = document;
    dispatch(setSiteSize({ height: clientHeight, width: clientWidth }));

    dispatch(fetchRecords());
    dispatch(fetchVehicles());
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    initSize();
  }, [initSize]);

  return (
    <ThemeProvider theme={{ isMobileKeyboard }}>
      <StyledLayout>
        <StyledLogo>
          <Logo />
        </StyledLogo>
        {!IsLaptop && <Profilebar />}
        <Menu>
          <Navbar />
        </Menu>
        <Body>
          {IsLaptop && <Profilebar />}
          <Router />
        </Body>
      </StyledLayout>
    </ThemeProvider>
  );
};

export default Layout;
