import React, { useRef } from 'react';

import { useDropdown } from '../hooks/useDropdown';
import { selectCurrentUser, signOut } from '../auth/authSlice';

import { ProfileButton, ItemTitle, ListItem } from './ProfilebarStyles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignOutAlt,
  faUserAlt,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import Routing from '../routing/Routing';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Profile = () => {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const button = useRef(null);

  const { List, isOpen } = useDropdown(button);

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <>
      <ProfileButton tabIndex={0} ref={button} active={isOpen}>
        <FontAwesomeIcon icon={faUserCircle} />
      </ProfileButton>

      <List>
        <ListItem>
          <Link to={`${Routing.UserDetails.action}/${user.id}`}>
            <ItemTitle>
              <FontAwesomeIcon icon={faUserAlt} /> Profil
            </ItemTitle>
          </Link>
        </ListItem>
        <ListItem onClick={handleSignOut}>
          <ItemTitle>
            <FontAwesomeIcon icon={faSignOutAlt} /> Wyloguj
          </ItemTitle>
        </ListItem>
      </List>
    </>
  );
};

export default Profile;
