import React, {  } from 'react';
import { Redirect, useHistory } from 'react-router';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Routing from '../routing/RoutingPaths';
import FieldWithErrors from '../forms/fieldWithErrors';
import { ButtonMain } from '../layout/LayoutStyles';
import {
  ButtonsContainer,
  StyledField,
  Row,
  StyledForm,
  StyledError
} from '../forms/FormsStyles';

import { selectAuth, signIn } from './authSlice';
import { useDispatch, useSelector } from 'react-redux';

const validationSchema = Yup.object({
  email: Yup.string()
    .min(3, 'Minimum 3 znaki')
    .max(30, 'Maksymalnie 30 znaków')
    .email('Niepoprawny format')
    .required('Pole wymagane'),
  password: Yup.string()
    .min(6, 'Minimum 6 znaków')
    .max(30, 'Maksymalnie 30 znaków')
    .matches(/[a-zA-Z]/, 'Niedozwolone znaki w haśle')
    .required('Pole wymagane')
});

const initValues = {
  email: '',
  password: ''
};

const LoginForm = ({ redirectPath = Routing.Dashboard.path }) => {
  const dispatch = useDispatch();

  const { user, error } = useSelector(selectAuth);


  const handleSubmit = ({ email, password }) => {
    dispatch(signIn({ email, password }));
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
        <StyledForm>
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

          <ButtonsContainer>
            <ButtonMain onClick={submitForm}>Zaloguj</ButtonMain>
          </ButtonsContainer>
          <Row>
            <StyledError>{error}</StyledError>
          </Row>
        </StyledForm>
      )}
    </Formik>
  );
};

export default LoginForm;
