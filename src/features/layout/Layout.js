import React, { useEffect } from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ThemeProvider } from 'styled-components';

import {
  selectIsLaptop,
  setSiteSize,
  selectIsMobileKeyboard,
  setIsLaptop,
  setIsMobile,
  setIsMobileKeyboard,
  selectInitSize
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
  const InitSize = useSelector(selectInitSize);

  const handleInitSize = useCallback(() => {
    const {
      documentElement: { clientHeight, clientWidth }
    } = document;
    dispatch(setSiteSize({ height: clientHeight, width: clientWidth }));

    if (clientWidth < 768) {
      dispatch(setIsLaptop(false));
      dispatch(setIsMobile(true));
    }
  }, [dispatch]);


  return (
    <ThemeProvider theme={{ isMobileKeyboard }}>
      <StyledLayout>
        <StyledLogo>
          <Logo />
        </StyledLogo>
        <Menu>
          <Navbar />
        </Menu>
        <Body>
          <Profilebar />
          <Router />
        </Body>
      </StyledLayout>
    </ThemeProvider>
  );
};

export default Layout;
