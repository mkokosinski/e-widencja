import React, { useEffect, useRef, useState } from 'react';
import { Field, FieldArray, Formik } from 'formik';
import { useHistory, useLocation } from 'react-router';
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
  MileageFieldsGroup,
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
import {
  selectTripTemplates,
  selectTripTemplateSort
} from '../../tripTemplates/tripTemplatesSlice';
import { selectPurposes, selectSettings } from '../../settings/settingsSlice';
import MileageInput from './MileageInput';
import DistanceInput from './DistanceInput';
import Checkbox from '../checkbox';

const validationSchema = Yup.object().shape({
  date: Yup.date().required('Pole wymagane'),
  driver: Yup.string().required('Wymagane'),
  record: Yup.string().required('Wymagane'),
  purpose: Yup.string().required('Wymagane'),
  tripTemplate: Yup.string(),
  stops: Yup.array().of(
    Yup.object().shape({
      label: Yup.string().max(28, 'Max 28 chars').required('Wymagane'),
      place: Yup.string().max(28, 'Max 28 chars').required('Wymagane'),
      mileage: Yup.number().min(1, 'Zła wartość').required('Wymagane'),
      distance: Yup.number().min(0, 'Zła wartość').required('Wymagane')
    })
  )
});

const handleSubmit = (values) => {
  console.log(values);
};

const emptyRecord = {
  name: '',
  vehicle: {
    name: ''
  }
};

const emptyTripTemplate = {
  label: '',
  value: '',
  stops: []
};

