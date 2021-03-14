import React, { useRef } from 'react';

import { useDropdown } from '../hooks/useDropdown';
import { selectFbUser, signOut } from '../auth/authSlice';

import { ProfileButton, ItemTitle, ListItem } from './ProfilebarStyles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignOutAlt,
  faUserAlt,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import Routing from '../routing/Routing';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Profile = () => {
  const user = useSelector(selectFbUser);
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
