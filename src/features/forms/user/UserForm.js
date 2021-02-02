import React from 'react';
import { Formik } from 'formik';
import { useHistory } from 'react-router';
import * as Yup from 'yup';

import FieldWithErrors from '../fieldWithErrors';
import Checkbox from '../checkbox';

import {
  StyledForm,
  Container,
  StyledField,
  ButtonsContainer,
  Row
} from '../FormsStyles';
import {
  ButtonMain,
  ButtonBorderedSeconderySoft
} from '../../layout/LayoutStyles';
import { validationMessages } from '../../../utils/formUtils';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addUser, editUser } from '../../users/usersSlice';
import useValidation from '../../hooks/useValidation';

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
  isDriver: Yup.bool()
  // eMail: Yup.string()
  //   .email(validationMessages.email)
  //   .min(7, validationMessages.min(7))
  //   .required(validationMessages.required)
});

const UserForm = ({ user, isEdit }) => {
  const dispatch = useDispatch();
  const { goBack } = useHistory();
  const validation = useValidation();

  const handleSubmit = (values) => {
    const data = {
      id: values.id,
      name: values.name,
      surname: values.surname,
      label: values.label,
      eMail: values.eMail,
      isDriver: values.isDriver,
      isAppUser: values.isAppUser
    };
    const validate = validation.user(data);
    const action = isEdit ? editUser : addUser;

    if (validate.success) {
      dispatch(action(data)).then((res) => {
        goBack();
      });
    } else {
      toast.error(validate.error);
    }
  };

  const initValues = user || {
    id: '',
    name: '',
    surname: '',
    label: '',
    isDriver: false
    // eMail: '',
    // isAppUser: false
  };

  return (
    <Container>
      <Formik
        initialValues={initValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, submitForm }) => (
          <StyledForm>
            <Row>
              <FieldWithErrors name='name' label='Imię' scrollFocused>
                <StyledField type='text' />
              </FieldWithErrors>
            </Row>

            <Row>
              <FieldWithErrors name='surname' label='Nazwisko' scrollFocused>
                <StyledField type='text' />
              </FieldWithErrors>
            </Row>

            <Row>
              <FieldWithErrors name='label' label='Skrót' scrollFocused>
                <StyledField type='text' />
              </FieldWithErrors>
            </Row>

            <Row>
              <Checkbox name='isDriver' label='Kierowca' />
            </Row>

            <Row>
              <FieldWithErrors name='eMail' label='E-mail' scrollFocused>
                <StyledField type='email' />
              </FieldWithErrors>
            </Row>

            {/* <Row>
              <Checkbox name='isAppUser' label='Załóż konto w aplikacji' />
            </Row>

            {values.isAppUser && (
              <Row>
                <FieldWithErrors name='password' label='Hasło' scrollFocused>
                  <StyledField type='password' />
                </FieldWithErrors>
              </Row>
            )} */}

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

export default UserForm;
