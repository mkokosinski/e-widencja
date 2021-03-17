import React from 'react';

import {
  AuthContainer,
  FormContainer,
  LogoContainer,
  AuthBackgroundImg,
  AuthBackground,
  AuthBackgroundTitle,
  AuthBackgroundText,
  AuthBackgroundSquares,
  AuthBackgroundMobile,
} from './AuthStyles';
import Logo from '../layout/Logo';
import SignInForm from './SignInForm';
import { Route, Switch, useLocation } from 'react-router';
import SignUpForm from './SignUpForm';
import { AnimatePresence, motion } from 'framer-motion';
import Routing from '../routing/Routing';
import { ReactComponent as Earth } from '../../assets/earth.svg';
import { ReactComponent as Van } from '../../assets/van.svg';
import { useSelector } from 'react-redux';
import { selectIsMobile } from '../layout/layoutSlice';
import { authFormAnimations, MotionRedirect } from '../../utils/animationUtils';
import { useContext } from 'react';
import { ThemeContext } from 'styled-components';

const AuthPage = () => {
  const location = useLocation();
  const isMobile = useSelector(selectIsMobile);
  const theme = useContext(ThemeContext);

  return (
    <AuthContainer>
      <FormContainer>
        <LogoContainer>
          <Logo color={theme.main} />
        </LogoContainer>
        <AnimatePresence exitBeforeEnter>
          <Switch location={location} key={location.key}>
            <Route path={Routing.SignIn.path}>
              <motion.div {...authFormAnimations} style={{ flex: '1 1' }}>
                <SignInForm />
              </motion.div>
            </Route>
            <Route exact path={Routing.SignUp.path}>
              <motion.div {...authFormAnimations} style={{ flex: '1 1' }}>
                <SignUpForm />
              </motion.div>
            </Route>
            <Route>
              <MotionRedirect to={Routing.SignIn.path} />
            </Route>
          </Switch>
        </AnimatePresence>
      </FormContainer>
      {isMobile ? (
        <AuthBackgroundMobile />
      ) : (
        <AuthBackground>
          <AuthBackgroundImg>
            <Earth />
            <Van />
            <AuthBackgroundSquares />
            <AuthBackgroundSquares />
          </AuthBackgroundImg>
          <AuthBackgroundTitle>Lorem, ipsum dolor sit</AuthBackgroundTitle>
          <AuthBackgroundText>
            Molestiae vero ducimus, deserunt id nobis hic repudiandae
            consequatur! Quaerat necessitatibus modi quam aliquid! Soluta in
            debitis architecto blanditiis maiores aliquam corporis ut, id
            explicabo magni veniam minima perferendis incidunt minus ipsum
            quidem, magnam pariatur commodi laudantium cumque nihil.
          </AuthBackgroundText>
        </AuthBackground>
      )}
    </AuthContainer>
  );
};

export default AuthPage;
