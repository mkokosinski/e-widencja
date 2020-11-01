import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Routing from '../routing/RoutingPaths';
import FieldWithErrors from '../forms/fieldWithErrors';
import { ButtonMain } from '../layout/LayoutStyles';
import { ButtonsContainer, StyledField, Row, StyledForm } from '../forms/FormsStyles';

import { signIn } from '../DAL/api.js';
import { setUser } from './authSlice';
import { useDispatch } from 'react-redux';

const validationSchema = Yup.object({
  login: Yup.string()
    .min(3, 'Minimum 3 znaki')
    .max(30, 'Maksymalnie 30 znaków')
    .matches(/[a-zA-Z]/, 'Niedozwolone znaki w loginie')
    .required('Pole wymagane'),
  password: Yup.string()
    .min(6, 'Minimum 6 znaków')
    .max(30, 'Maksymalnie 30 znaków')
    .matches(/[a-zA-Z]/, 'Niedozwolone znaki w haśle')
    .required('Pole wymagane'),
});

const initValues = {
  login: '',
  password: '',
};

const LoginForm = () => {
  const [status, setStatus] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const loginSuccess = (res) => {
    setStatus('Udało się zalogować');
    localStorage.setItem('token', res.token);
    dispatch(setUser(res.user));
    setTimeout(() => {
      history.replace(Routing.Dashboard.path);
    }, 500);
  };

  const handleSubmit = ({ login, password }) => {
    signIn(login, password)
      .then((res) => {
        console.log(res);
        loginSuccess(res);
      })
      .catch((err) => {
        setStatus('Zły login lub hasło');
        console.log(err);
      });
  };

  return (
    <Formik
      initialValues={initValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, submitForm }) => (
        <StyledForm>
          <Row>
            <FieldWithErrors label='Login' name='login'>
              <StyledField type='text' />
            </FieldWithErrors>
          </Row>

          <Row>
            <FieldWithErrors label='Hasło' name='password'>
              <StyledField type='password' />
            </FieldWithErrors>
          </Row>

          <ButtonsContainer>
            <ButtonMain onClick={submitForm}>Zaloguj</ButtonMain>
          </ButtonsContainer>
          {status}
        </StyledForm>
      )}
    </Formik>
  );
};

export default LoginForm;
