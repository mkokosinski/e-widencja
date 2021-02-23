import React, { useEffect } from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ThemeProvider } from 'styled-components';

import {
  selectIsLaptop,
  setInitSiteSize,
  selectIsMobileKeyboard,
  setIsLaptop,
  setIsMobile,
  setIsMobileKeyboard,
  selectInitSize,
} from './layoutSlice';

import { fetchRecords } from '../records/recordsSlice';
import { fetchUsers } from '../users/usersSlice';
import { fetchVehicles } from '../vehicles/redux/vehicleThunk';

import Navbar from '../navbar/Navbar';

import Logo from './Logo';
import Profilebar from '../profile/Profilebar';

import { StyledLayout, Menu, Body, StyledLogo } from './LayoutStyles';
import Router from '../routing/Router';

const Layout = () => {
  return (
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
  );
};

export default Layout;
