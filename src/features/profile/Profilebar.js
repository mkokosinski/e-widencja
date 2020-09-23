import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuth, selectUser } from '../auth/authSlice';
import Notification from './Notification';
import Profile from './Profile';
import {
  StyledBar,
  Greeting,
  Username,
  ButtonsContainer,
} from './ProfilebarStyles';

const Profilebar = () => {
  const user = useSelector(selectUser);
  const status = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAuth());
    }
  }, [status, dispatch]);

  return (
    <StyledBar>
      <Greeting>
        Witaj,
        <Username>{user && ` ${user.login}!`}</Username>
      </Greeting>

      <ButtonsContainer>
        <Notification />
        <Profile />
      </ButtonsContainer>
    </StyledBar>
  );
};

export default Profilebar;
