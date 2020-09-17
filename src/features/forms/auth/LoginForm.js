import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Routing from '../../routing/Routing';
import FieldWithErrors from '../fieldWithErrors';
import {
  ButtonBorderedSeconderySoft,
  ButtonMain,
} from '../../layout/LayoutStyles';
import { ButtonsContainer, Input, Row, StyledForm } from '../FormsStyles';

import { signIn } from '../../DAL/api.js';

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

  const history = useHistory();

  const loginSuccess = () => {
    setStatus('Udało się zalogować');
    localStorage.setItem('token', 'someToken');
    setTimeout(() => {
      history.replace(Routing.Dashboard.path);
    }, 500);
  };

  const handleSubmit = ({ login, password }) => {
    signIn(login, password).then((res) => {
      console.log(res);
      res ? loginSuccess() : setStatus('Zły login lub hasło');
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
              <Input type='text' />
            </FieldWithErrors>
          </Row>

          <Row>
            <FieldWithErrors label='Hasło' name='password'>
              <Input type='password' />
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
