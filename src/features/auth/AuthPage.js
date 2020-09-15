import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router';

import Routing from '../routing/Routing';
import LoginForm from '../forms/auth/LoginForm';
import { Auth } from '../../app/dummyAPI';

import { AuthContainer, FormContainer, LogoContainer } from './AuthStyles';
import Logo from '../layout/Logo';

const AuthPage = () => {
  return (
    <AuthContainer>
      <FormContainer>
        <LogoContainer>
          <Logo />
        </LogoContainer>
        <LoginForm />
      </FormContainer>
    </AuthContainer>
  );
};

export default AuthPage;
