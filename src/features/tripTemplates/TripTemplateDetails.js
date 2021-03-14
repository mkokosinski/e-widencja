import React from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

import Routing from '../routing/RoutingPaths';

import LineChart from '../charts/Chart';
import RecentList from '../templates/detailsView/RecentTrips';
import {
  ButtonGoBack,
  ButtonEdit,
  DetailsDeleteButton,
} from '../templates/detailsView/DetailsComponents';
import {
  DetailsTopPanel,
  DetailsTitle,
  DetailsInfo,
  DetailsIco,
  DetailsLabel,
  DetailsData,
  Details,
  SectionDesc,
  SectionChart,
  SectionRecent,
  DetailsSection,
} from '../templates/detailsView/DetailsStyles';

import { ReactComponent as CompanyIco } from '../../assets/branding.svg';
import { ReactComponent as YearIco } from '../../assets/year.svg';
import { ReactComponent as MonthIco } from '../../assets/month.svg';
import { ReactComponent as CarIco } from '../../assets/car.svg';
import { selectTripById } from '../trips/tripsSlice';
import { selectVehicleById } from '../vehicles/redux/vehicleThunk';

const sampleData = {
  labels: [
    'Sty',
    'Lut',
    'Mar',
    'Kwi',
    'Maj',
    'Cze',
    'Lip',
    'Sie',
    'Wrz',
    'Paź',
    'Lis',
    'Gru',
  ],
  datasets: [
    {
      label: 'Przejechano',
      data: [242, 215, 224, 242, 232, 224, 200, 199, 202, 222, 230, 244],
      backgroundColor: ['transparent'],
      borderColor: 'rgba(88, 64, 187,0.8)',
      borderWidth: 2,
      pointBorderColor: '#ffffff',
      pointBackgroundColor: 'rgba(88, 64, 187,1)',
      pointRadius: 6,
      pointBorderWidth: 3,
    },
  ],
};

const sampletrips = [
  { from: 'Biuro', to: 'Posum', driver: 'MK', distance: '11km' },
  { from: 'Posum', to: 'Biuro', driver: 'MK', distance: '11km' },
  { from: 'Biuro', to: 'USI', driver: 'MK', distance: '11km' },
  { from: 'USI', to: 'Posum', driver: 'MK', distance: '11km' },
  { from: 'Biuro', to: 'Biuro', driver: 'MK', distance: '11km' },
  { from: 'Biuro', to: 'USA', driver: 'MK', distance: '11km' },
  { from: 'USA', to: 'Biuro', driver: 'MK', distance: '11km' },
  { from: 'Biuro', to: 'Hiszpania', driver: 'MK', distance: '11km' },
  { from: 'Hiszpania', to: 'Biuro', driver: 'MK', distance: '11km' },
];

const VehileDetails = () => {
  const { id } = useParams();

  const trip = useSelector(selectTripById(id));
  // const record = useSelector(state=>selectVehicleById(state, trip.record))

  return trip ? (
    <Details>
      <SectionDesc>
        <DetailsTopPanel>
          <ButtonGoBack />
          <DetailsTitle>{trip.date}</DetailsTitle>
          <ButtonEdit actionPath={`${Routing.TripEdit.action}/${trip.id}`} />
          <DetailsDeleteButton item={trip} />
        </DetailsTopPanel>

        {/* <DetailsInfo>
          <DetailsIco>
            <CompanyIco />
          </DetailsIco>
          <DetailsData>{trip.company}</DetailsData>
          <DetailsLabel>Firma</DetailsLabel>
        </DetailsInfo> */}
      </SectionDesc>

      <DetailsSection></DetailsSection>

      <DetailsSection>
        <RecentList title='Ostatnie trasy' list={sampletrips} />
      </DetailsSection>
    </Details>
  ) : null;
};

export default VehileDetails;
