import React from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

import Routing from '../routing/Routing';

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

      {/* <DetailsSection>
        <RecentList title='Ostatnie trasy' list={sampletrips} />
      </DetailsSection> */}
    </Details>
  ) : null;
};

export default VehileDetails;
