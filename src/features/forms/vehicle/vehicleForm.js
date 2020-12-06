import React, { useEffect, useRef, useState } from 'react';
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
  StyledField,
  StyledSelect,
  ButtonsContainer,
  Row
} from '../FormsStyles';
import {
  ButtonMain,
  ButtonBorderedSeconderySoft
} from '../../layout/LayoutStyles';
import { useDispatch, useSelector } from 'react-redux';
import { selectCarBrands } from '../../vehicles/carBrandsSlice';
import {
  formSelectCreateLabel,
  validationMessages
} from '../../../utils/formUtils';
import { addVehicle, editVehicle } from '../../vehicles/vehiclesSlice';

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, validationMessages.min(3))
    .max(50, validationMessages.max(50))
    .required('Wymagane'),
  brand: Yup.string()
    .min(3, validationMessages.min(3))
    .max(50, validationMessages.max(50))
    .required('Wymagane'),
  model: Yup.string()
    .min(1, validationMessages.min(1))
    .max(50, validationMessages.max(50))
    .required('Wymagane'),
  registrationNumber: Yup.string()
    .min(3, validationMessages.min(3))
    .max(7, validationMessages.max(7))
    .required('Wymagane'),
  mileage: Yup.number().min(1).required('Wymagane'),
  checkupDate: Yup.date().required('Wymagane'),
  type: Yup.string()
    .min(5, 'Min 5')
    .max(15, 'Must be 15 characters or less')
    .required('Wymagane')
});



const VehicleForm = ({ vehicle }) => {
  const [selectedBrand, setSelectedBrand] = useState('');

  const { goBack } = useHistory();
  const modelRef = useRef(null);
  const typeRef = useRef(null);
  const dispatch = useDispatch();
  const carBrands = useSelector(selectCarBrands);

  const carBrandsSelectItems = carBrands.map((cb) => ({
    label: cb.label,
    value: cb
  }));

  const getModels = () => {
    return selectedBrand
      ? selectedBrand.models.map((model) => ({
          label: model.model,
          value: model
        }))
      : '';
  };

  const handleSubmit = (values) => {
    if (vehicle && vehicle.id) {
      dispatch(editVehicle(values))
    }
    else{
      dispatch(addVehicle(values))
    }
  };

  let initValues = vehicle || {
    name: '',
    brand: '',
    model: '',
    registrationNumber: '',
    mileage: '',
    checkupDate: '',
    type: ''
  };

  useEffect(() => {
    vehicle && setSelectedBrand(vehicle.brand);
  }, [vehicle]);

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
              <FieldWithErrors name='name' label='Nazwa' scrollFocused>
                <StyledField type='text' />
              </FieldWithErrors>
            </Row>
            <Row>
              <FieldWithErrors name='brand' label='Marka' scrollFocused>
                <StyledSelect>
                  <Select
                    as='select'
                    isSearchable={true}
                    id='brand'
                    options={carBrandsSelectItems}
                    onChange={({ value }) => {
                      setFieldTouched('brand');
                      setFieldValue('brand', value);
                      setSelectedBrand(value);
                      // focusOn(modelRef);
                    }}
                    placeholder='Wybierz markę'
                    defaultValue={initValues.brand}
                  />
                </StyledSelect>
              </FieldWithErrors>
            </Row>
            <Row>
              <FieldWithErrors name='model' label='Model' scrollFocused>
                <StyledSelect>
                  <SelectCreatable
                    as='select'
                    defaultValue={initValues.model}
                    formatCreateLabel={(label) => formSelectCreateLabel(label)}
                    innerRef={modelRef}
                    id='model'
                    isDisabled={!selectedBrand}
                    isSearchable={true}
                    noOptionsMessage={() => 'Wybierz markę'}
                    options={getModels()}
                    onChange={({ value }) => {
                      setFieldTouched('model');
                      setFieldValue('model', value);
                    }}
                    placeholder={selectedBrand ? 'Wybierz model' : 'Brak wybranej marki...'}
                  />
                </StyledSelect>
              </FieldWithErrors>
            </Row>
            <Row>
              <FieldWithErrors
                name='registrationNumber'
                label='Numer rejestracyjny'
                scrollFocused
              >
                <StyledField
                  type='text'
                  autoComplete='registrationNumber'
                  value={values.registrationNumber.toUpperCase()}
                  maxLength={7}
                />
              </FieldWithErrors>
            </Row>

            <Row>
              <FieldWithErrors name='mileage' label='Przebieg' scrollFocused>
                <StyledField type='number' autoComplete='mileage' />
              </FieldWithErrors>

              <FieldWithErrors name='checkupDate' label='Data przeglądu'>
                <DateInput
                  onChange={(value) => {
                    console.log(value);
                    setFieldTouched('checkupDate');
                    setFieldValue('checkupDate', value);
                    // focusOn(typeRef);
                  }}
                  // defaultValue={initValues.checkupDate}
                />
              </FieldWithErrors>
            </Row>

            <Row>
              <FieldWithErrors name='type' label='Typ' scrollFocused>
                <StyledSelect>
                  <SelectCreatable
                    ref={typeRef}
                    as='select'
                    styles={StyledSelect}
                    isSearchable={true}
                    onChange={({ value }) => {
                      setFieldTouched('type');
                      setFieldValue('type', value);
                    }}
                    openMenuOnFocus={true}
                    defaultValue={{ label: values.type, value: values.type }}
                    formatCreateLabel={(label) => formSelectCreateLabel(label)}
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
