import { Formik } from 'formik';
import React from 'react';
import { useSelector } from 'react-redux';
import { StyledForm, Row } from '../forms/FormsStyles';
import Purposes from './Purposes';
import { selectPurposes, selectSettings } from './settingsSlice';
import { SettingItem, SettingsTitle, StyledSettings } from './SettingsStyles';

const Settings = () => {
  const { name, items } = useSelector(selectPurposes);

  return (
    <StyledSettings>
      <SettingsTitle>{name}</SettingsTitle>
      <Purposes items={items} />
    </StyledSettings>
  );
};

export default Settings;
