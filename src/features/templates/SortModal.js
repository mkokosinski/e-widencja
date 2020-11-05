import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  filterDefaults,
  selectFilters,
  setFilter
} from '../templates/filterSlice';

import { ButtonsContainer, Input, Row } from '../forms/FormsStyles';
import { Field, Formik } from 'formik';
import {
  ButtonBorderedSeconderySoft,
  ButtonMain
} from '../layout/LayoutStyles';
import FieldWithErrors from '../forms/fieldWithErrors';
import { ModalContent } from './ListView/ListViewStyles';

const SortModalContent = ({ closeModal }) => {
  const dispatch = useDispatch();
  // const minDate = useSelector(selectEldestDate);

  const handleSubmit = (values) => {
    console.log(values);
    // closeModal();
  };

  const initValues = {
    date: 'elo'
  };

  return (
    <ModalContent>
      <Formik onSubmit={handleSubmit} initialValues={initValues}>
        {({ values, submitForm, setFieldTouched, setFieldValue }) => (
          <>
            <Row>
                <Field type='radio' value='yes' name='date' />
                <Field type='radio' value='no' name='date'/>
            </Row>
          </>
        )}
      </Formik>
    </ModalContent>
  );
};

export default SortModalContent;
