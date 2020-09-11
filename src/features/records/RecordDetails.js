// import React from 'react';
// import { useParams, useHistory } from 'react-router';
// import { useSelector } from 'react-redux';
// import { selectRecordById } from './recordsSlice';
// import { selectVehicleById } from '../vehicles/vehiclesSlice';

// const RecordDetails = () => {
//   const { id } = useParams();
//   const { goBack } = useHistory();

//   const record = useSelector((state) => selectRecordById(state, id));

//   // const vehicle = useSelector((state) => selectVehicleById(state, record.vehicleId));

//   return (record) ? (
//     <div>
//       <button onClick={goBack}>go back</button>
//       <div>Year: {record.year}</div>
//       <div>Month: {record.month}</div>
//       <div>Vehicle: {record.vehicle.name}</div>

//     </div>
//   ) : null;
// };

// export default RecordDetails;

import React from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { selectRecordById } from './recordsSlice';

import { selectVehicleById } from '../vehicles/vehiclesSlice';
import Routing from '../routing/Routing';

import LineChart from '../charts/Chart';
import RecentList from '../templates/detailsView/RecentTours';
import {
  ButtonGoBack,
  ButtonEdit,
  ButtonDelete,
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
} from '../templates/detailsView/DetailsStyles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCopyright,
  faCarSide,
  faTachometerAlt,
  faColumns,
} from '@fortawesome/free-solid-svg-icons';

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
      data: [242, 215, 224, 242,  232, 224, 200, 199, 202, 222, 230, 244],
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

  const record = useSelector((state) => selectRecordById(state, id));

  console.log(record);

  return record ? (
    <Details>
      <SectionDesc>
        <DetailsTopPanel>
          <ButtonGoBack />
          <DetailsTitle>{record.name}</DetailsTitle>
          <ButtonEdit
            actionPath={`${Routing.RecordEdit.action}/${record.id}`}
          />
          <ButtonDelete item={record} />
        </DetailsTopPanel>

        <DetailsInfo>
          <DetailsIco>
            <FontAwesomeIcon icon={faColumns} />
          </DetailsIco>
          <DetailsLabel>Firma</DetailsLabel>
          <DetailsData>{record.company}</DetailsData>
        </DetailsInfo>

        <DetailsInfo>
          <DetailsIco>
            <FontAwesomeIcon icon={faColumns} />
          </DetailsIco>
          <DetailsLabel>Rok</DetailsLabel>
          <DetailsData>{record.year}</DetailsData>
        </DetailsInfo>

        <DetailsInfo>
          <DetailsIco>
            <FontAwesomeIcon icon={faColumns} />
          </DetailsIco>
          <DetailsLabel>Miesiąc</DetailsLabel>
          <DetailsData>{record.month}</DetailsData>
        </DetailsInfo>

        <DetailsInfo>
          <DetailsIco>
            <FontAwesomeIcon icon={faColumns} />
          </DetailsIco>
          <DetailsLabel>Pojazd</DetailsLabel>
          <DetailsData>{record.vehicle.name}</DetailsData>
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
