// import React from 'react';
// import { useParams, useHistory } from 'react-router';
// import { useSelector } from 'react-redux';
// import { selectUserById } from './usersSlice';

// const UserDetails = () => {
//   const { id } = useParams();
//   const { goBack } = useHistory();

//   const user = useSelector((state) => selectUserById(state, id));

//   return user ? (
//     <div>
//       <button onClick={goBack}>go back</button>
//       <div>name: {user.name}</div>
//       <div>surname: {user.surname}</div>
//       <div>label: {user.label}</div>
//       <div>isDriver: {user.isDriver.toString()}</div>
//       <div>eMail: {user.eMail}</div>
//       <div>password: {user.password}</div>
//     </div>
//   ) : null;
// };

// export default UserDetails;

import React from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { selectUserById } from './usersSlice';
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
            <FontAwesomeIcon icon={faCopyright} />
          </DetailsIco>
          <DetailsLabel>Imię</DetailsLabel>
          <DetailsData>{user.name}</DetailsData>
        </DetailsInfo>

        <DetailsInfo>
          <DetailsIco>
            <FontAwesomeIcon icon={faCopyright} />
          </DetailsIco>
          <DetailsLabel>Nazwisko</DetailsLabel>
          <DetailsData>{user.surname}</DetailsData>
        </DetailsInfo>

        <DetailsInfo>
          <DetailsIco>
            <FontAwesomeIcon icon={faCopyright} />
          </DetailsIco>
          <DetailsLabel>Kierowca</DetailsLabel>
          <DetailsData>{user.isDriver ? 'Tak' : 'Nie'}</DetailsData>
        </DetailsInfo>

        <DetailsInfo>
          <DetailsIco>
            <FontAwesomeIcon icon={faCopyright} />
          </DetailsIco>
          <DetailsLabel>Adres e-mail</DetailsLabel>
          <DetailsData>{user.eMail}</DetailsData>
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
