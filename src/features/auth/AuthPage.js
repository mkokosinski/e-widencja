import React from 'react';

import LoginForm from '../forms/auth/LoginForm';

import {
  AuthContainer,
  FormContainer,
  LogoContainer,
  AnimatedBg,
  AnimatedSquare,
} from './AuthStyles';
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

      <AnimatedBg>
        <AnimatedSquare duration={'19s'}/>
        <AnimatedSquare top={'70%'} left={'10%'} duration={'23s'} />
        <AnimatedSquare top={'40%'} left={'70%'} duration={'14s'} />
        <AnimatedSquare top={'10%'} left={'80%'} duration={'18s'} />
        <AnimatedSquare top={'30%'} left={'50%'} duration={'15s'} />
        <AnimatedSquare top={'50%'} left={'40%'} duration={'19s'} />
      </AnimatedBg>
      
    </AuthContainer>
  );
};

export default AuthPage;
