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
  StyledField,
  ButtonsContainer,
  Row,
  StyledSelect,
  AddItemButton,
  RemoveItemButton,
  FieldsGroup,
} from '../FormsStyles';
import {
  ButtonMain,
  ButtonBorderedSeconderySoft,
} from '../../layout/LayoutStyles';
import DateInput from '../DateInput';
import {
  faMinus,
  faPlus,
  faPlusCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    { label: 'Start', place: '', mileage: '' },
    { label: 'Cel', place: '', mileage: '' },
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
                    <React.Fragment key={stop.label + index}>
                      <FieldsGroup>
                        <FieldWithErrors
                          name={`stops[${index}].place`}
                          label={stop.label}
                        >
                          <StyledField type='text' placeholder='Miejsce' />
                        </FieldWithErrors>

                        <FieldWithErrors name={`stops[${index}].mileage`}>
                          <StyledField type='number' placeholder='Przebieg' />
                        </FieldWithErrors>

                        {index >= 1 && index < values.stops.length - 1 && (
                          <RemoveItemButton onClick={() => remove(index)}>
                            <FontAwesomeIcon icon={faMinus} />
                          </RemoveItemButton>
                        )}
                      </FieldsGroup>
                      {index === values.stops.length - 2 && (
                        <AddItemButton
                          onClick={() => {
                            insert(values.stops.length - 1, {
                              label: `Przystanek`,
                              stop: '',
                            });
                          }}
                        >
                          <FontAwesomeIcon icon={faPlusCircle} />
                          <span> Dodaj przystanek </span>
                        </AddItemButton>
                      )}
                    </React.Fragment>
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
