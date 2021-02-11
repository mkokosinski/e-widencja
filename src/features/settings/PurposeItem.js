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
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import EditPurposeItem from './EditPurposeItem';

const PurposeItem = ({ item, handleSelect, isSelected }) => {
  return (
    <PurposeItemContainer>
      <AnimateSharedLayout type='crossfade'>
        <AnimatePresence>
          {isSelected ? (
            <EditPurposeItem
              key={item}
              item={item}
              closeItem={() => handleSelect(null)}
            />
          ) : (
            <>
              <StyledPurposeItem
                key={item}
                layoutId={item}
                isSelected={isSelected}
                // onClick={() => handleSelect(item)}
              >
                <PurposeTitle
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  {item}
                </PurposeTitle>
                <PurposeButtonsContainer
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <PurposeButton onClick={() => handleSelect(item)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </PurposeButton>
                  <PurposeButton>
                    <FontAwesomeIcon icon={faTimes} />
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

PurposeItem.propTypes = {
  isSelected: PropTypes.bool,
  handleSelect: PropTypes.func
};

export default PurposeItem;
