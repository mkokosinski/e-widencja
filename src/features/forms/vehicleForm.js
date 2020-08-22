import React from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import SelectCreatable from 'react-select/creatable';

import {
  StyledForm,
  Container,
  Input,
  StyledSelect,
  Option,
  ButtonsContainer,
} from './FormsStyles';
import {
  ButtonMain,
  ButtonBorderedSeconderySoft,
} from '../layout/LayoutStyles';

const validationSchema = Yup.object({
  name: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  mark: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Required'),
  model: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  registrationNumber: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Required'),
  mileage: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  checkupDate: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Required'),
  type: Yup.string()
    .min(5, 'Min 5')
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
});

const handleSubmit = (values) => {
  console.log(values);
};

const VehicleForm = () => {
  return (
    <Container>
      <Formik
        initialValues={{
          name: '',
          mark: '',
          model: '',
          registrationNumber: '',
          mileage: '',
          checkupDate: '',
          type: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, submitForm, setFieldTouched, setFieldValue }) => (
          <StyledForm>
            <label htmlFor='name'>Nazwa</label>
            <Input name='name' type='text' />
            <ErrorMessage name='name' />

            <label htmlFor='mark'>Marka</label>
            <StyledSelect>
              <SelectCreatable
                name='mark'
                as='select'
                isSearchable={true}
                options={[
                  { label: 'test', value: 'test' },
                  { label: 'test2', value: 'test2' },
                ]}
                onChange={({ value }) => {
                  setFieldTouched('mark');
                  setFieldValue('mark', value);
                }}
              />
            </StyledSelect>
            <ErrorMessage name='mark' />

            <label htmlFor='model'>Model</label>
            <Input name='model' type='text' />
            <ErrorMessage name='model' />

            <label htmlFor='registrationNumber'>Numer rejestracyjny</label>
            <Input name='registrationNumber' type='text' />
            <ErrorMessage name='registrationNumber' />

            <label htmlFor='mileage'>Przebieg</label>
            <Input name='mileage' type='text' />
            <ErrorMessage name='mileage' />

            <label htmlFor='checkupDate'>Data przeglądu</label>
            <Input name='checkupDate' type='text' />
            <ErrorMessage name='checkupDate' />
            <label htmlFor='type'>Typ</label>
            <StyledSelect>
              <Select
                name='type'
                as='select'
                styles={StyledSelect}
                isSearchable={true}
                options={[
                  { label: 'test', value: 'test' },
                  { label: 'test2', value: 'test2' },
                ]}
                onChange={({ value }) => {
                  setFieldTouched('type');
                  setFieldValue('type', value);
                }}
              />
            </StyledSelect>

            <ErrorMessage name='type' />
            <ButtonsContainer>
              <ButtonMain onClick={submitForm}>Zapisz</ButtonMain>
              <ButtonBorderedSeconderySoft onClick={() => console.log(values)}>
                Anuluj
              </ButtonBorderedSeconderySoft>
            </ButtonsContainer>
          </StyledForm>
        )}
      </Formik>
    </Container>
  );
};

export default VehicleForm;
