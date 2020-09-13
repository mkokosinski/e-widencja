import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router';

import Routing from '../routing/Routing';
import LoginForm from '../forms/auth/LoginForm';
import { Auth } from '../../app/dummyAPI';

import { AuthContainer, FormContainer } from './AuthStyles';



const AuthPage = () => {
  
  return (
    <AuthContainer>
      <FormContainer>
          <LoginForm />
      </FormContainer>
    </AuthContainer>
  );
};

export default AuthPage;
