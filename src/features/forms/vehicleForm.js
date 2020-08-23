import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import SelectCreatable from 'react-select/creatable';

import FieldWithErrors from './fieldWithErrors';
import DateInput from './DateInput';

import {
  StyledForm,
  Container,
  Input,
  StyledSelect,
  ButtonsContainer,
  Row,
} from './FormsStyles';
import {
  ButtonMain,
  ButtonBorderedSeconderySoft,
} from '../layout/LayoutStyles';
import { useHistory } from 'react-router';

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
  const { goBack } = useHistory();
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
            {/* <FormField>
              <Label htmlFor='name'>Nazwa</Label>
              <Input name='name' type='text' />
              <ErrorMessage name='name'>
                {(msg) => <StyledError>{msg}</StyledError>}
              </ErrorMessage>
            </FormField> */}

            <Row>
              <FieldWithErrors name='name' label='Nazwa'>
                <Input type='text' />
              </FieldWithErrors>
            </Row>
            <Row>
              <FieldWithErrors name='mark' label='Marka'>
                <StyledSelect>
                  <SelectCreatable
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
              </FieldWithErrors>
            </Row>
            <Row>
              <FieldWithErrors name='model' label='Model'>
                <Input type='text' />
              </FieldWithErrors>
            </Row>
            <Row>
              <FieldWithErrors
                name='registrationNumber'
                label='Numer rejestracyjny'
              >
                <Input type='text' />
              </FieldWithErrors>
            </Row>

            <Row>
              <FieldWithErrors name='mileage' label='Przebieg'>
                <Input type='number' />
              </FieldWithErrors>

              <FieldWithErrors name='checkupDate' label='Data przeglądu'>
                <DateInput
                  setFieldTouched={setFieldTouched}
                  setFieldValue={setFieldValue}
                />
              </FieldWithErrors>
            </Row>

            <Row>
              <FieldWithErrors name='type' label='Typ'>
                <StyledSelect>
                  <Select
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

export default VehicleForm;
