import React from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, selectUserById } from './usersSlice';
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
  DetailsSection,
} from '../templates/detailsView/DetailsStyles';
import RecentList from '../templates/detailsView/RecentTrips';
import {
  ButtonGoBack,
  ButtonEdit,
  DetailsDeleteButton,
} from '../templates/detailsView/DetailsComponents';

import { ReactComponent as NameIco } from '../../assets/man.svg';
import { ReactComponent as SurnameIco } from '../../assets/idCard.svg';
import { ReactComponent as DriverIco } from '../../assets/driver.svg';
import { ReactComponent as EmailIco } from '../../assets/email.svg';
import { selectTripsForDriver } from '../trips/tripsSlice';
import { selectFbUser } from '../auth/authSlice';
import { USER_ROLES } from '../../utils/constants';
import { monthsShort } from '../../utils/dateUtils';
import { getTripsData } from '../../utils/chartUtils';

const UserDetalis = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => selectUserById(state, id));
  const appUser = useSelector(selectFbUser);
  const trips = useSelector((state) => selectTripsForDriver(state, id));

  const canEdit = appUser.role === USER_ROLES.ADMIN || appUser.id === user.id;

  const recordTrips = {
    labels: monthsShort,
    datasets: [
      {
        label: 'Przejechano',
        data: getTripsData(trips),
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

  return user ? (
    <Details>
      <SectionDesc>
        <DetailsTopPanel>
          <ButtonGoBack />
          <DetailsTitle>{user.label}</DetailsTitle>
          <ButtonEdit
            disabled={!canEdit}
            actionPath={`${Routing.UserEdit.action}/${user.id}`}
          />
          <DetailsDeleteButton
            disabled={!canEdit}
            item={user}
            redirectPath={Routing.Users.path}
            onClick={() => dispatch(deleteUser(user.id))}
          />
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
          <DetailsSection>
            <LineChart
              data={recordTrips}
              dataOffset={6}
              title={'Przejechane kilometry'}
            />
          </DetailsSection>

          <DetailsSection>
            <RecentList title='Ostatnie trasy' list={trips} />
          </DetailsSection>
        </>
      )}
    </Details>
  ) : null;
};

export default UserDetalis;
