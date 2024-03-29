import React from 'react';
import { Redirect } from 'react-router';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Routing from '../routing/Routing';
import FieldWithErrors from '../../components/Form/fieldWithErrors';
import { StyledField, Row, StyledError } from '../../components/Form/FormsStyles';

import { selectAuth, signIn } from './authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AuthForm, AuthButtonsWrapper, AuthFormFooter, AuthFormHeader, AuthLink, AuthFormBody } from './AuthStyles';
import { motion } from 'framer-motion';
import { authFormAnimations } from '../../utils/animationUtils';
import SubmitButton from '../../components/Form/SubmitButton';

const validationSchema = Yup.object({
  email: Yup.string()
    .min(3, 'Minimum 3 znaki')
    .max(30, 'Maksymalnie 30 znaków')
    .email('Niepoprawny format')
    .required('Pole wymagane'),
  password: Yup.string()
    .max(30, 'Maksymalnie 30 znaków')
    .matches(/^[A-Za-z\d@$!%*#?&]{1,}$/, 'Niedozwolone znaki w haśle')
    .required('Pole wymagane'),
});

const initValues = {
  email: '',
  password: '',
};

const SignInForm = ({ redirectPath = Routing.Dashboard.path }) => {
  const dispatch = useDispatch();

  const { user, error } = useSelector(selectAuth);

  const handleSubmit = async ({ email, password }) => {
    await dispatch(signIn({ email, password }));
  };

  if (user) {
    return <Redirect to={redirectPath} />;
  }

  return (
    <>
      <Formik initialValues={initValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {() => (
          <AuthForm>
            <AuthFormHeader>
              <motion.h2 {...authFormAnimations}>Logowanie</motion.h2>
              <motion.h4 {...authFormAnimations} transition={{ delay: 0.05 }}>
                Zaloguj się na e-mail. Pamiętaj, że musisz być zaproszony przez administratora swojej firmy
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
                    <StyledField type='password' autoComplete='current-password' />
                  </FieldWithErrors>
                </Row>

                <AuthButtonsWrapper>
                  <SubmitButton disabled={false}>Zaloguj</SubmitButton>
                </AuthButtonsWrapper>
                <Row>
                  <StyledError>{error}</StyledError>
                </Row>
              </AuthFormBody>
              <AuthFormFooter>
                <div>
                  {`Nie posiadasz konta? `}
                  <AuthLink to={Routing.SignUp.path}>Zarejestruj</AuthLink>
                </div>
                <AuthLink to={''}>Nie pamiętam hasła</AuthLink>
              </AuthFormFooter>
            </motion.div>
          </AuthForm>
        )}
      </Formik>
    </>
  );
};

export default SignInForm;
