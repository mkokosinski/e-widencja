import React from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { selectVehicleById } from './vehiclesSlice';
import Routing from '../routing/Routing';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCopyright,
  faCarSide,
  faTachometerAlt,
  faColumns,
} from '@fortawesome/free-solid-svg-icons';

import LineChart from '../charts/Chart';
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
} from '../templates/detailsView/DetailsStyles';
import RecentList from '../templates/detailsView/RecentTours';
import {
  ButtonGoBack,
  ButtonEdit,
  ButtonDelete,
} from '../templates/detailsView/DetailsComponents';

import { ReactComponent as BrandIco } from '../../assets/branding.svg';
import { ReactComponent as CarIco } from '../../assets/car.svg';
import { ReactComponent as LicenseIco } from '../../assets/licensePlate.svg';
import { ReactComponent as TachometerIco } from '../../assets/tachometer.svg';

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

  const vehicle = useSelector((state) => selectVehicleById(state, id));

  return vehicle ? (
    <Details>
      <SectionDesc>
        <DetailsTopPanel>
          <ButtonGoBack />
          <DetailsTitle>{vehicle.name}</DetailsTitle>
          <ButtonEdit
            actionPath={`${Routing.VehicleEdit.action}/${vehicle.id}`}
          />
          <ButtonDelete item={vehicle} />
        </DetailsTopPanel>

        <DetailsInfo>
          <DetailsIco>
            <BrandIco />
          </DetailsIco>
          <DetailsData>{vehicle.mark}</DetailsData>
          <DetailsLabel>Marka</DetailsLabel>
        </DetailsInfo>

        <DetailsInfo>
          <DetailsIco>
            <CarIco />
          </DetailsIco>
          <DetailsData>{vehicle.model}</DetailsData>
          <DetailsLabel>Model</DetailsLabel>
        </DetailsInfo>

        <DetailsInfo>
          <DetailsIco>
            <TachometerIco />
          </DetailsIco>
          <DetailsData>{vehicle.mileage} km</DetailsData>
          <DetailsLabel>Przebieg</DetailsLabel>
        </DetailsInfo>

        <DetailsInfo>
          <DetailsIco>
            <LicenseIco />
          </DetailsIco>
          <DetailsData>{vehicle.registrationNumber}</DetailsData>
          <DetailsLabel>Numer rejestracyjny</DetailsLabel>
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
