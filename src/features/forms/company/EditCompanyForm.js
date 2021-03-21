import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';

import { Formik } from 'formik';
import * as Yup from 'yup';

import FieldWithErrors from '../../../components/Form/fieldWithErrors';
import MaskedField from '../../../components/Form/MaskedField';
import useValidation from '../../../hooks/useValidation';

import { editCompany, selectCompany } from '../../company/companySlice';
import { selectCurrentUser } from '../../auth/authSlice';

import { INPUT_SIZE, USER_ROLES } from '../../../utils/constants';
import { validationMessages } from '../../../utils/formUtils';
import { removeChar, removeWhiteSpaces } from '../../../utils/stringUtils';

import { ButtonBordered } from '../../layout/LayoutStyles';
import {
  ButtonsContainer,
  Row,
  StyledError,
  StyledField,
  StyledForm,
} from '../../../components/Form/FormsStyles';
import SubmitButton from '../../../components/Form/SubmitButton';

const validationSchema = Yup.object({
  companyName: Yup.string().required(validationMessages.required),
  phone: Yup.string()
    .matches(/^\+48\s?([0-9]{3}\s?){3}$/, validationMessages.incorrectFormat)
    .required(validationMessages.required),

  address: Yup.string().required(validationMessages.required),
  city: Yup.string().required(validationMessages.required),
  postcode: Yup.string()
    .matches(/^[0-9]{2}-[0-9]{3}$/, validationMessages.incorrectFormat)
    .required(validationMessages.required),
  nip: Yup.string()
    .matches(/^[0-9]{10}$/, validationMessages.incorrectFormat)
    .required(validationMessages.required),
  regon: Yup.string()
    .matches(/^[0-9]{9}$|^[0-9]{14}$/, validationMessages.incorrectFormat)
    .required(validationMessages.required),
});

const EditCompanyForm = (props) => {
  const dispatch = useDispatch();
  const { goBack } = useHistory();
  const validation = useValidation();

  const companyData = useSelector(selectCompany);
  const currentUser = useSelector(selectCurrentUser);
  const canEdit = currentUser.role === USER_ROLES.ADMIN;

  const handleSubmit = (values, { resetForm }) => {
    const data = {
      id: companyData.id,
      name: values.companyName,
      phone: removeWhiteSpaces(values.phone),
      address: values.address,
      city: values.city,
      postcode: values.postcode,
      nip: removeChar(values.nip, '-'),
      regon: values.regon,
    };
    const validate = validation.company(data);

    if (validate.success) {
      dispatch(editCompany(data)).then(() => {
        resetForm(values);
      });
    } else {
      toast.error(validate.error);
    }
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
      validationSchema={validationSchema}
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
              <StyledField
                disabled={!canEdit}
                type='text'
                placeholder='Nazwa firmy'
              />
            </FieldWithErrors>
            <FieldWithErrors name='phone' label='Telefon' scrollFocused>
              <MaskedField
                mask='+48 999 999 999'
                disabled={!canEdit}
                name='phone'
                placeholder='+48 000 000 000'
              />
            </FieldWithErrors>
          </Row>

          <Row>
            <FieldWithErrors name='address' label='Adres' scrollFocused>
              <StyledField
                disabled={!canEdit}
                type='text'
                placeholder='Ulica 00/00'
              />
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
              <MaskedField
                mask='99-999'
                disabled={!canEdit}
                name='postcode'
                placeholder='00-000'
              />
            </FieldWithErrors>
          </Row>

          <Row>
            <FieldWithErrors name='nip' label='NIP' scrollFocused>
              <StyledField disabled={!canEdit} type='text' />
            </FieldWithErrors>
            <FieldWithErrors name='regon' label='REGON' scrollFocused>
              <MaskedField
                autoComplete='off'
                disabled={!canEdit}
                mask=''
                maxLength='14'
              />
            </FieldWithErrors>
          </Row>
          {canEdit ? (
            <ButtonsContainer>
              <SubmitButton>Zapisz</SubmitButton>
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
