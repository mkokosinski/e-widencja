import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import SelectCreatable from 'react-select/creatable';

import { Formik } from 'formik';
import { useHistory } from 'react-router';
import * as Yup from 'yup';

import Checkbox from '../../../components/Form/checkbox';
import FieldWithErrors from '../../../components/Form/fieldWithErrors';
import SubmitButton from '../../../components/Form/SubmitButton';
import StopsList from './StopsList';
import DateInput, {
  DATEPICKER_TYPES,
} from '../../../components/Form/DateInput';

import { selectCurrentUser } from '../../auth/authSlice';
import { selectRecords } from '../../records/recordsSlice';
import { selectPurposes } from '../../settings/redux/settingsSlice';
import { addTrip, editTrip } from '../../trips/tripsSlice';
import { selectTripTemplates } from '../../tripTemplates/tripTemplatesSlice';
import { selectDrivers } from '../../users/usersSlice';

import { refreshStopsMileage } from '../../../utils/trips';
import { USER_ROLES } from '../../../utils/constants';
import {
  StyledForm,
  Container,
  StyledField,
  ButtonsContainer,
  Row,
  StyledSelect,
} from '../../../components/Form/FormsStyles';
import { ButtonBordered } from '../../layout/LayoutStyles';

const validationSchema = Yup.object().shape({
  date: Yup.date().required('Pole wymagane'),
  driver: Yup.string().required('Wymagane'),
  record: Yup.string().required('Wymagane'),
  purpose: Yup.string().required('Wymagane'),
  tripTemplate: Yup.string(),
  stops: Yup.array().of(
    Yup.object().shape({
      place: Yup.string().max(28, 'Max 28 chars').required('Wymagane'),
      mileage: Yup.number()
        .typeError('Wymagane')
        .min(1, 'Zła wartość')
        .required('Wymagane'),
      distance: Yup.number()
        .typeError('Wymagane')
        .min(0, 'Zła wartość')
        .required('Wymagane'),
    }),
  ),
});

const emptyRecord = {
  name: '',
  vehicle: {
    name: '',
  },
  mileage: 0,
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
};

const emptyTripTemplate = {
  label: '',
  value: '',
  stops: [],
};

const TripForm = ({ trip, isEdit }) => {
  const { goBack } = useHistory();
  const dispatch = useDispatch();
  const tripTemplateRef = useRef(null);

  const { items: records } = useSelector(selectRecords);
  const drivers = useSelector(selectDrivers);
  const user = useSelector(selectCurrentUser);
  const tripTemplates = useSelector(selectTripTemplates);
  const purposes = useSelector(selectPurposes);

  const record = records.find((r) => r.id === trip.record) || emptyRecord;
  const tripTemplate =
    tripTemplates.find((t) => t.id === trip.tripTemplate) || emptyTripTemplate;

  const selectedRecord = {
    label: `${record.vehicle.name} - ${record.name}`,
    value: record.id,
    mileage: record.vehicle.mileage,
    vehicle: record.vehicle.id,
    month: record.month,
    year: record.year,
  };

  const selectedPurpose = {
    label: trip.purpose,
    value: trip.purpose,
  };

  const isAdmin = user.role === USER_ROLES.ADMIN;

  const selectedDriver = {
    label: `${user.name} ${user.surname}`,
    value: user.id,
  };

  const selectedTemplate = {
    label: tripTemplate.name,
    value: tripTemplate.id,
    stops: tripTemplate.stops,
  };

  const recordSelectItems = records.map((rec) => ({
    label: `${rec.vehicle && rec.vehicle.name} - ${rec.name}`,
    value: rec.id,
    mileage: rec.vehicle.mileage,
    vehicle: rec.vehicle.id,
    month: rec.month,
    year: rec.year,
  }));

  const driverSelectItems = isAdmin
    ? drivers.map((driv) => ({
        label: `${driv.name} ${driv.surname}`,
        value: driv.id,
      }))
    : selectedDriver;

  const tripTemplatesSelectItems = tripTemplates.map((template) => ({
    label: template.name,
    value: template.id,
    stops: template.stops,
    purpose: template.purpose,
  }));

  const purposesSelectItems = purposes.items.map((purpose) => ({
    label: purpose.name,
    value: purpose.name,
  }));

  const initMileage = trip.initialMileage || record.vehicle.mileage;

  const stops = trip.stops.map((stop) => ({
    ...stop,
    mileage: initMileage,
  }));

  const focusOn = (ref) => {
    ref.current.focus();
  };

  const initValues = {
    date: trip.date,
    driver: selectedDriver,
    initMileage: initMileage,
    record: selectedRecord,
    tripTemplate: trip.tripTemplate && selectedTemplate,
    purpose: trip.purpose && selectedPurpose,
    stops: stops,
    saveTemplate: false,
    templateName: '',
  };

  const handleSubmit = (values, { setSubmitting }) => {
    const newTrip = {
      id: trip?.id,
      date: values.date,
      record: values.record.value,
      driver: values.driver.value,
      purpose: values.purpose.value,
      template: values.tripTemplate.value || '',
      stops: values.stops,
      vehicle: values.record.vehicle,
      saveTemplate: values.saveTemplate,
      templateName: values.templateName,
    };
    const action = isEdit ? editTrip : addTrip;
    dispatch(action(newTrip)).then(() => goBack());
  };

  return (
    <Container>
      <Formik
        initialValues={initValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldTouched, setFieldValue }) => (
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
                  minDate={
                    new Date(values.record.year, values.record.month - 1, 1)
                  }
                  maxDate={new Date(values.record.year, values.record.month, 0)}
                />
              </FieldWithErrors>
            </Row>

            <Row>
              <FieldWithErrors
                name='driver'
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
                        'date',
                        new Date(option.year, option.month - 1, 1),
                      );
                      setFieldValue(
                        'stops',
                        refreshStopsMileage(option.mileage, values.stops),
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
                  <Select
                    as='select'
                    isSearchable={true}
                    options={tripTemplatesSelectItems}
                    onChange={(option) => {
                      setFieldTouched('tripTemplate');
                      setFieldValue('tripTemplate', option);
                      setFieldValue('purpose', {
                        label: option.purpose,
                        value: option.purpose,
                      });

                      setFieldValue(
                        'stops',
                        refreshStopsMileage(
                          values.record.mileage,
                          option.stops,
                        ),
                      );
                    }}
                    placeholder='Opcjonalne'
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
              <StopsList />
            </Row>

            {!isEdit && (
              <>
                <Row>
                  <Checkbox name='saveTemplate' label='zapisz jako szablon' />
                </Row>
                {values.saveTemplate && (
                  <FieldWithErrors
                    name='templateName'
                    label='Nazwa szablonu'
                    scrollFocused
                  >
                    <StyledField type='text' placeholder='Nazwa' />
                  </FieldWithErrors>
                )}
              </>
            )}

            <ButtonsContainer>
              <SubmitButton>Zapisz</SubmitButton>
              <ButtonBordered type='button' onClick={goBack}>
                Anuluj
              </ButtonBordered>
            </ButtonsContainer>
          </StyledForm>
        )}
      </Formik>
    </Container>
  );
};

export default TripForm;
