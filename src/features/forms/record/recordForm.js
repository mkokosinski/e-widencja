import React, { useRef } from 'react';
import { FieldArray, Formik } from 'formik';
import { useHistory } from 'react-router';
import * as Yup from 'yup';

import FieldWithErrors from '../fieldWithErrors';
import Select from 'react-select';
import SelectCreatable from 'react-select/creatable';

import {
  StyledForm,
  Container,
  Input,
  ButtonsContainer,
  Row,
  StyledSelect,
} from '../FormsStyles';
import {
  ButtonMain,
  ButtonBorderedSeconderySoft,
} from '../../layout/LayoutStyles';
import DateInput from '../DateInput';

const validationSchema = Yup.object({
  record: Yup.string()
    .max(30, 'Must be 30 characters or less')
    .required('Required'),
  date: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Pole wymagane'),
  tourTemplate: Yup.string().required('Pole wymagane'),
  stops: Yup.array().of(
    Yup.object().shape({
      label: Yup.string().max(28, 'Max 28 chars'),
      stop: Yup.string().max(28, 'Max 28 chars'),
    })
  ),
  driver: Yup.string().required('Pole wymagane'),
});

const handleSubmit = (values) => {
  console.log(values);
};

let initValues = false || {
  record: '',
  date: '',
  tourTemplate: '',
  stops: [
    { label: 'Start', place: '' },
    { label: 'Cel', place: '' },
  ],
  driver: '',
};

const RecordForm = () => {
  const { goBack } = useHistory();
  const tourTemplateRef = useRef(null);

  const focusOn = (ref) => {
    ref.current.focus();
  };

  return (
    <Container>
      <Formik
        initialValues={initValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnChange={false}
      >
        {({ values, submitForm, setFieldTouched, setFieldValue }) => (
          <StyledForm>
            <Row>
              <FieldWithErrors name='date' label='Data'>
                <DateInput
                  focusOn={() => focusOn(tourTemplateRef)}
                  setFieldTouched={setFieldTouched}
                  setFieldValue={setFieldValue}
                  initialValue={initValues.date}
                />
              </FieldWithErrors>
            </Row>

            <Row>
              <FieldWithErrors name='record' label='Ewidencja'>
                <StyledSelect>
                  <Select
                    as='select'
                    isSearchable={true}
                    options={[
                      { label: 'test', value: 'test' },
                      { label: 'test2', value: 'test2' },
                    ]}
                    onChange={({ value }) => {
                      setFieldTouched('record');
                      setFieldValue('record', value);
                      focusOn(tourTemplateRef);
                    }}
                    // defaultValue={{ label: values.record, value: values.record }}
                  />
                </StyledSelect>
              </FieldWithErrors>
            </Row>

            <Row>
              <FieldWithErrors
                name='tourTemplate'
                label='Trasa'
                ref={tourTemplateRef}
              >
                <StyledSelect>
                  <SelectCreatable
                    as='select'
                    isSearchable={true}
                    options={[
                      { label: 'test', value: 'test' },
                      { label: 'test2', value: 'test2' },
                    ]}
                    onChange={({ value }) => {
                      setFieldTouched('tourTemplate');
                      setFieldValue('tourTemplate', value);
                    }}
                    // defaultValue={{ label: values.record, value: values.record }}
                  />
                </StyledSelect>
              </FieldWithErrors>
            </Row>

            <Row>
              <FieldArray name='stops'>
                {({ insert, remove, push }) =>
                  values.stops.map((stop, index) => (
                    <div key={index}>
                      <FieldWithErrors
                        name={`stops[${index}].label`}
                        label={stop.label}
                      />
                      {/* <FieldWithErrors name={stop.label} label={stop.label} /> */}

                      {index === 0 && (
                        <div
                          onClick={() => {
                            insert(values.stops.length - 1, {
                              label: `Przystanek`,
                              stop: '',
                            });
                          }}
                        >
                          +
                        </div>
                      )}
                      {index === values.stops.length - 1 && index > 1 && (
                        <div>-</div>
                      )}
                    </div>
                  ))
                }
              </FieldArray>
            </Row>

            <Row>
              <FieldWithErrors
                name='tourTemplate'
                label='Kierowca'
                ref={tourTemplateRef}
              >
                <StyledSelect>
                  <SelectCreatable
                    as='select'
                    isSearchable={true}
                    options={[
                      { label: 'test', value: 'test' },
                      { label: 'test2', value: 'test2' },
                    ]}
                    onChange={({ value }) => {
                      setFieldTouched('driver');
                      setFieldValue('driver', value);
                    }}
                    // defaultValue={{ label: values.record, value: values.record }}
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

export default RecordForm;
