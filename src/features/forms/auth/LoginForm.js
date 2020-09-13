import { Formik } from 'formik';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import * as Yup from 'yup';
import { Auth } from '../../../app/dummyAPI';
import {
  ButtonBorderedSeconderySoft,
  ButtonMain,
} from '../../layout/LayoutStyles';
import Routing from '../../routing/Routing';
import FieldWithErrors from '../fieldWithErrors';
import { ButtonsContainer, Input, Row, StyledForm } from '../FormsStyles';

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
  



  const handleSubmit = ({login, password}) => {
    Auth(login, password).then((res) => {
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
