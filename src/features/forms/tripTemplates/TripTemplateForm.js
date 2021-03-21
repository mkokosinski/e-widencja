import React from 'react';
import { Formik } from 'formik';
import { useHistory } from 'react-router';
import * as Yup from 'yup';

import FieldWithErrors from '../../../components/Form/fieldWithErrors';
import SelectCreatable from 'react-select/creatable';

import {
  StyledForm,
  Container,
  StyledField,
  ButtonsContainer,
  Row,
  StyledSelect,
} from '../../../components/Form/FormsStyles';
import { ButtonBordered } from '../../layout/LayoutStyles';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTripTemplate,
  editTripTemplate,
} from '../../tripTemplates/tripTemplatesSlice';
import { selectPurposes } from '../../settings/redux/settingsSlice';
import useValidation from '../../../hooks/useValidation';
import { toast } from 'react-toastify';
import StopsList from '../trip/StopsList';
import SubmitButton from '../../../components/Form/SubmitButton';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Wymagane'),
  purpose: Yup.string().required('Wymagane'),
  tripTemplate: Yup.string(),
  stops: Yup.array().of(
    Yup.object().shape({
      place: Yup.string().max(28, 'Max 28 chars').required('Wymagane'),
      distance: Yup.number().min(0, 'Zła wartość').required('Wymagane'),
    }),
  ),
});

const TripTemplateForm = ({ tripTemplate, isEdit }) => {
  const { goBack } = useHistory();
  const dispatch = useDispatch();
  const validation = useValidation();

  const purposes = useSelector(selectPurposes);

  const selectedPurpose = {
    label: tripTemplate.purpose,
    value: tripTemplate.purpose,
  };

  const purposesSelectItems = purposes.items.map((purpose) => ({
    label: purpose.name,
    value: purpose.name,
  }));

  const stops = tripTemplate.stops.map((stop) => ({
    ...stop,
  }));

  const initValues = {
    name: tripTemplate.name,
    purpose: tripTemplate.purpose ? selectedPurpose : '',
    stops: stops,
  };

  const handleSubmit = (values, { setSubmitting }) => {
    const data = {
      id: tripTemplate?.id || '',
      name: values.name,
      purpose: values.purpose.value,
      stops:
        values.stops?.map((stop) => ({
          place: stop.place,
          distance: stop.distance,
        })) || [],
    };

    const validate = validation.tripTemplate(data);
    const action = isEdit ? editTripTemplate : addTripTemplate;

    if (validate.success) {
      dispatch(action(data)).then(() => {
        goBack();
      });
    } else {
      setSubmitting(false);
      toast.error(validate.error);
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
                    noOptionsMessage={() => 'Lista pusta. Dodaj cel w opcjach'}
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
              <StopsList stops={values.stops} isTemplate />
            </Row>

            <ButtonsContainer>
              <SubmitButton>Zapisz</SubmitButton>
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

export default TripTemplateForm;
