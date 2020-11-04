import React, { useRef } from 'react';

import { useDropdown } from '../hooks/useDropdown';
import { signOut } from '../auth/authSlice';

import { ProfileButton, ItemTitle, ListItem } from './ProfilebarStyles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignOutAlt,
  faUserAlt,
  faUserCircle
} from '@fortawesome/free-solid-svg-icons';
import Routing from '../routing/RoutingPaths';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';

const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const button = useRef(null);

  const { List, isOpen } = useDropdown(button);

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <>
      <ProfileButton ref={button} active={isOpen}>
        <FontAwesomeIcon icon={faUserCircle} />
      </ProfileButton>

      <List>
        <ListItem>
          <ItemTitle>
            <FontAwesomeIcon icon={faUserAlt} /> Profil
          </ItemTitle>
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
