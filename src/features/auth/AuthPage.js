import React from 'react';

import {
  AuthContainer,
  FormContainer,
  LogoContainer,
  AuthBackgroundImg,
  AuthBackground,
  AuthBackgroundTitle,
  AuthBackgroundText
} from './AuthStyles';
import Logo from '../layout/Logo';
import SignInForm from './SignInForm';
import { Redirect, Route, Switch, useLocation } from 'react-router';
import SignUpForm from './SignUpForm';
import { AnimatePresence, motion } from 'framer-motion';
import Routing from '../routing/RoutingPaths';
import { ReactComponent as Earth } from '../../assets/earth.svg';
import { ReactComponent as Van } from '../../assets/van.svg';

const transition = {
  duration: 0.2,
  ease: [0.43, 0.13, 0.23, 0.96]
};

const pageVariants = {
  initial: {
    opacity: 0
  },
  in: {
    opacity: 1,
    x: '0%',
    transition
  },
  out: {
    opacity: 0,
    x: '70%',
    transition
  }
};

const AuthPage = () => {
  const location = useLocation();
  return (
    <AuthContainer>
      <FormContainer>
        <LogoContainer>
          <Logo />
        </LogoContainer>
        <AnimatePresence exitBeforeEnter>
          <Switch key={location.pathname}>
            <Route path={Routing.SignIn.path}>
              <motion.div
                initial='initial'
                animate='in'
                exit='out'
                variants={pageVariants}
              >
                <SignInForm />
              </motion.div>
            </Route>
            <Route exact path={Routing.SignUp.path}>
              <motion.div
                initial='initial'
                animate='in'
                exit='out'
                variants={pageVariants}
              >
                <SignUpForm />
              </motion.div>
            </Route>
            <Route>
              <Redirect to={Routing.SignIn.path} />
            </Route>
          </Switch>
        </AnimatePresence>
      </FormContainer>

      <AuthBackground>
        <AuthBackgroundImg>
          <Earth />
          <Van />
        </AuthBackgroundImg>
        <AuthBackgroundTitle>Lorem, ipsum dolor sit</AuthBackgroundTitle>
        <AuthBackgroundText>
          Molestiae vero ducimus, deserunt id nobis hic repudiandae consequatur!
          Quaerat necessitatibus modi quam aliquid! Soluta in debitis architecto
          blanditiis maiores aliquam corporis ut, id explicabo magni veniam
          minima perferendis incidunt minus ipsum quidem, magnam pariatur
          commodi laudantium cumque nihil laborum alias at.
        </AuthBackgroundText>
      </AuthBackground>
    </AuthContainer>
  );
};

export default AuthPage;
