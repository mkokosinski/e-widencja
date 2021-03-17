import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PurposeItem from './FeatureItem';

import { FeatureItemsContainer } from './SettingsStyles';
import AddFeatureItem from './AddFeatureItem';
import { useDispatch } from 'react-redux';

const FeatureItems = ({ items, addItem, editItem, deleteItem }) => {
  const [selected, setSelected] = useState(null);
  const dispatch = useDispatch();

  const handleSelect = (item) => {
    setSelected(item);
  };

  const handleAdd = (item) => {
    dispatch(addItem(item));
  };

  const handleEdit = (item) => {
    dispatch(editItem(item));
  };

  const handleDelete = (item) => {
    dispatch(deleteItem(item));
  };

  return (
    <FeatureItemsContainer>
      {items.map((item) => (
        <PurposeItem
          key={item.id}
          item={item}
          handleSelect={handleSelect}
          saveItem={handleEdit}
          deleteItem={handleDelete}
          isSelected={selected === item.id}
        />
      ))}
      <AddFeatureItem addItem={handleAdd} />
    </FeatureItemsContainer>
  );
};

FeatureItems.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
  ),
  addItem: PropTypes.func,
  editItem: PropTypes.func,
  deleteItem: PropTypes.func,
};

export default FeatureItems;
