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
import { EmptyState } from '../templates/detailsView/DetailsStyles';

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

      <DashboardSection>
        <DashboardTitle>Zgłoszone uwagi</DashboardTitle>
        <EmptyState>Brak zgłoszonych uwag</EmptyState>
      </DashboardSection>
    </DashboardContainer>
  );
};

export default Dashboard;
