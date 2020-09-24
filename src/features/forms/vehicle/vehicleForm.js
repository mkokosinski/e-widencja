import React, { useRef } from 'react';
import { Formik } from 'formik';
import { useHistory } from 'react-router';
import * as Yup from 'yup';

import Select from 'react-select';
import SelectCreatable from 'react-select/creatable';

import FieldWithErrors from '../fieldWithErrors';
import DateInput from '../DateInput';

import {
  StyledForm,
  Container,
  Input,
  StyledSelect,
  ButtonsContainer,
  Row,
} from '../FormsStyles'; 
import {
  ButtonMain,
  ButtonBorderedSeconderySoft,
} from '../../layout/LayoutStyles';

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

const VehicleForm = ({ vehicle }) => {
  const { goBack } = useHistory();
  const modelRef = useRef(null);
  const typeRef = useRef(null);

  const focusOn = (ref) => {
    console.log(ref);
    ref.current.focus();
  };

  let initValues = vehicle || {
    name: '',
    mark: '',
    model: '',
    registrationNumber: '',
    mileage: '',
    checkupDate: '',
    type: '',
  };

  return (
    <Container>
      <Formik
        initialValues={initValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, submitForm, setFieldTouched, setFieldValue }) => (
          <StyledForm>
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
                      focusOn(modelRef);
                    }}
                    defaultValue={{ label: values.mark, value: values.mark }}
                  />
                </StyledSelect>
              </FieldWithErrors>
            </Row>
            <Row>
              <FieldWithErrors name='model' label='Model'>
                <Input type='text' innerRef={modelRef} />
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
                  focusOn={() => focusOn(typeRef)}
                  setFieldTouched={setFieldTouched}
                  setFieldValue={setFieldValue}
                  initialValue={initValues.checkupDate}
                />
              </FieldWithErrors>
            </Row>

            <Row>
              <FieldWithErrors name='type' label='Typ'>
                <StyledSelect>
                  <Select
                    ref={typeRef}
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
                    openMenuOnFocus={true}
                    defaultValue={{ label: values.type, value: values.type }}
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
