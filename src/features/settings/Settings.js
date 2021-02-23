import { Formik } from 'formik';
import React from 'react';
import { useSelector } from 'react-redux';
import { StyledForm, Row } from '../forms/FormsStyles';
import { DetailsSection } from '../templates/detailsView/DetailsStyles';
import Purposes from './Purposes';
import { selectNotices, selectPurposes, selectSettings } from './settingsSlice';
import {
  SettingItem,
  SettingsSection,
  SettingsTitle,
  StyledSettings,
} from './SettingsStyles';

const Settings = () => {
  const { name, items } = useSelector(selectPurposes);
  const notices = useSelector(selectNotices);

  return (
    <StyledSettings>
      <SettingsSection>
        <SettingsTitle>{name}</SettingsTitle>
        <Purposes items={items} />
      </SettingsSection>
    </StyledSettings>
  );
};

export default Settings;
