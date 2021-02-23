import React from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, selectUserById } from './usersSlice';
import Routing from '../routing/RoutingPaths';

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
import RecentList from '../templates/detailsView/RecentTrips';
import {
  ButtonGoBack,
  ButtonEdit,
  ButtonDelete,
} from '../templates/detailsView/DetailsComponents';

import { ReactComponent as NameIco } from '../../assets/man.svg';
import { ReactComponent as SurnameIco } from '../../assets/idCard.svg';
import { ReactComponent as DriverIco } from '../../assets/driver.svg';
import { ReactComponent as EmailIco } from '../../assets/email.svg';
import { selectTripsForDriver } from '../trips/tripsSlice';
import { selectFbUser } from '../auth/authSlice';
import { USER_ROLES } from '../../utils/constants';

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

const UserDetalis = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => selectUserById(state, id));
  const appUser = useSelector(selectFbUser);
  const trips = useSelector((state) => selectTripsForDriver(state, id));

  const canEdit = appUser.role === USER_ROLES.ADMIN || appUser.id === user.id;

  return user ? (
    <Details>
      <SectionDesc>
        <DetailsTopPanel>
          <ButtonGoBack />
          <DetailsTitle>{user.label}</DetailsTitle>
          {canEdit && (
            <>
              <ButtonEdit
                actionPath={`${Routing.UserEdit.action}/${user.id}`}
              />
              <ButtonDelete
                item={user}
                redirectPath={Routing.Users.path}
                onClick={() => dispatch(deleteUser(user.id))}
              />
            </>
          )}
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

      {user.isDriver && (
        <>
          <SectionChart>
            <LineChart
              data={sampleData}
              dataOffset={6}
              title={'Przejechane kilometry'}
            />
          </SectionChart>

          <SectionRecent>
            <RecentList title='Ostatnie trasy' list={trips} />
          </SectionRecent>
        </>
      )}
    </Details>
  ) : null;
};

export default UserDetalis;
