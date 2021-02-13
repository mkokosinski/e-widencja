import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
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
import { v4 as uid } from 'uuid';
import { useDispatch } from 'react-redux';
import { addPurpose, editPurpose } from './settingsSlice';
import { ThemeContext } from 'styled-components';

const AddPurposeItem = (props) => {
  const [isSelected, setIsSelected] = useState(false);

  const dispatch = useDispatch();

  const handleSelect = (value) => {
    setIsSelected(value);
  };

  const closeItem = () => {
    handleSelect(false);
  };

  const handleSave = (value) => {
    const { name } = value;
    dispatch(addPurpose({ id: uid(), name }));
  };

  const item = { id: 'new', name: 'Nowy' };
  return (
    <PurposeItemContainer>
      <AnimateSharedLayout type='crossfade'>
        <AnimatePresence exitBeforeEnter>
          {isSelected && (
            <EditPurposeItem
              key={item.id}
              item={item}
              saveItem={handleSave}
              closeItem={closeItem}
            />
          )}
        </AnimatePresence>

        <>
          <StyledPurposeItem key={item.id} layoutId={item.id} isAdd={true}>
            <PurposeTitle initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {item.name}
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
      </AnimateSharedLayout>
    </PurposeItemContainer>
  );
};

AddPurposeItem.propTypes = {
  isSelected: PropTypes.bool,
  handleSelect: PropTypes.func
};

export default AddPurposeItem;
