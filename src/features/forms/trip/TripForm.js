import React, { useRef, useState } from 'react';
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
  FieldsGroup
} from '../FormsStyles';
import {
  ButtonMain,
  ButtonBorderedSeconderySoft
} from '../../layout/LayoutStyles';
import DateInput, { DATEPICKER_TYPES } from '../DateInput';
import { faMinus, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import { selectVehicles } from '../../vehicles/vehiclesSlice';
import { selectDrivers } from '../../users/usersSlice';
import { selectRecords } from '../../records/recordsSlice';
import { selectFbUser } from '../../auth/authSlice';
import { USER_ROLES } from '../../../utils/authUtils';

const validationSchema = Yup.object({
  record: Yup.string()
    .max(30, 'Must be 30 characters or less')
    .required('Required'),
  date: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Pole wymagane'),
  tripTemplate: Yup.string(),
  stops: Yup.array().of(
    Yup.object().shape({
      label: Yup.string().max(28, 'Max 28 chars'),
      stop: Yup.string().max(28, 'Max 28 chars')
    })
  ),
  driver: Yup.string()
});

const handleSubmit = (values) => {
  console.log(values);
};

const TripForm = ({ record }) => {
  // const [recordSelectItems, setRecordSelectItems] = useState([])
  // const [recordSelectItems, setRecordSelectItems] = useState([])

  const { items: records } = useSelector(selectRecords);
  const drivers = useSelector(selectDrivers);
  const user = useSelector(selectFbUser);
  const isAdmin = user.role === USER_ROLES.admin;

  const { goBack } = useHistory();
  const tripTemplateRef = useRef(null);

  const recordSelectItems = records.map((rec) => ({
    label: `${rec.vehicle && rec.vehicle.name} - ${rec.name}`,
    value: rec.id
  }));

  const currDriver = {
    label: user.fullname,
    value: user.id
  };

  const driverSelectItems = isAdmin
    ? drivers.map((driv) => ({
        label: driv.fullname,
        value: driv.id
      }))
    : currDriver;

  const focusOn = (ref) => {
    ref.current.focus();
  };

  const initValues = record || {
    record: '',
    date: new Date(),
    tripTemplate: '',
    stops: [
      { label: 'Start', place: '', mileage: '' },
      { label: 'Cel', place: '', mileage: '' }
    ],
    driver: currDriver
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
                  onChange={(date) => {
                    setFieldTouched('date');
                    setFieldValue('date', date);
                    // focusOn(tripTemplateRef)
                  }}
                  defaultDate={values.date}
                  type={DATEPICKER_TYPES.daypicker}
                />
              </FieldWithErrors>
            </Row>

            <Row>
              <FieldWithErrors
                name='tripTemplate'
                label='Kierowca'
                ref={tripTemplateRef}
              >
                <StyledSelect>
                  <Select
                    as='select'
                    isSearchable={true}
                    options={driverSelectItems}
                    onChange={({ value }) => {
                      setFieldTouched('driver');
                      setFieldValue('driver', value);
                    }}
                    isDisabled={!isAdmin}
                    value={values.driver}
                    // defaultValue={{ label: values.record, value: values.record }}
                  />
                </StyledSelect>
              </FieldWithErrors>
            </Row>

            <Row>
              <FieldWithErrors name='record' label='Ewidencja'>
                <StyledSelect>
                  <Select
                    as='select'
                    isSearchable={true}
                    options={recordSelectItems}
                    onChange={({ value }) => {
                      setFieldTouched('record');
                      setFieldValue('record', value);
                      focusOn(tripTemplateRef);
                    }}
                    // defaultValue={{ label: values.record, value: values.record }}
                  />
                </StyledSelect>
              </FieldWithErrors>
            </Row>

            <Row>
              <FieldWithErrors
                name='tripTemplate'
                label='Trasa'
                ref={tripTemplateRef}
              >
                <StyledSelect>
                  <SelectCreatable
                    as='select'
                    isSearchable={true}
                    options={recordSelectItems}
                    onChange={({ value }) => {
                      setFieldTouched('tripTemplate');
                      setFieldValue('tripTemplate', value);
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
                              label: `Przystanek${index}`,
                              stop: ''
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

export default TripForm;
