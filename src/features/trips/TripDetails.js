import React from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

import Routing from '../routing/Routing';

import RecentList from '../templates/detailsView/RecentTrips';
import {
  ButtonGoBack,
  ButtonEdit,
  DetailsDeleteButton,
} from '../templates/detailsView/DetailsComponents';
import {
  DetailsTopPanel,
  DetailsTitle,
  Details,
  SectionDesc,
  DetailsSection,
} from '../templates/detailsView/DetailsStyles';

import { selectTripById } from '../trips/tripsSlice';

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

  const trip = useSelector((state) => selectTripById(state, id));
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
