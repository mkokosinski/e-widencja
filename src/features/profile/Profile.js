import React, { useRef } from 'react';

import { useDropdown } from '../hooks/useDropdown';
import { signOut } from '../DAL/api';

import {
  ProfileButton,
  ItemTitle,
  ListItem,
} from './ProfilebarStyles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignOutAlt,
  faUserAlt,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import Routing from '../routing/Routing';
import { useHistory } from 'react-router';

const Profile = () => {
  const history = useHistory();
  const button = useRef(null);

  const [DropdownList, setIsDropdownOpen, isDropdownOpen] = useDropdown(button);

  const handleSignOut = () => {
    signOut('Admin').then((res) => history.push(Routing.Login.path));
  };

  return (
    <>
      <ProfileButton
        ref={button}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        active={isDropdownOpen}
      >
        <FontAwesomeIcon icon={faUserCircle} />
      </ProfileButton>

      <DropdownList>
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
      </DropdownList>
    </>
  );
};

export default Profile;
