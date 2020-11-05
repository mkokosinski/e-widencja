import React from 'react';
import { useSelector } from 'react-redux';
import Routing from '../routing/RoutingPaths';
import ListViewItem from '../templates/ListView/ListViewItem';
import { ItemsList } from '../templates/ListView/ListViewStyles';
import { selectSettings } from './settingsSlice';

const Settings = () => {
  const { items: settings } = useSelector(selectSettings);
  return (
    <ItemsList>
      {settings.map((setting) => {
        return (
          <ListViewItem
            key={setting.id}
            item={{ ...setting }}
            path={Routing.Settings.path}
          />
        );
      })}
    </ItemsList>
  );
};

export default Settings;
