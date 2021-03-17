import React from 'react';

import LastTripDashboardItem from './LastTripDashboardItem';
import CheckupList from '../forms/vehicle/CheckupList';
import Glider from '../../app/components/Glider';
import NoticesList from '../forms/vehicle/NoticesList';
import { useSelector } from 'react-redux';
import { selectSortedVehicles } from '../vehicles/redux/vehiclesSlice';

import {
  DashboardContainer,
  DashboardHeader,
  DashboardSection,
  DashboardTitle,
} from './DashboardStyles';
import { selectTripsFullData } from '../trips/tripsSlice';

const Dashboard = () => {
  const { items: vehicles } = useSelector(selectSortedVehicles);
  const trips = useSelector(selectTripsFullData);
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
          {trips.slice(0, 5).map((trip) => (
            <React.Fragment key={trip.id}>
              <LastTripDashboardItem trip={trip} />
            </React.Fragment>
          ))}
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