const TripForm = ({ trip }) => {
  const { goBack } = useHistory();
  const tripTemplateRef = useRef(null);

  const { items: records } = useSelector(selectRecords);
  const drivers = useSelector(selectDrivers);
  const user = useSelector(selectFbUser);
  const tripTemplates = useSelector(selectTripTemplates);
  const purposes = useSelector(selectPurposes);

  const record = records.find((r) => r.id === trip.record) || emptyRecord;
  const tripTemplate =
    tripTemplates.find((t) => t.id === trip.tripTemplate) || emptyTripTemplate;

  const selectedRecord = {
    label: ` ${record.vehicle.name} - ${record.name}`,
    value: record.id,
    mileage: record.vehicle.mileage
  };

  const selectedPurpose = {
    label: trip.purpose,
    value: trip.purpose
  };

  const isAdmin = user.role === USER_ROLES.admin;

  const selectedDriver = {
    label: user.fullname,
    value: user.id
  };

  const selectedTemplate = {
    label: tripTemplate.label,
    value: tripTemplate.id,
    stops: tripTemplate.stops
  };

  const recordSelectItems = records.map((rec) => ({
    label: `${rec.vehicle && rec.vehicle.name} - ${rec.name}`,
    value: rec.id,
    mileage: rec.vehicle.mileage
  }));

  const driverSelectItems = isAdmin
    ? drivers.map((driv) => ({
        label: driv.fullname,
        value: driv.id
      }))
    : selectedDriver;

  const tripTemplatesSelectItems = tripTemplates.map((template) => ({
    label: template.label,
    value: template.id,
    stops: template.stops
  }));

  const purposesSelectItems = purposes.map((purpose) => ({
    label: purpose,
    value: purpose
  }));

  const initMileage = trip.initialMileage || record.vehicle.mileage;

  const stops = trip.stops.map((stop) => ({
    ...stop,
    mileage: initMileage
  }));

  const focusOn = (ref) => {
    ref.current.focus();
  };

  const initValues = {
    date: trip.date,
    driver: selectedDriver,
    initMileage: initMileage,
    record: selectedRecord,
    tripTemplate: trip.tripTemplate ? selectedTemplate : '',
    purpose: trip.purpose ? selectedPurpose : '',
    stops: stops
  };

  return (
    <Container>
      <Formik
        initialValues={initValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          submitForm,
          setFieldTouched,
          setFieldValue,
          handleChange
        }) => (
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
                scrollFocused
              >
                <StyledSelect>
                  <Select
                    as='select'
                    isSearchable={true}
                    options={driverSelectItems}
                    onChange={(option) => {
                      setFieldTouched('driver');
                      setFieldValue('driver', option);
                    }}
                    isDisabled={!isAdmin}
                    value={values.driver}
                  />
                </StyledSelect>
              </FieldWithErrors>
            </Row>

            <Row>
              <FieldWithErrors name='record' label='Ewidencja' scrollFocused>
                <StyledSelect>
                  <Select
                    as='select'
                    isSearchable={true}
                    options={recordSelectItems}
                    onChange={(option) => {
                      setFieldTouched('record');
                      setFieldValue('record', option);
                      setFieldValue(
                        'stops',
                        values.stops.map((stop) => ({
                          ...stop,
                          mileage: option.mileage
                        }))
                      );
                      focusOn(tripTemplateRef);
                    }}
                    value={values.record}
                  />
                </StyledSelect>
              </FieldWithErrors>
            </Row>

            <Row>
              <FieldWithErrors
                name='tripTemplate'
                label='Szablon'
                ref={tripTemplateRef}
                scrollFocused
              >
                <StyledSelect>
                  <SelectCreatable
                    as='select'
                    isSearchable={true}
                    options={tripTemplatesSelectItems}
                    onChange={(option) => {
                      setFieldTouched('tripTemplate');
                      setFieldValue('tripTemplate', option);
                      setFieldValue(
                        'stops',
                        option.stops.map((stop) => ({
                          ...stop,
                          mileage: values.record.mileage + stop.distance
                        }))
                      );
                    }}
                    placeholder='Wybierz szablon'
                    value={values.tripTemplate}
                  />
                </StyledSelect>
              </FieldWithErrors>
            </Row>

            <Row>
              <FieldWithErrors name='purpose' label='Cel wyjazdu' scrollFocused>
                <StyledSelect>
                  <SelectCreatable
                    as='select'
                    isSearchable={true}
                    options={purposesSelectItems}
                    onChange={(option) => {
                      setFieldTouched('purpose');
                      setFieldValue('purpose', option);
                      focusOn(tripTemplateRef);
                    }}
                    onCreateOption={(value) => {
                      const option = { label: value, value };
                      setFieldTouched('purpose');
                      setFieldValue('purpose', option);
                    }}
                    placeholder='Wybierz cel'
                    value={values.purpose}
                  />
                </StyledSelect>
              </FieldWithErrors>
            </Row>

            <Row>
              <FieldArray name='stops'>
                {({ remove, push }) => {
                  const labels = [
                    'Początek trasy',
                    ...values.stops
                      .map((s, i) => 'Przystanek ' + i)
                      .slice(1, -1),
                    'Koniec trasy'
                  ];

                  return values.stops.map((stop, index) => (
                    <React.Fragment key={stop.label + index}>
                      <MileageFieldsGroup>
                        <FieldWithErrors
                          name={`stops[${index}].place`}
                          label={labels[index]}
                          scrollFocused
                        >
                          <StyledField type='text' placeholder='Miejsce' />
                        </FieldWithErrors>

                        <FieldWithErrors
                          name={`stops[${index}].mileage`}
                          scrollFocused
                        >
                          <MileageInput index={index} type='number' min='0' />
                        </FieldWithErrors>
                        <FieldWithErrors
                          name={`stops[${index}].distance`}
                          scrollFocused
                        >
                          <DistanceInput index={index} type='number' min='0' />
                        </FieldWithErrors>

                        {index >= 1 && index < values.stops.length - 1 && (
                          <RemoveItemButton onClick={() => remove(index)}>
                            <FontAwesomeIcon icon={faMinus} />
                          </RemoveItemButton>
                        )}
                      </MileageFieldsGroup>
                      {index === values.stops.length - 2 && (
                        <AddItemButton
                          onClick={() => {
                            push(values.stops.length - 1, {
                              label: `Przystanek ${index + 1}`,
                              place: ``,
                              distance: 0,
                              mileage: values.stops[index].mileage
                            });
                          }}
                        >
                          <FontAwesomeIcon icon={faPlusCircle} />
                          <span> Dodaj przystanek </span>
                        </AddItemButton>
                      )}
                    </React.Fragment>
                  ));
                }}
              </FieldArray>
            </Row>

            <Row>
              <Checkbox name='saveTemplate' label='zapisz jako szablon' />
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
