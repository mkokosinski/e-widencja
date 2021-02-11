import React from 'react';
import PropTypes from 'prop-types';
import {
  ExpandedPurposeItem,
  ExpandedPurposeItemContent,
  PurposeButton,
  PurposeButtonsContainer,
  PurposeItemContainer,
  PurposeTitle,
  StyledPurposeItem
} from './SettingsStyles';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import EditPurposeItem from './EditPurposeItem';
import { useFormikContext } from 'formik';

const AddPurposeItem = (props) => {
  const [isSelected, setIsSelected] = useState(false);
  const { setValues, values } = useFormikContext();

  const handleSelect = (value) => {
    setIsSelected(value);
  };

  const closeItem = () => {
    handleSelect(false);
  };

  const handleSave = (value) => {
    const { purposes } = values;
    closeItem();
    setValues({ purposes: [...purposes, value] });
  };

  const item = 'Nowy';
  return (
    <PurposeItemContainer>
      <AnimateSharedLayout type='crossfade'>
        <AnimatePresence exitBeforeEnter>
          {isSelected ? (
            <EditPurposeItem
              key={item}
              item={item}
              saveItem={handleSave}
              closeItem={closeItem}
            />
          ) : (
            <>
              <StyledPurposeItem key={item} layoutId={item} isAdd={true}>
                <PurposeTitle initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {item}
                </PurposeTitle>

                <PurposeButtonsContainer
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <PurposeButton onClick={() => handleSelect(true)}>
                    <FontAwesomeIcon icon={faPlus} />
                  </PurposeButton>
                </PurposeButtonsContainer>
              </StyledPurposeItem>
            </>
          )}
        </AnimatePresence>
      </AnimateSharedLayout>
    </PurposeItemContainer>
  );
};

AddPurposeItem.propTypes = {
  isSelected: PropTypes.bool,
  handleSelect: PropTypes.func
};

export default AddPurposeItem;
