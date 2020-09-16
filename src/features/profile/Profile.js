import React, { useState } from 'react';

import { ProfileButton } from './ProfileStyles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import Dropdown from '../dropdown/Dropdown';
import { DropdownItem } from '../dropdown/DropdownStyles';

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ProfileButton onClick={() => setIsOpen(!isOpen)}>
        <FontAwesomeIcon icon={faUserCircle} />
      </ProfileButton>
      <Dropdown isOpen={isOpen}>
        <DropdownItem>Item</DropdownItem>
        <DropdownItem>Item</DropdownItem>
        <DropdownItem>Item</DropdownItem>
        <DropdownItem>Item</DropdownItem>
        <DropdownItem>Item</DropdownItem>
      </Dropdown>
    </>
  );
};

export default Profile;
