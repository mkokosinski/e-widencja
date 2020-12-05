import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectFbUser } from '../auth/authSlice';
import { Button } from '../layout/LayoutStyles';
import {
  ProfileSectionButtons,
  RecentUsersSectionInfoWrapper,
  RecentUsersSectionPhoto,
  RecentUsersSectionPhotoWrapper,
  RecentUsersSectionStyled,
  ProfileSectionUserName,
  RecentUsersSectionInfo
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
      <RecentUsersSectionInfoWrapper>
        <RecentUsersSectionInfo>{user.fullname}</RecentUsersSectionInfo>
        <RecentUsersSectionInfo>KIA Ceed</RecentUsersSectionInfo>
        <RecentUsersSectionInfo>{`Biuro < ... > Posum`}</RecentUsersSectionInfo>
        <RecentUsersSectionInfo>10km</RecentUsersSectionInfo>
        <RecentUsersSectionInfo>20.11.2020</RecentUsersSectionInfo>
      </RecentUsersSectionInfoWrapper>
    </RecentUsersSectionStyled>
  );
};

export default ProfileSection;
