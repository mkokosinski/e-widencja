import React, { useState, useEffect } from 'react';
import { useParams, useHistory, Redirect } from 'react-router';
import { useSelector } from 'react-redux';
import { selectVehicleById } from './vehiclesSlice';
import Routing from '../layout/Routing';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faPencilAlt,
  faTrashAlt,
  faCopyright,
  faCarSide,
  faTachometerAlt,
  faColumns,
} from '@fortawesome/free-solid-svg-icons';

import LineChart from '../charts/Chart';
import {
  DetailsTopPanel,
  DetailsGoBack,
  DetailsTitle,
  DetailsDelete,
  DetailsEdit,
  DetailsInfo,
  DetailsIco,
  DetailsLabel,
  DetailsData,
  Details,
  DetailsEditButton,
  SectionDesc,
  SectionChart,
  SectionRecent,
} from '../layout/LayoutStyles';
import RecentList from '../templates/detailsView/RecentTours';

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
      data: [142, 145, 154, 142, 121, 130, 132, 124, 100, 121, 130, 144],
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

const sampletours = [
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
  const { goBack } = useHistory();

  const vehicle = useSelector((state) => selectVehicleById(state, id));

  return vehicle ? (
    <Details>
      <SectionDesc>
        <DetailsTopPanel>
          <DetailsGoBack onClick={goBack}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </DetailsGoBack>

          <DetailsTitle>{vehicle.name}</DetailsTitle>

          <DetailsEdit>
            <DetailsEditButton
              to={`${Routing.VehicleEdit.action}/${vehicle.id}`}
            >
              <FontAwesomeIcon icon={faPencilAlt} />
            </DetailsEditButton>
          </DetailsEdit>

          <DetailsDelete
            onClick={() => {
              const isDel = window.confirm(`Na pewno chcesz usunąć ${vehicle.name}`);

              if (isDel) {
                alert("Pojazd zostanie usunięty jak będzie api")
              }
            }}
          >
            {/* <DetailsEditButton
              to={`${Routing.VehicleEdit.action}/${vehicle.id}`}
            >
          <FontAwesomeIcon icon={faTrashAlt} />
        </DetailsEditButton> */}
            <FontAwesomeIcon icon={faTrashAlt} />
          </DetailsDelete>
        </DetailsTopPanel>

        <DetailsInfo>
          <DetailsIco>
            <FontAwesomeIcon icon={faCopyright} />
          </DetailsIco>
          <DetailsLabel>Marka</DetailsLabel>
          <DetailsData>{vehicle.mark}</DetailsData>
        </DetailsInfo>

        <DetailsInfo>
          <DetailsIco>
            <FontAwesomeIcon icon={faCarSide} />
          </DetailsIco>
          <DetailsLabel>Model</DetailsLabel>
          <DetailsData>{vehicle.model}</DetailsData>
        </DetailsInfo>

        <DetailsInfo>
          <DetailsIco>
            <FontAwesomeIcon icon={faTachometerAlt} />
          </DetailsIco>
          <DetailsLabel>Przebieg</DetailsLabel>
          <DetailsData>{vehicle.mileage}</DetailsData>
        </DetailsInfo>

        <DetailsInfo>
          <DetailsIco>
            <FontAwesomeIcon icon={faColumns} />
          </DetailsIco>
          <DetailsLabel>Numer rejestracyjny</DetailsLabel>
          <DetailsData>{vehicle.registrationNumber}</DetailsData>
        </DetailsInfo>
      </SectionDesc>

      <SectionChart>
        <LineChart
          data={sampleData}
          dataOffset={6}
          title={'Przejechane kilometry'}
        />
      </SectionChart>

      <SectionRecent>
        <RecentList title='Ostatnie trasy' list={sampletours} />
      </SectionRecent>
    </Details>
  ) : null;
};

export default VehileDetails;
