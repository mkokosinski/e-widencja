import React, { useState } from 'react';
import { Formik } from 'formik';
import { useHistory } from 'react-router';
import * as Yup from 'yup';

import FieldWithErrors from '../fieldWithErrors';
import Select from 'react-select';

import {
  StyledForm,
  Container,
  StyledField,
  ButtonsContainer,
  Row,
  StyledSelect
} from '../FormsStyles';
import {
  ButtonMain,
  ButtonBorderedSeconderySoft
} from '../../layout/LayoutStyles';
import DateInput, { DATEPICKER_TYPES } from '../DateInput';
import { addRecord, editRecord } from '../../records/recordsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectVehicles } from '../../vehicles/vehiclesSlice';
import useValidation from '../../hooks/useValidation';
import { DepentetInput } from '../DepentetInput';

const validationSchema = Yup.object({
  date: Yup.date().required('Pole wymagane'),
  vehicle: Yup.string().required('Pole wymagane'),
  mileage: Yup.number().min(1, 'Nie mniejszy niż 1').required('Pole wymagane')
});

const RecordForm = ({ record, isEdit }) => {
  const [serverErrors, setServerErrors] = useState(null);
  const { goBack } = useHistory();
  const dispatch = useDispatch();
  const validation = useValidation();

  const { items: vehicles } = useSelector(selectVehicles);
  // const tripTemplateRef = useRef(null);

  // const focusOn = (ref) => {
  //   ref.current.focus();
  // };

  const handleSubmit = (values) => {
    let validate;
    let action;

    if (isEdit) {
      validate = validation.editRecord(values);
      action = editRecord;
    } else {
      validate = validation.addRecord(values);
      action = addRecord;
    }

    if (validate.success) {
      setServerErrors(null);
      dispatch(action(values));
      goBack();
    } else {
      setServerErrors(validate.error);
    }
  };

  const vehicleSelectOptions = vehicles.map((vehicle) => {
    return {
      label: vehicle.name,
      value: vehicle.id,
      mileage: vehicle.mileage
    };
  });

  const defaultVehicleOption = record.vehicle || '';

  const minDate = () => {
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), 1);
  };

  const initValues = record || {
    date:  minDate(),
    vehicle: '',
    mileage:  1
  };

  return (
    <Container>
      {serverErrors}
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
                  dateFormat='yyyy-MM'
                  minDate={minDate()}
                  onChange={(date) => {
                    setFieldTouched('date');
                    setFieldValue('date', date);
                  }}
                  defaultDate={values.date}
                  type={DATEPICKER_TYPES.monthpicker}
                />
              </FieldWithErrors>
            </Row>

            <Row>
              <FieldWithErrors name='vehicle' label='Pojazd' scrollFocused>
                <StyledSelect>
                  <Select
                    as='select'
                    isSearchable={true}
                    options={vehicleSelectOptions}
                    onChange={(value) => {
                      setFieldTouched('vehicle');
                      setFieldTouched('mileage');
                      setFieldValue('vehicle', value);
                    }}
                    defaultValue={defaultVehicleOption}
                    // defaultValue={{ label: values.record, value: values.record }}
                  />
                </StyledSelect>
              </FieldWithErrors>
            </Row>

            <Row>
              <FieldWithErrors name='mileage' label='Przebieg' scrollFocused>
                <DepentetInput
                  type='number'
                  placeholder='Przebieg'
                  disabled
                  triggerField='vehicle'
                  triggerValue='mileage'
                />
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
