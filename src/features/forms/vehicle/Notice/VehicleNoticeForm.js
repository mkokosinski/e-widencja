import React, { useEffect, useRef, useState } from 'react';
import { Formik } from 'formik';
import { useHistory, useParams } from 'react-router';
import * as Yup from 'yup';

import Select from 'react-select';
import FieldWithErrors from '../../fieldWithErrors';

import {
  StyledForm,
  Container,
  StyledField,
  StyledSelect,
  ButtonsContainer,
  Row,
  StyledFormTitle,
} from '../../FormsStyles';
import {
  ButtonMain,
  ButtonBorderedSeconderySoft,
} from '../../../layout/LayoutStyles';
import { useDispatch, useSelector } from 'react-redux';
import { validationMessages } from '../../../../utils/formUtils';
import { addVehicle, editVehicle } from '../../../vehicles/redux/vehicleThunk';
import { selectNotices } from '../../../settings/redux/settingsSlice';
import { selectVehicleById } from '../../../vehicles/redux/vehiclesSlice';

const validationSchema = Yup.object({
  noticeName: Yup.string()
    .min(3, validationMessages.min(3))
    .max(50, validationMessages.max(50))
    .required(validationMessages.required),

  type: Yup.string().required(validationMessages.required),

  description: Yup.string()
    .min(3, validationMessages.min(3))
    .max(500, validationMessages.max(500))
    .required(validationMessages.required),
});

const VehicleNoticeForm = ({ isEdit }) => {
  const { id } = useParams();

  const vehicle = useSelector((state) => selectVehicleById(state, id));
  const noticeTypes = useSelector(selectNotices);

  const { goBack } = useHistory();
  const dispatch = useDispatch();

  const typeOptions = noticeTypes.items.map((opt) => ({
    label: opt.name,
    value: opt.name,
  }));

  const handleSubmit = (values) => {
    const data = {
      id: values.id,
      vehicle: values.vehicle,
      name: values.noticeName,
      description: values.description,
      type: values.type,
    };

    // isEdit ? null : null;
  };

  const initValues = {
    vehicle: `${vehicle.brand} ${vehicle.model} (${vehicle.registrationNumber})`,
    noticeName: '',
    description: '',
    type: '',
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
            <StyledFormTitle>{values.vehicle}</StyledFormTitle>

            <Row>
              <FieldWithErrors name='noticeName' label='Nazwa' scrollFocused>
                <StyledField type='text' />
              </FieldWithErrors>
            </Row>

            <Row>
              <FieldWithErrors name='type' label='Typ' scrollFocused>
                <StyledSelect>
                  <Select
                    as='select'
                    isSearchable={true}
                    options={typeOptions}
                    onChange={({ value }) => {
                      setFieldTouched('type');
                      setFieldValue('type', value);
                    }}
                    placeholder=''
                    defaultValue={initValues.type}
                  />
                </StyledSelect>
              </FieldWithErrors>
            </Row>

            <Row>
              <FieldWithErrors name='description' label='Opis' scrollFocused>
                <StyledField as='textarea' resize='vertical' rows='6' />
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

export default VehicleNoticeForm;
