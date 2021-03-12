import React from 'react';
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
