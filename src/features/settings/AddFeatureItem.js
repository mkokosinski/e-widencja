import React from 'react';
import PropTypes from 'prop-types';
import {
  FeatureItemButton,
  FeatureItemButtonsContainer,
  FeatureItemContainer,
  FeatureItemsTitle,
  StyledFeatureItem,
} from './SettingsStyles';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import EditFeatureItem from './EditFeatureItem';
import { v4 as uid } from 'uuid';

const AddFeatureItem = ({ addItem }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleSelect = (value) => {
    setIsSelected(value);
  };

  const closeItem = () => {
    handleSelect(false);
  };

  const handleSave = (value) => {
    const { name } = value;
    addItem({ id: uid(), name });
  };

  const item = { id: 'new', name: 'Nowy' };
  return (
    <FeatureItemContainer>
      <AnimateSharedLayout type='crossfade'>
        <AnimatePresence exitBeforeEnter>
          {isSelected && (
            <EditFeatureItem
              key={item.id}
              item={item}
              saveItem={handleSave}
              closeItem={closeItem}
            />
          )}
        </AnimatePresence>

        <>
          <StyledFeatureItem key={item.id} layoutId={item.id} isAdd={true}>
            <FeatureItemsTitle
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {item.name}
            </FeatureItemsTitle>

            <FeatureItemButtonsContainer
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <FeatureItemButton onClick={() => handleSelect(true)}>
                <FontAwesomeIcon icon={faPlus} />
              </FeatureItemButton>
            </FeatureItemButtonsContainer>
          </StyledFeatureItem>
        </>
      </AnimateSharedLayout>
    </FeatureItemContainer>
  );
};

AddFeatureItem.propTypes = {
  addItem: PropTypes.func,
};

export default AddFeatureItem;
