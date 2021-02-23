import React from 'react';

import ProfileSection from './ProfileSection';
import RecentList from '../templates/detailsView/RecentTrips';
import CheckupList from './CheckupList';
import {
  DashboardContainer,
  DashboardHeader,
  DashboardSection,
  DashboardTitle,
} from './DashboardStyles';
import Glider from '../../app/components/Glider';

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
