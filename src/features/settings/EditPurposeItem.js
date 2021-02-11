import React, { useEffect, useRef, useState } from 'react';
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
import { Formik, useFormikContext } from 'formik';
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

const EditPurposeItem = ({ item, defaultValue, saveItem, closeItem }) => {
  const [value, setValue] = useState(defaultValue || '');
  const inputref = useRef(null);

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
        exit={{ opacity: 0 }}
        transition={{ delay: 0.1 }}
      />
      <ExpandedPurposeItem key={item + 'expand'} layoutId={item}>
        <ExpandedPurposeItemContent>
          <StyledForm>
            <PurposeButtonsContainer
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <PurposeInput
                innerRef={inputref}
                ref={inputref}
                value={value}
                placeholder='Podaj cel wyjazdu'
                onChange={(e) => setValue(e.target.value)}
              />
              <PurposeButton onClick={() => saveItem(value)}>
                <FontAwesomeIcon icon={faSave} />
              </PurposeButton>
              <PurposeButton onClick={closeItem}>
                <FontAwesomeIcon icon={faTimes} />
              </PurposeButton>
            </PurposeButtonsContainer>
          </StyledForm>
        </ExpandedPurposeItemContent>
      </ExpandedPurposeItem>
    </>
  );
};

EditPurposeItem.propTypes = {
  item: PropTypes.string,
  defaultValue: PropTypes.string,
  closeItem: PropTypes.func
};

export default EditPurposeItem;
