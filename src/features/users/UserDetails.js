import React from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { selectUserById } from './usersSlice';
import Routing from '../routing/Routing';

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

import { ReactComponent as NameIco } from '../../assets/man.svg';
import { ReactComponent as SurnameIco } from '../../assets/idCard.svg';
import { ReactComponent as DriverIco } from '../../assets/driver.svg';
import { ReactComponent as EmailIco } from '../../assets/email.svg';

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

const UserDetalis = () => {
  const { id } = useParams();

  const user = useSelector((state) => selectUserById(state, id));

  return user ? (
    <Details>
      <SectionDesc>
        <DetailsTopPanel>
          <ButtonGoBack />
          <DetailsTitle>{user.label}</DetailsTitle>
          <ButtonEdit actionPath={`${Routing.UserEdit.action}/${user.id}`} />
          <ButtonDelete item={user} />
        </DetailsTopPanel>

        <DetailsInfo>
          <DetailsIco>
            <NameIco />
          </DetailsIco>
          <DetailsData>{user.name}</DetailsData>
          <DetailsLabel>Imię</DetailsLabel>
        </DetailsInfo>

        <DetailsInfo>
          <DetailsIco>
            <SurnameIco />
          </DetailsIco>
          <DetailsData>{user.surname}</DetailsData>
          <DetailsLabel>Nazwisko</DetailsLabel>
        </DetailsInfo>

        <DetailsInfo>
          <DetailsIco>
            <DriverIco />
          </DetailsIco>
          <DetailsData>{user.isDriver ? 'Tak' : 'Nie'}</DetailsData>
          <DetailsLabel>Kierowca</DetailsLabel>
        </DetailsInfo>

        <DetailsInfo>
          <DetailsIco>
            <EmailIco />
          </DetailsIco>
          <DetailsData>{user.eMail}</DetailsData>
          <DetailsLabel>Adres e-mail</DetailsLabel>
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

export default UserDetalis;
