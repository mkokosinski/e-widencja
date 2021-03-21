import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../auth/authSlice';
import Notification from './Notification';
import Profile from './Profile';
import {
  StyledBar,
  Greeting,
  Username,
  ButtonsContainer,
} from './ProfilebarStyles';

const Profilebar = () => {
  const user = useSelector(selectCurrentUser);

  return (
    <StyledBar>
      <Greeting>
        Witaj,
        <Username>{user && ` ${user.name}!`}</Username>
      </Greeting>

      <ButtonsContainer>
        <Notification />
        <Profile />
      </ButtonsContainer>
    </StyledBar>
  );
};

export default Profilebar;
