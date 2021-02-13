import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PurposeItem from './PurposeItem';

import { PurposesContainer, VerticalSpan } from './SettingsStyles';
import AddPurposeItem from './AddPurposeItem';
import { deletePurpose, editPurpose } from './settingsSlice';
import { useDispatch } from 'react-redux';

const Purposes = ({ items }) => {
  const [selected, setSelected] = useState(null);
  const dispatch = useDispatch();

  const handleSelect = (item) => {
    setSelected(item);
  };

  const saveItem = (item) => {
    dispatch(editPurpose(item));
  };

  const deleteItem = (item) => {
    dispatch(deletePurpose(item));
  };

  return (
    <PurposesContainer>
      {items.map((item) => (
        <PurposeItem
          key={item.id}
          item={item}
          handleSelect={handleSelect}
          saveItem={saveItem}
          deleteItem={deleteItem}
          isSelected={selected === item.id}
        />
      ))}
      <AddPurposeItem />
    </PurposesContainer>
  );
};

Purposes.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string
    })
  )
};

export default Purposes;
