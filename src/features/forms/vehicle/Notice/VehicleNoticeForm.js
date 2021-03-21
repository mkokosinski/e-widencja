import React, { useContext } from 'react';
import { Formik } from 'formik';
import { useHistory, useParams } from 'react-router';
import * as Yup from 'yup';

import Select from 'react-select';
import FieldWithErrors from '../../../../components/Form/fieldWithErrors';

import {
  StyledForm,
  Container,
  StyledField,
  StyledSelect,
  ButtonsContainer,
  Row,
  StyledFormTitle,
  FormTitleDeleteButton,
} from '../../../../components/Form/FormsStyles';
import { ButtonMain, ButtonBordered } from '../../../layout/LayoutStyles';
import { useDispatch, useSelector } from 'react-redux';
import { validationMessages } from '../../../../utils/formUtils';
import { selectNotices } from '../../../settings/redux/settingsSlice';
import { selectVehicleById } from '../../../vehicles/redux/vehiclesSlice';
import {
  addNotice,
  deleteNotice,
  editNotice,
} from '../../../vehicles/redux/notices';
import DateInput, {
  DATEPICKER_TYPES,
} from '../../../../components/Form/DateInput';
import { ThemeContext } from 'styled-components';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DeleteButton } from '../../../templates/detailsView/DetailsComponents';

const validationSchema = Yup.object({
  date: Yup.string().required(validationMessages.required),

  noticeName: Yup.string()
    .min(3, validationMessages.min(3))
    .max(50, validationMessages.max(50))
    .required(validationMessages.required),

  type: Yup.string().required(validationMessages.required),

  description: Yup.string()
    .min(3, validationMessages.min(3))
    .max(500, validationMessages.max(500)),
});

const VehicleNoticeForm = ({ isEdit, editedNotice }) => {
  const { id } = useParams();
  const { goBack } = useHistory();
  const dispatch = useDispatch();
  const theme = useContext(ThemeContext);
  const vehicle = useSelector((state) => selectVehicleById(state, id));
  const noticeTypes = useSelector(selectNotices);

  const typeOptions = noticeTypes.items.map((opt) => ({
    label: opt.name,
    value: opt,
  }));

  const defaultType = editedNotice
    ? { label: editedNotice.type.name, value: editedNotice.type }
    : '';

  const initValues = {
    vehicle: `${vehicle.brand} ${vehicle.model} (${vehicle.registrationNumber})`,
    vehicleId: vehicle?.id,
    date: editedNotice?.date || new Date(),
    noticeName: editedNotice?.name || '',
    description: editedNotice?.description || '',
    type: editedNotice?.type || '',
  };

  const handleSubmit = (values) => {
    const data = {
      id: editedNotice?.id || null,
      date: values.date,
      description: values.description,
      name: values.noticeName,
      vehicleId: vehicle.id,
      type: values.type,
    };
    const action = isEdit ? editNotice : addNotice;

    dispatch(action(data)).then(() => {
      goBack();
    });
  };

  const handleDelete = () => {
    if (editedNotice) {
      dispatch(
        deleteNotice({ vehicleId: vehicle.id, noticeId: editedNotice.id }),
      ).then(() => {
        goBack();
      });
    }
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
            <StyledFormTitle>
              {`${values.vehicle} - uwagi`}
              {isEdit && (
                <DeleteButton
                  item={editedNotice}
                  onClick={handleDelete}
                  component={
                    <FormTitleDeleteButton type='button' color={theme.redLight}>
                      <FontAwesomeIcon icon={faTrash} />
                    </FormTitleDeleteButton>
                  }
                />
              )}
            </StyledFormTitle>
            <Row>
              <FieldWithErrors name='date' label='Data'>
                <DateInput
                  dateFormat='yyyy-MM-dd'
                  onChange={(date) => {
                    setFieldTouched('date');
                    setFieldValue('date', date);
                  }}
                  defaultDate={values.date}
                  type={DATEPICKER_TYPES.daypicker}
                />
              </FieldWithErrors>
            </Row>
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
                    defaultValue={defaultType}
                  />
                </StyledSelect>
              </FieldWithErrors>
            </Row>
            <Row>
              <FieldWithErrors name='description' label='Opis' scrollFocused>
                <StyledField component='textarea' resize='vertical' rows='6' />
              </FieldWithErrors>
            </Row>
            <ButtonsContainer>
              <ButtonMain type='submit'>Zapisz</ButtonMain>
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

export default VehicleNoticeForm;
