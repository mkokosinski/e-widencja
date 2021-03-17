import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../navbar/Navbar';
import Logo from './Logo';
import Profilebar from '../profile/Profilebar';
import {
  selectInitSize,
  selectIsMobile,
  selectIsMobileKeyboard,
  selectSiteSize,
  setCurrSiteSize,
  setInitSiteSize,
  setIsLaptop,
  setIsMobile,
  setIsMobileKeyboard,
} from './layoutSlice';
import { ThemeProvider } from 'styled-components';
import { useCallback } from 'react';
import { useEffect } from 'react';

const LayoutProvider = ({ children }) => {
  const isMobile = useSelector(selectIsMobile);
  const isMobileKeyboard = useSelector(selectIsMobileKeyboard);
  const initSiteSize = useSelector(selectInitSize);
  const currSiteSize = useSelector(selectSiteSize);
  const dispatch = useDispatch();

  const handleInitSize = useCallback(() => {
    const {
      documentElement: { clientHeight, clientWidth },
    } = document;
    dispatch(setInitSiteSize({ height: clientHeight, width: clientWidth }));
    dispatch(setCurrSiteSize({ width: clientWidth, height: clientHeight }));
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

    if (isMobile && !isMobileKeyboard && clientHeight < initSiteSize.height) {
      dispatch(setIsMobileKeyboard(true));
    }

    if (isMobileKeyboard && clientHeight >= initSiteSize.height) {
      dispatch(setIsMobileKeyboard(false));
    }

    dispatch(setCurrSiteSize({ width: clientWidth, height: clientHeight }));
  }, [dispatch, isMobile, isMobileKeyboard]);

  useEffect(() => {
    handleCurrSite();
    window.addEventListener('resize', handleCurrSite);

    return () => {
      window.removeEventListener('resize', handleCurrSite);
    };
  }, [handleCurrSite]);
  return (
    <ThemeProvider theme={{ currSiteSize, isMobileKeyboard }}>
      {children}
    </ThemeProvider>
  );
};

export default LayoutProvider;
