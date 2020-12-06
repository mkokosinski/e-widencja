import React from 'react';

import ProfileSection from './ProfileSection';
import RecentList from '../templates/detailsView/RecentTrips';
import CheckupList from './CheckupList';
import {
  DashboardContainer,
  DashboardHeader,
  DashboardSection,
  DashboardTitle
} from './DashboardStyles';
import Glider from '../../app/components/Glider';

const sampletrips = [
  { from: 'Biuro', to: 'Posum', driver: 'MK', distance: '11km' },
  { from: 'Posum', to: 'Biuro', driver: 'MK', distance: '11km' },
  { from: 'Biuro', to: 'USI', driver: 'MK', distance: '11km' },
  { from: 'USI', to: 'Posum', driver: 'MK', distance: '11km' },
  { from: 'Biuro', to: 'Biuro', driver: 'MK', distance: '11km' },
  { from: 'Biuro', to: 'USA', driver: 'MK', distance: '11km' },
  { from: 'USA', to: 'Biuro', driver: 'MK', distance: '11km' },
  { from: 'Biuro', to: 'Hiszpania', driver: 'MK', distance: '11km' },
  { from: 'Hiszpania', to: 'Biuro', driver: 'MK', distance: '11km' }
];

const Dashboard = () => {
  return (
    <DashboardContainer>
      {/* <DetailsSection>
        <LineChart
          data={sampleData}
          dataOffset={6}
          title={'Przejechane kilometry'}
        />
      </DetailsSection> */}
      <DashboardHeader>
        <Glider itemWidth={250}>
          <ProfileSection />
          <ProfileSection />
          <ProfileSection />
          <ProfileSection />
          <ProfileSection />
        </Glider>
      </DashboardHeader>

      <DashboardSection>
        <DashboardTitle>Najbliższy przegląd</DashboardTitle>
        <CheckupList />
      </DashboardSection>

      <DashboardSection>Zgłoszone uwagi</DashboardSection>
    </DashboardContainer>
  );
};

export default Dashboard;
