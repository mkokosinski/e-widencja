import React from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

import Routing from '../routing/RoutingPaths';

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

import { ReactComponent as CompanyIco } from '../../assets/branding.svg';
import { ReactComponent as YearIco } from '../../assets/year.svg';
import { ReactComponent as MonthIco } from '../../assets/month.svg';
import { ReactComponent as CarIco } from '../../assets/car.svg';
import { selectRecordById } from '../records/recordsSlice';

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
            <CompanyIco />
          </DetailsIco>
          <DetailsData>{record.company}</DetailsData>
          <DetailsLabel>Firma</DetailsLabel>
        </DetailsInfo>

        <DetailsInfo>
          <DetailsIco>
            <YearIco />
          </DetailsIco>
          <DetailsData>{record.year}</DetailsData>
          <DetailsLabel>Rok</DetailsLabel>
        </DetailsInfo>

        <DetailsInfo>
          <DetailsIco>
            <MonthIco />
          </DetailsIco>
          <DetailsData>{record.month}</DetailsData>
          <DetailsLabel>Miesiąc</DetailsLabel>
        </DetailsInfo>

        <DetailsInfo>
          <DetailsIco>
            <CarIco />
          </DetailsIco>
          <DetailsData>{record.vehicle.name}</DetailsData>
          <DetailsLabel>Pojazd</DetailsLabel>
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
