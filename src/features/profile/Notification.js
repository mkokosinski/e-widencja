import React, { useState, useRef } from 'react';

import { NotificationButton } from './ProfileStyles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

import { useDropdown } from '../hooks/useDropdown';

const Notification = () => {
  const button = useRef(null);
  const [DropdownList, DropdownItem, setIsDropdownOpen] = useDropdown(button);

  return (
    <>
      <NotificationButton ref={button} onClick={() => setIsDropdownOpen(true)}>
        <FontAwesomeIcon icon={faBell} />
      </NotificationButton>
      
      <DropdownList>
        <DropdownItem>Powiadomienie</DropdownItem>
        <DropdownItem>Powiadomienie</DropdownItem>
        <DropdownItem>Powiadomienie</DropdownItem>
        <DropdownItem>Powiadomienie</DropdownItem>
        <DropdownItem>Powiadomienie</DropdownItem>
      </DropdownList>
    </>
  );
};

export default Notification;
