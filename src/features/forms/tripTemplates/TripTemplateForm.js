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
  FieldsGroup,
  Input,
  StyledCheckbox
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

const TripTemplateForm = ({ tripTemplate }) => {
  const { goBack } = useHistory();

  const tripTemplates = useSelector(selectTripTemplates);
  const purposes = useSelector(selectPurposes);

  const selectedPurpose = {
    label: tripTemplate.purpose,
    value: tripTemplate.purpose
  };

  const purposesSelectItems = purposes.map((purpose) => ({
    label: purpose,
    value: purpose
  }));

  const stops = tripTemplate.stops.map((stop) => ({
    ...stop,
    mileage: 0
  }));

  const initValues = {
    name: tripTemplate.name,
    purpose: tripTemplate.purpose ? selectedPurpose : '',
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
              <FieldWithErrors name='name' label='Nazwa' scrollFocused>
                <StyledField type='text' />
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
                      <FieldsGroup>
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
                      </FieldsGroup>
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

export default TripTemplateForm;
