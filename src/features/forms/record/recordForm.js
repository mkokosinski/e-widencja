import React from 'react';
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
import { addRecord } from '../../records/recordsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectVehicles } from '../../vehicles/vehiclesSlice';

const validationSchema = Yup.object({
  date: Yup.date().required('Pole wymagane'),
  vehicle: Yup.string().required('Pole wymagane'),
  mileage: Yup.number().min(0, 'Nie mniejszy niż 0').required('Pole wymagane')
});

const RecordForm = ({ record }) => {
  const { goBack } = useHistory();
  const dispatch = useDispatch();
  const { items } = useSelector(selectVehicles);
  // const tourTemplateRef = useRef(null);

  // const focusOn = (ref) => {
  //   ref.current.focus();
  // };

  const handleSubmit = (values) => {
    console.log(values);
    dispatch(addRecord(values));
  };

  const vehicles = items.map((vehicle) => {
    return {
      label: vehicle.name,
      value: vehicle.id
    };
  });

  const minDate = () => {
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), 1);
  };

  const initValues = false || {
    date: minDate(),
    vehicle: '',
    mileage: 0
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
              <FieldWithErrors name='vehicle' label='Pojazd'>
                <StyledSelect>
                  <Select
                    as='select'
                    isSearchable={true}
                    options={vehicles}
                    onChange={({ value }) => {
                      setFieldTouched('vehicle');
                      setFieldValue('vehicle', value);
                    }}
                    // defaultValue={{ label: values.record, value: values.record }}
                  />
                </StyledSelect>
              </FieldWithErrors>
            </Row>

            <Row>
              <FieldWithErrors name='mileage' label='Przebieg'>
                <StyledField type='number' placeholder='Przebieg' />
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
