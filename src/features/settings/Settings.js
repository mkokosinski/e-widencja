import React from 'react';
import { useSelector } from 'react-redux';
import Routing from '../routing/RoutingPaths';
import { DetailsSection } from '../templates/detailsView/DetailsStyles';
import ListViewItem from '../templates/ListView/ListViewItem';
import { ItemsList } from '../templates/ListView/ListViewStyles';
import { selectSettings } from './settingsSlice';

const Settings = () => {
  const settings = useSelector(selectSettings);
  console.log(settings);

  return (
    <DetailsSection>
      <div>Settings:</div>
      {Object.values(settings).map((sett) => (
        <div>{sett.name}</div>
      ))}
    </DetailsSection>
  );
};

export default Settings;
