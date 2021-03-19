import React from 'react';
import PropTypes from 'prop-types';
import {
  ButtonsContainer,
  Container,
  Row,
  StyledError,
  StyledField,
  StyledForm,
} from '../FormsStyles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FieldWithErrors from '../fieldWithErrors';
import { ButtonBordered, ButtonMain } from '../../layout/LayoutStyles';
import { validationMessages } from '../../../utils/formUtils';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import useValidation from '../../hooks/useValidation';
import { INPUT_SIZE, USER_ROLES } from '../../../utils/constants';
import { selectCompany } from '../../company/companySlice';
import { selectFbUser } from '../../auth/authSlice';

const validationSchema = Yup.object({
  name: Yup.string()
    .max(30, validationMessages.max(30))
    .required(validationMessages.required),
  surname: Yup.string()
    .max(30, validationMessages.max(30))
    .required(validationMessages.required),
  label: Yup.string()
    .max(15, validationMessages.max(15))
    .required(validationMessages.required),
  isDriver: Yup.bool(),
  email: Yup.string()
    .email(validationMessages.email)
    .min(7, validationMessages.min(7))
    .required(validationMessages.required),
});

const EditCompanyForm = (props) => {
  const dispatch = useDispatch();
  const { goBack } = useHistory();
  const validation = useValidation();

  const companyData = useSelector(selectCompany);
  const currentUser = useSelector(selectFbUser);
  const canEdit = currentUser.role === USER_ROLES.ADMIN;

  const handleSubmit = (values) => {
    const data = {};
    const validate = validation.company(data);

    //   if (validate.success) {
    //     dispatch(action(data)).then((res) => {
    //       goBack();
    //     });
    //   } else {
    //     toast.error(validate.error);
    //   }
  };

  const initValues = {
    companyName: companyData.name,
    phone: companyData.phone,
    address: companyData.address,
    city: companyData.city,
    postcode: companyData.postcode,
    nip: companyData.nip,
    regon: companyData.regon,
  };

  return (
    <Formik
      initialValues={initValues}
      // validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <StyledForm>
          <Row>
            <FieldWithErrors
              name='companyName'
              label='Nazwa'
              size={INPUT_SIZE.LARGE}
              scrollFocused
            >
              <StyledField disabled={!canEdit} type='text' />
            </FieldWithErrors>
            <FieldWithErrors name='phone' label='Telefon' scrollFocused>
              <StyledField disabled={!canEdit} type='text' />
            </FieldWithErrors>
          </Row>

          <Row>
            <FieldWithErrors name='address' label='Adres' scrollFocused>
              <StyledField disabled={!canEdit} type='text' />
            </FieldWithErrors>
            <FieldWithErrors name='city' label='Miasto' scrollFocused>
              <StyledField disabled={!canEdit} type='text' />
            </FieldWithErrors>
            <FieldWithErrors
              name='postcode'
              label='Kod pocztowy'
              size={INPUT_SIZE.SMALL}
              scrollFocused
            >
              <StyledField disabled={!canEdit} type='text' />
            </FieldWithErrors>
          </Row>

          <Row>
            <FieldWithErrors name='nip' label='NIP' scrollFocused>
              <StyledField disabled={!canEdit} type='text' />
            </FieldWithErrors>
            <FieldWithErrors name='regon' label='REGON' scrollFocused>
              <StyledField disabled={!canEdit} type='text' />
            </FieldWithErrors>
          </Row>
          {canEdit ? (
            <ButtonsContainer>
              <ButtonMain type='submit'>Zapisz</ButtonMain>
              <ButtonBordered type='button' onClick={goBack}>
                Anuluj
              </ButtonBordered>
            </ButtonsContainer>
          ) : (
            <StyledError>
              Tylko administrator może edytować dane firmy
            </StyledError>
          )}
        </StyledForm>
      )}
    </Formik>
  );
};

EditCompanyForm.propTypes = {};

export default EditCompanyForm;
