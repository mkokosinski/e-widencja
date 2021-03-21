import React from 'react';
import { useSelector } from 'react-redux';
import DropdownPanel from '../..//components/DropdownPanel/DropdownPanel';
import EditCompanyForm from '../forms/company/EditCompanyForm';
import FeatureItems from './FeatureItems';
import {
  settingsAddNotice,
  settingsEditNotice,
  settingsDeleteNotice,
} from './redux/settingNoticesSlice';
import {
  addPurpose,
  deletePurpose,
  editPurpose,
  selectNotices,
  selectPurposes,
} from './redux/settingsSlice';
import { SettingsSection, StyledSettings } from './SettingsStyles';

const Settings = () => {
  const purposes = useSelector(selectPurposes);
  const notices = useSelector(selectNotices);

  return (
    <StyledSettings>
      <DropdownPanel title={'Dane firmy'}>
        <SettingsSection>
          <EditCompanyForm />
        </SettingsSection>
      </DropdownPanel>
      <DropdownPanel title={purposes.name} startExpanded>
        <FeatureItems
          items={purposes.items}
          addItem={addPurpose}
          editItem={editPurpose}
          deleteItem={deletePurpose}
        />
      </DropdownPanel>
      <DropdownPanel title={notices.name} startExpanded>
        <FeatureItems
          items={notices.items}
          addItem={settingsAddNotice}
          editItem={settingsEditNotice}
          deleteItem={settingsDeleteNotice}
        />
      </DropdownPanel>
    </StyledSettings>
  );
};

export default Settings;
