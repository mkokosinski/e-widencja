import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  ExpandedItemOverlay,
  ExpandedPurposeItem,
  ExpandedPurposeItemContent,
  PurposeButton,
  PurposeButtonClose,
  PurposeButtonsContainer,
  PurposeInput
} from './SettingsStyles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { validationMessages } from '../../utils/formUtils';
import FieldWithErrors from '../forms/fieldWithErrors';
import {
  ButtonsContainer,
  Row,
  StyledField,
  StyledForm
} from '../forms/FormsStyles';
import { ButtonMain } from '../layout/LayoutStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { editPurpose } from './settingsSlice';

const validation = Yup.object({
  name: Yup.string().min(3, validationMessages.min(3)).required()
});

const EditPurposeItem = ({ item, closeItem }) => {
  const inputref = useRef(null);
  const dispatch = useDispatch();

  const handleSavePurpose = ({ name }) => {};

  const initValues = {
    name: item || ''
  };

  useEffect(() => {
    if (inputref?.current) {
      inputref.current.focus();
    }
  }, []);

  return (
    <>
      <ExpandedItemOverlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      />
      <ExpandedPurposeItem key={item + 'expand'} layoutId={item}>
        <ExpandedPurposeItemContent>
          <Formik
            initialValues={initValues}
            onSubmit={handleSavePurpose}
            validationSchema={validation}
          >
            {({ values, submitForm }) => (
              <StyledForm>
                <PurposeButtonsContainer
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <FieldWithErrors name='name'>
                    <PurposeInput innerRef={inputref} />
                  </FieldWithErrors>
                  <PurposeButton onClick={submitForm}>
                    <FontAwesomeIcon icon={faSave} />
                  </PurposeButton>
                  <PurposeButton onClick={closeItem}>
                    <FontAwesomeIcon icon={faTimes} />
                  </PurposeButton>
                </PurposeButtonsContainer>
              </StyledForm>
            )}
          </Formik>
        </ExpandedPurposeItemContent>
      </ExpandedPurposeItem>
    </>
  );
};

EditPurposeItem.propTypes = {
  item: PropTypes.string,
  closeItem: PropTypes.func
};

export default EditPurposeItem;
