import { Formik } from 'formik';
import React from 'react';
import { useSelector } from 'react-redux';
import DropdownPanel from '../../app/components/DropdownPanel/DropdownPanel';
import { StyledForm, Row } from '../forms/FormsStyles';
import { DetailsSection } from '../templates/detailsView/DetailsStyles';
import Purposes from './Purposes';
import {
  selectNotices,
  selectPurposes,
  selectSettings,
} from './redux/settingsSlice';
import {
  SettingItem,
  SettingsSection,
  SettingsTitle,
  StyledSettings,
} from './SettingsStyles';

const Settings = () => {
  const purposes = useSelector(selectPurposes);
  const notices = useSelector(selectNotices);

  return (
    <StyledSettings>
      <DropdownPanel title={purposes.name}>
        <Purposes items={purposes.items} />
      </DropdownPanel>
    </StyledSettings>
  );
};

export default Settings;
