import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  PurposeButton,
  PurposeButtonsContainer,
  PurposeItemContainer,
  PurposeTitle,
  StyledPurposeItem
} from './SettingsStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faTimes,
  faTrash,
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import EditPurposeItem from './EditPurposeItem';
import { useDispatch } from 'react-redux';

const PurposeItem = ({
  item,
  handleSelect,
  saveItem,
  deleteItem,
  isSelected
}) => {
  const [changed, setChanged] = useState(false);

  const closeItem = () => {
    handleSelect(null);
  };

  const handleSave = (value) => {
    saveItem(value);
  };

  const handleDelete = () => {
    deleteItem(item);
  };

  return (
    <PurposeItemContainer>
      <AnimateSharedLayout type='crossfade'>
        <AnimatePresence>
          {isSelected ? (
            <EditPurposeItem
              key={item.id}
              item={item}
              defaultValue={item.name}
              saveItem={handleSave}
              closeItem={closeItem}
            />
          ) : (
            <>
              <StyledPurposeItem
                key={item.id}
                layoutId={item.id}
                isSelected={isSelected}
                // onClick={() => handleSelect(item)}
                onLayoutAnimationComplete={() => {
                  console.log('anim end', changed);
                }}
              >
                <PurposeTitle initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {item.name}
                </PurposeTitle>
                <PurposeButtonsContainer
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <PurposeButton
                    title='Edytuj'
                    onClick={() => handleSelect(item.id)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </PurposeButton>
                  <PurposeButton onClick={handleDelete}>
                    <FontAwesomeIcon title='Usuń' icon={faTrash} />
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
  handleSelect: PropTypes.func,
  item: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string
  }),
  saveItem: PropTypes.func,
  deleteItem: PropTypes.func
};

export default PurposeItem;
