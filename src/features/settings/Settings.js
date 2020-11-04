import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Routing from '../routing/RoutingPaths';
import ListViewItem from '../templates/ListView/ListViewItem';
import { ItemsList } from '../templates/ListView/ListViewStyles';
import { fetchSettings, selectSettings } from './settingsSlice';

const Settings = () => {
  const dispatch = useDispatch();
  const {items: settings} = useSelector(selectSettings);

  console.log('settings', settings);

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);
  return <ItemsList>
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
  ;
};

export default Settings;
