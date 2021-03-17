import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  ExpandedItemOverlay,
  ExpandedFeatureItem,
  ExpandedItemContent,
  FeatureItemButton,
  FeatureItemButtonsContainer,
  FeatureItemInput,
  FeatureItemInputContainer,
} from './SettingsStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';

const EditFeatureItem = ({ item, defaultValue, saveItem, closeItem }) => {
  const [value, setValue] = useState(defaultValue || '');
  const inputref = useRef(null);

  const handleSave = () => {
    if (defaultValue !== value) {
      saveItem({ id: item.id, name: value });
    }

    closeItem();
  };

  const keysBinding = ({ keyCode }) => {
    switch (keyCode) {
      case 13:
        handleSave();
        break;

      default:
        break;
    }
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
      <ExpandedFeatureItem key={item.id} layoutId={item.id}>
        <ExpandedItemContent>
          <FeatureItemInputContainer>
            <FeatureItemInput
              innerRef={inputref}
              ref={inputref}
              value={value}
              scrollFocused
              placeholder='Podaj cel wyjazdu'
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={keysBinding}
            />
          </FeatureItemInputContainer>
          <FeatureItemButtonsContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <FeatureItemButton
              title='Zapisz'
              onClick={handleSave}
              color={'mainSoft'}
            >
              <FontAwesomeIcon icon={faSave} />
            </FeatureItemButton>
            <FeatureItemButton title='Zamknij' onClick={closeItem}>
              <FontAwesomeIcon icon={faTimes} />
            </FeatureItemButton>
          </FeatureItemButtonsContainer>
        </ExpandedItemContent>
      </ExpandedFeatureItem>
    </>
  );
};

EditFeatureItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  defaultValue: PropTypes.string,
  closeItem: PropTypes.func.isRequired,
};

export default EditFeatureItem;
