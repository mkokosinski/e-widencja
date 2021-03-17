import React from 'react';
import { FieldArray, Formik } from 'formik';
import { useHistory } from 'react-router';
import * as Yup from 'yup';

import FieldWithErrors from '../fieldWithErrors';
import SelectCreatable from 'react-select/creatable';

import {
  StyledForm,
  Container,
  StyledField,
  ButtonsContainer,
  Row,
  StyledSelect,
  AddItemButton,
  RemoveItemButton,
  MileageFieldsGroup,
} from '../FormsStyles';
import { ButtonMain, ButtonBordered } from '../../layout/LayoutStyles';
import { faMinus, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTripTemplate,
  editTripTemplate,
} from '../../tripTemplates/tripTemplatesSlice';
import { selectPurposes } from '../../settings/redux/settingsSlice';
import useValidation from '../../hooks/useValidation';
import { toast } from 'react-toastify';

const validationSchema = Yup.object().shape({
  label: Yup.string().required('Wymagane'),
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
    mileage: 0,
  }));

  const initValues = {
    label: tripTemplate.label,
    purpose: tripTemplate.purpose ? selectedPurpose : '',
    stops: stops,
  };

  const handleSubmit = (values) => {
    const data = {
      id: tripTemplate?.id || '',
      name: values.name,
      purpose: values.purpose.value,
      stops: values.stops,
    };

    const validate = validation.tripTemplate(data);
    const action = isEdit ? editTripTemplate : addTripTemplate;

    if (validate.success) {
      dispatch(action(data)).then(() => {
        goBack();
      });
    } else {
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
                    noOptionsMessage='Lista pusta. Dodaj cel w opcjach'
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
              <FieldArray name='stops'>
                {({ remove, push }) => {
                  const labels = [
                    'Początek trasy',
                    ...values.stops
                      .map((s, i) => 'Przystanek ' + i)
                      .slice(1, -1),
                    'Koniec trasy',
                  ];

                  return values.stops.map((stop, index) => (
                    <React.Fragment key={stop.label + index}>
                      <MileageFieldsGroup>
                        <FieldWithErrors
                          name={`stops[${index}].place`}
                          label={labels[index]}
                          scrollFocused
                        >
                          <StyledField type='text' placeholder='Miejsce' />
                        </FieldWithErrors>

                        <FieldWithErrors
                          name={`stops[${index}].distance`}
                          scrollFocused
                        >
                          <StyledField
                            index={index}
                            type='number'
                            min='0'
                            placeholder='km'
                          />
                        </FieldWithErrors>

                        {index >= 1 && index < values.stops.length - 1 && (
                          <RemoveItemButton onClick={() => remove(index)}>
                            <FontAwesomeIcon icon={faMinus} />
                          </RemoveItemButton>
                        )}
                      </MileageFieldsGroup>
                      {index === values.stops.length - 2 && (
                        <AddItemButton
                          onClick={() => {
                            push(values.stops.length - 1, {
                              label: `Przystanek ${index + 1}`,
                              place: ``,
                              distance: 0,
                              mileage: values.stops[index].mileage,
                            });
                          }}
                        >
                          <FontAwesomeIcon icon={faPlusCircle} />
                          <span> Dodaj przystanek </span>
                        </AddItemButton>
                      )}
                    </React.Fragment>
                  ));
                }}
              </FieldArray>
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

export default TripTemplateForm;
