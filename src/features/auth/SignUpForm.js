import React from 'react';
import { Redirect, useHistory } from 'react-router';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Routing from '../routing/RoutingPaths';
import FieldWithErrors from '../forms/fieldWithErrors';
import { ButtonMain } from '../layout/LayoutStyles';
import { StyledField, Row, StyledError } from '../forms/FormsStyles';

import { selectAuth, signIn, signUpEmail } from './authSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  AuthButtonsWrapper,
  AuthForm,
  AuthFormBody,
  AuthFormFooter,
  AuthFormHeader,
  AuthFormSubHeader,
  AuthLink,
  SignUpLink
} from './AuthStyles';
import { motion } from 'framer-motion';
import { authFormAnimations } from '../../utils/animationUtils';

const validationSchema = Yup.object({
  email: Yup.string()
    .min(3, 'Minimum 3 znaki')
    .max(30, 'Maksymalnie 30 znaków')
    .email('Niepoprawny format')
    .required('Pole wymagane'),
  password: Yup.string()
    .min(8, 'Minimum 8 znaków')
    .max(30, 'Maksymalnie 30 znaków')
    .matches(/\d/, 'Przynajmniej 1 liczba')
    .matches(/[a-z]/, 'Przynajmniej 1 litera')
    .matches(/[A-Z]/, 'Przynajmniej 1 wielka litera')
    .matches(/[@$!%*#?&]/, 'Przynajmniej 1 znak specjalny')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Niedozwolone znaki w haśle'
    )
    .required('Pole wymagane'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Hasła różną się od siebie')
    .required('Pole wymagane')
});

const initValues = {
  email: '',
  password: '',
  passwordConfirmation: ''
};

const SignUpForm = ({ redirectPath = Routing.Dashboard.path }) => {
  const dispatch = useDispatch();

  const { user, error } = useSelector(selectAuth);

  const handleSubmit = ({ email, password }) => {
    dispatch(signUpEmail({ email, password }));
  };

  if (user) {
    return <Redirect to={redirectPath} />;
  }

  return (
    <Formik
      initialValues={initValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ submitForm }) => (
        <AuthForm>
          <AuthFormHeader>
            <motion.h2 {...authFormAnimations}>Rejestracja </motion.h2>
            <motion.h4 {...authFormAnimations} transition={{ delay: 0.05 }}>
              Pamiętaj, że po rejestracji musisz być zaproszony przez
              administratora swojej firmy.
            </motion.h4>
          </AuthFormHeader>

          <motion.div {...authFormAnimations} transition={{ delay: 0.1 }}>
            <AuthFormBody>
              <Row>
                <FieldWithErrors label='E-mail' name='email'>
                  <StyledField type='text' autoComplete='e-mail' />
                </FieldWithErrors>
              </Row>

              <Row>
                <FieldWithErrors label='Hasło' name='password'>
                  <StyledField
                    type='password'
                    autoComplete='current-password'
                  />
                </FieldWithErrors>
              </Row>

              <Row>
                <FieldWithErrors
                  label='Potwierdź hasło'
                  name='passwordConfirmation'
                >
                  <StyledField
                    type='password'
                    autoComplete='current-passwordConfirmation'
                  />
                </FieldWithErrors>
              </Row>

              <AuthButtonsWrapper>
                <ButtonMain onClick={submitForm}>Zarejestruj</ButtonMain>
              </AuthButtonsWrapper>
              <Row>
                <StyledError>{error}</StyledError>
              </Row>
            </AuthFormBody>

            <AuthFormFooter>
              <div>
                {`Masz już konto? `}
                <AuthLink to={Routing.SignIn.path}>Zaloguj</AuthLink>
              </div>
            </AuthFormFooter>
          </motion.div>
        </AuthForm>
      )}
    </Formik>
  );
};

export default SignUpForm;
