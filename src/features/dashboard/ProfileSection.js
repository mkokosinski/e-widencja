import {
  faCalendar,
  faCalendarAlt,
  faCar,
  faCarAlt,
  faCommentDots,
  faEllipsisH,
  faRoad,
  faTachometerAlt,
  faUserAlt
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectFbUser } from '../auth/authSlice';
import { Button } from '../layout/LayoutStyles';
import {
  RecentUsersSectionInfoWrapper,
  RecentUsersSectionPhoto,
  RecentUsersSectionPhotoWrapper,
  RecentUsersSectionStyled,
  RecentUsersSectionInfo,
  RecentUsersSectionName,
  RecentUsersSectionDesc,
  RecentUsersSectionMoreButton,
  RecentUsersSectionIco
} from './DashboardStyles';
import { ReactComponent as UserIco } from '../../assets/man.svg';

const ProfileSection = () => {
  const user = useSelector(selectFbUser);
  return (
    <RecentUsersSectionStyled>
      <RecentUsersSectionPhotoWrapper>
        <RecentUsersSectionPhoto>
          {/* <FontAwesomeIcon icon={faUserAlt} /> */}
          <UserIco />
        </RecentUsersSectionPhoto>
      </RecentUsersSectionPhotoWrapper>
      <RecentUsersSectionMoreButton>
        <FontAwesomeIcon icon={faEllipsisH} />
      </RecentUsersSectionMoreButton>
      <RecentUsersSectionInfoWrapper>
        <RecentUsersSectionName>{user.fullname}</RecentUsersSectionName>
        <RecentUsersSectionDesc>
          <FontAwesomeIcon icon={faCar} />
          KIA Ceed
        </RecentUsersSectionDesc>
        <RecentUsersSectionInfo>
          <FontAwesomeIcon icon={faRoad} />

          {`Biuro < ... > Posum`}
        </RecentUsersSectionInfo>
        <RecentUsersSectionInfo>
          <FontAwesomeIcon icon={faTachometerAlt} />
          10km
        </RecentUsersSectionInfo>
        <RecentUsersSectionIco>
          <FontAwesomeIcon
            icon={faCalendarAlt}
            style={{ marginRight: '5px' }}
          />
          20.11.2020
        </RecentUsersSectionIco>
      </RecentUsersSectionInfoWrapper>
    </RecentUsersSectionStyled>
  );
};

export default ProfileSection;
