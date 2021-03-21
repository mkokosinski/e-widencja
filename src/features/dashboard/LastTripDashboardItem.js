import {
  faCalendarAlt,
  faCar,
  faEllipsisH,
  faRoad,
  faTachometerAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../auth/authSlice';
import { A } from '../layout/LayoutStyles';
import {
  RecentUsersSectionInfoWrapper,
  RecentUsersSectionPhoto,
  RecentUsersSectionPhotoWrapper,
  RecentUsersSectionStyled,
  RecentUsersSectionInfo,
  RecentUsersSectionName,
  RecentUsersSectionDesc,
  RecentUsersSectionMoreButton,
  RecentUsersSectionIco,
} from './DashboardStyles';
import { ReactComponent as UserIco } from '../../assets/man.svg';
import Routing from '../routing/Routing';
import AppLink from '../templates/AppLink';

const LastTripDashboardItem = ({ trip }) => {
  const user = useSelector(selectCurrentUser);
  const tripDistance = trip.stops.reduce((sum, cur) => sum + cur.distance, 0);
  return (
    <AppLink to={`${Routing.TripEdit.action}/${trip.id}`}>
      <RecentUsersSectionStyled>
        <RecentUsersSectionPhotoWrapper>
          <RecentUsersSectionPhoto>
            <UserIco />
          </RecentUsersSectionPhoto>
        </RecentUsersSectionPhotoWrapper>
        <RecentUsersSectionMoreButton>
          <FontAwesomeIcon icon={faEllipsisH} />
        </RecentUsersSectionMoreButton>
        <RecentUsersSectionInfoWrapper>
          <RecentUsersSectionName>{user.name}</RecentUsersSectionName>
          <RecentUsersSectionDesc>
            <FontAwesomeIcon icon={faCar} />
            {`${trip.vehicle.brand} ${trip.vehicle.model}`}
          </RecentUsersSectionDesc>
          <RecentUsersSectionInfo>
            <FontAwesomeIcon icon={faRoad} />

            {`${trip.start} < - > ${trip.end}`}
          </RecentUsersSectionInfo>
          <RecentUsersSectionInfo>
            <FontAwesomeIcon icon={faTachometerAlt} />
            {`${tripDistance} km`}
          </RecentUsersSectionInfo>
          <RecentUsersSectionIco>
            <FontAwesomeIcon
              icon={faCalendarAlt}
              style={{ marginRight: '5px' }}
            />
            ${trip.date}
          </RecentUsersSectionIco>
        </RecentUsersSectionInfoWrapper>
      </RecentUsersSectionStyled>
    </AppLink>
  );
};

export default LastTripDashboardItem;
