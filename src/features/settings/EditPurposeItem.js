import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  ExpandedItemOverlay,
  ExpandedPurposeItem,
  ExpandedPurposeItemContent,
  PurposeButton,
  PurposeButtonsContainer,
  PurposeInput
} from './SettingsStyles';
import { StyledForm } from '../forms/FormsStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';

const EditPurposeItem = ({ item, defaultValue, saveItem, closeItem }) => {
  const [value, setValue] = useState(defaultValue || '');
  const inputref = useRef(null);

  const handleSave = () => {
    if (defaultValue !== value) {
      saveItem({ id: item.id, name: value });
    }

    closeItem();
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
        exit={{ opacity: 0 }}
        transition={{ delay: 0.1 }}
      />
      <ExpandedPurposeItem key={item.id} layoutId={item.id}>
        <ExpandedPurposeItemContent>
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
            <PurposeButton title='Zapisz' onClick={handleSave}>
              <FontAwesomeIcon icon={faSave} />
            </PurposeButton>
            <PurposeButton title='Zamknij' onClick={closeItem}>
              <FontAwesomeIcon icon={faTimes} />
            </PurposeButton>
          </PurposeButtonsContainer>
        </ExpandedPurposeItemContent>
      </ExpandedPurposeItem>
    </>
  );
};

EditPurposeItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string
  }).isRequired,
  defaultValue: PropTypes.string,
  closeItem: PropTypes.func.isRequired
};

export default EditPurposeItem;
