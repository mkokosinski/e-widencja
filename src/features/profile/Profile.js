import React, { useRef } from 'react';

import { ProfileButton } from './ProfileStyles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useDropdown } from '../hooks/useDropdown';

const Profile = () => {
  const button = useRef(null);
  const [DropdownList, DropdownItem, setIsDropdownOpen] = useDropdown(button);

  return (
    <>
      <ProfileButton ref={button} onClick={() => setIsDropdownOpen(true)}>
        <FontAwesomeIcon icon={faUserCircle} />
      </ProfileButton>

      <DropdownList>
        <DropdownItem>Item</DropdownItem>
        <DropdownItem>Item</DropdownItem>
        <DropdownItem>Item</DropdownItem>
        <DropdownItem>Item</DropdownItem>
        <DropdownItem>Item</DropdownItem>
      </DropdownList>
    </>
  );
};

export default Profile;
