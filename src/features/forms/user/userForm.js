import React from 'react';
import { Formik } from 'formik';
import { useHistory, useParams } from 'react-router';
import * as Yup from 'yup';

import FieldWithErrors from '../fieldWithErrors';
import Checkbox from '../checkbox';

import {
  StyledForm,
  Container,
  Input,
  ButtonsContainer,
  Row,
} from '../FormsStyles';
import {
  ButtonMain,
  ButtonBorderedSeconderySoft,
} from '../../layout/LayoutStyles';
import { useSelector } from 'react-redux';

const validationSchema = Yup.object({
  name: Yup.string()
    .max(30, 'Must be 30 characters or less')
    .required('Required'),
  surname: Yup.string()
    .max(30, 'Must be 30 characters or less')
    .required('Required'),
  label: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  isDriver: Yup.bool(),
  eMail: Yup.string()
    .email('Nipoprawny format email')
    .min(7, 'Must be 7 characters or more')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Must be 6 characters or more')
    .required('Required'),
});

const handleSubmit = (values) => {
  console.log(values);
};

const UserForm = ({user}) => {
  const { goBack } = useHistory();


  const initValues = user || {
    id: '',
    name: '',
    surname: '',
    label: '',
    isDriver: false,
    eMail: '',
    password: '',
  };

  return (
    <Container>
      <Formik
        initialValues={initValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, submitForm }) => (
          <StyledForm>
            <Row>
              <FieldWithErrors name='name' label='Imię'>
                <Input type='text' />
              </FieldWithErrors>
            </Row>

            <Row>
              <FieldWithErrors name='surname' label='Nazwisko'>
                <Input type='text' />
              </FieldWithErrors>
            </Row>

            <Row>
              <FieldWithErrors name='label' label='Skrót'>
                <Input type='text' />
              </FieldWithErrors>
            </Row>

            <Row>
              <Checkbox name='isDriver' label='Kierowca' />
            </Row>

            <Row>
              <FieldWithErrors name='eMail' label='E-mail'>
                <Input type='email' />
              </FieldWithErrors>
            </Row>

            <Row>
              <FieldWithErrors name='password' label='Hasło'>
                <Input type='password' />
              </FieldWithErrors>
            </Row>

            <ButtonsContainer>
              <ButtonMain onClick={submitForm}>Zapisz</ButtonMain>
              <ButtonBorderedSeconderySoft onClick={goBack}>
                Anuluj
              </ButtonBorderedSeconderySoft>
            </ButtonsContainer>
          </StyledForm>
        )}
      </Formik>
    </Container>
  );
};

export default UserForm;
