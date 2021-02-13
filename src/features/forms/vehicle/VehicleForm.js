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
  Row,
} from '../FormsStyles';
import {
  ButtonMain,
  ButtonBorderedSeconderySoft,
} from '../../layout/LayoutStyles';
import { useDispatch, useSelector } from 'react-redux';
import { selectCarBrands } from '../../vehicles/carBrandsSlice';
import {
  formSelectCreateLabel,
  validationMessages,
} from '../../../utils/formUtils';
import { addVehicle, editVehicle } from '../../vehicles/vehiclesSlice';
import { toast } from 'react-toastify';
import useValidation from '../../hooks/useValidation';

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, validationMessages.min(3))
    .max(50, validationMessages.max(50))
    .required(validationMessages.required),
  brand: Yup.string()
    .min(3, validationMessages.min(3))
    .max(50, validationMessages.max(50))
    .required(validationMessages.required),
  model: Yup.string()
    .min(1, validationMessages.min(1))
    .max(50, validationMessages.max(50))
    .required(validationMessages.required),
  registrationNumber: Yup.string()
    .min(3, validationMessages.min(3))
    .max(7, validationMessages.max(7))
    .required(validationMessages.required),
  mileage: Yup.number().min(1).required(validationMessages.required),
  checkupDate: Yup.date().required(validationMessages.required),
  type: Yup.string()
    .min(5, 'Min 5')
    .max(15, 'Must be 15 characters or less')
    .required(validationMessages.required),
});

const VehicleForm = ({ vehicle, isEdit }) => {
  const [selectedBrand, setSelectedBrand] = useState('');

  const modelRef = useRef(null);
  const typeRef = useRef(null);
  const { goBack } = useHistory();
  const validation = useValidation();

  const dispatch = useDispatch();
  const carBrands = useSelector(selectCarBrands);

  const carBrandsSelectItems = carBrands.map((cb) => ({
    label: cb.label,
    value: cb,
  }));

  const getModels = () => {
    return selectedBrand
      ? selectedBrand.models.map((model) => ({
          label: model.model,
          value: model,
        }))
      : '';
  };

  const handleSubmit = (values) => {
    const data = {
      id: values.id,
      name: values.name,
      brand: values.brand.label,
      model: values.model.model,
      registrationNumber: values.registrationNumber,
      mileage: values.mileage,
      checkupDate: values.checkupDate,
      type: values.type,
    };

    const validate = validation.vehicle(data);
    const action = isEdit ? editVehicle : addVehicle;

    if (validate.success) {
      dispatch(action(data)).then((res) => {
        goBack();
      });
    } else {
      toast.error(validate.error);
    }
  };

  let initValues = vehicle || {
    name: '',
    brand: '',
    model: '',
    registrationNumber: '',
    mileage: '',
    checkupDate: new Date(),
    type: '',
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
                    placeholder={
                      selectedBrand ? 'Wybierz model' : 'Brak wybranej marki...'
                    }
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
                    setFieldTouched('checkupDate');
                    setFieldValue('checkupDate', value);
                    // focusOn(typeRef);
                  }}
                  defaultDate={initValues.checkupDate}
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
