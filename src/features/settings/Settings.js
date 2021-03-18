import React from 'react';
import { useSelector } from 'react-redux';
import DropdownPanel from '../../app/components/DropdownPanel/DropdownPanel';
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
import { StyledSettings } from './SettingsStyles';

const Settings = () => {
  const purposes = useSelector(selectPurposes);
  const notices = useSelector(selectNotices);

  return (
    <StyledSettings>
      <DropdownPanel title={purposes.name}>
        <FeatureItems
          items={purposes.items}
          addItem={addPurpose}
          editItem={editPurpose}
          deleteItem={deletePurpose}
        />
      </DropdownPanel>
      <DropdownPanel title={notices.name}>
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
