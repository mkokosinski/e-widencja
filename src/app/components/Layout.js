import React, { useContext } from 'react';

import { ThemeProvider } from 'styled-components';

import { darkTheme, StyledLayout } from './Theme';
import Navbar from './navbar/Navbar';

const Layout = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <StyledLayout>
        <Navbar />
        Elo
      </StyledLayout>
    </ThemeProvider>
  );
};

export default Layout;
