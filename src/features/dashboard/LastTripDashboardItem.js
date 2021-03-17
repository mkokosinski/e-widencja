import {
  faCalendar,
  faCalendarAlt,
  faCar,
  faCarAlt,
  faCommentDots,
  faEllipsisH,
  faRoad,
  faTachometerAlt,
  faUserAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectFbUser } from '../auth/authSlice';
import { A, Button } from '../layout/LayoutStyles';
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

const LastTripDashboardItem = ({ trip }) => {
  const user = useSelector(selectFbUser);
  const tripDistance = trip.stops.reduce((sum, cur) => sum + cur.distance, 0);
  return (
    <A to={`${Routing.TripEdit.action}/${trip.id}`}>
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
    </A>
  );
};

export default LastTripDashboardItem;
