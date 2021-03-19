import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { StyledNotificationButton } from './ProfilebarStyles';

const NotificationButton = ({ isActive, buttonRef }) => {
  const [isNewNotification, setIsNewNotification] = useState(true);
  const handleClick = () => {
    setIsNewNotification(false);
  };

  return (
    <StyledNotificationButton
      tabIndex={0}
      ref={buttonRef}
      onClick={handleClick}
      active={isActive}
      isNewNotification={isNewNotification}
    >
      <FontAwesomeIcon icon={faBell} />
    </StyledNotificationButton>
  );
};

NotificationButton.propTypes = {
  isActive: PropTypes.bool,
  buttonRef: PropTypes.node,
};

export default NotificationButton;
