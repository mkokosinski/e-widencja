import React from 'react';
import PropTypes from 'prop-types';
import {
  FeatureItemButton,
  FeatureItemButtonsContainer,
  FeatureItemContainer,
  FeatureItemsTitle,
  StyledFeatureItem,
} from './SettingsStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AnimatePresence } from 'framer-motion';
import EditFeatureItem from './EditFeatureItem';

const PurposeItem = ({
  item,
  handleSelect,
  saveItem,
  deleteItem,
  isSelected,
}) => {
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
    <FeatureItemContainer>
      <AnimatePresence>
        {isSelected && (
          <EditFeatureItem
            key={item.id}
            item={item}
            defaultValue={item.name}
            saveItem={handleSave}
            closeItem={closeItem}
          />
        )}
      </AnimatePresence>

      <>
        <StyledFeatureItem
          key={item.id}
          layoutId={item.id}
          isSelected={isSelected}
          // onClick={() => handleSelect(item)}
        >
          <FeatureItemsTitle initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {item.name}
          </FeatureItemsTitle>
          <FeatureItemButtonsContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <FeatureItemButton
              title='Edytuj'
              onClick={() => handleSelect(item.id)}
            >
              <FontAwesomeIcon icon={faEdit} />
            </FeatureItemButton>
            <FeatureItemButton onClick={handleDelete}>
              <FontAwesomeIcon title='Usuń' icon={faTrash} />
            </FeatureItemButton>
          </FeatureItemButtonsContainer>
        </StyledFeatureItem>
      </>
    </FeatureItemContainer>
  );
};

PurposeItem.propTypes = {
  isSelected: PropTypes.bool,
  handleSelect: PropTypes.func,
  item: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
  saveItem: PropTypes.func,
  deleteItem: PropTypes.func,
};

export default PurposeItem;
