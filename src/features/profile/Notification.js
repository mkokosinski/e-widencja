import React from 'react';

import { NotificationButton } from './ProfileStyles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell
} from '@fortawesome/free-solid-svg-icons';

const Notification = () => {
  return (
      <NotificationButton>
        <FontAwesomeIcon icon={faBell} />
      </NotificationButton>
  );
};

export default Notification;
