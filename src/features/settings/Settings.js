import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchSettings } from './settingsSlice';

const Settings = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);
  return <div></div>;
};

export default Settings;
