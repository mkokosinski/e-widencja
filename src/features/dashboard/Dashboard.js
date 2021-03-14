import React from 'react';

import ProfileSection from './ProfileSection';
import RecentList from '../templates/detailsView/RecentTrips';
import CheckupList from '../forms/vehicle/CheckupList';
import Glider from '../../app/components/Glider';
import { EmptyState } from '../templates/detailsView/DetailsStyles';
import NoticesList from '../forms/vehicle/NoticesList';
import { useSelector } from 'react-redux';
import { selectVehicles } from '../vehicles/redux/vehiclesSlice';

import {
  DashboardContainer,
  DashboardHeader,
  DashboardSection,
  DashboardTitle,
} from './DashboardStyles';

const Dashboard = () => {
  const { items: vehicles } = useSelector(selectVehicles);
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
        <NoticesList vehicles={vehicles} />
      </DashboardSection>
    </DashboardContainer>
  );
};

export default Dashboard;
