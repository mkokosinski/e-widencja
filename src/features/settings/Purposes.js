import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import PurposeItem from './PurposeItem';

import {
  ExpandedPurposeItem,
  ExpandedPurposeItemContent,
  PurposeButton,
  PurposesContainer,
  PurposeTitle,
  StyledPurposeItem
} from './SettingsStyles';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimateSharedLayout } from 'framer-motion';
import { Centered } from '../../AppStyles';
import { StyledField } from '../forms/FormsStyles';

const Purposes = ({ items }) => {
  const [selected, setSelected] = useState(null);

  const handleSelect = (item) => {
    setSelected(item);
  };

  const purposes = [...items];

  return (
    <PurposesContainer>
      {items.map((item) => (
        <PurposeItem
          item={item}
          handleSelect={handleSelect}
          isSelected={selected === item}
        />
      ))}
      <StyledPurposeItem isAdd={true} onClick={() => handleSelect('newItem')}>
        <PurposeTitle>Dodaj</PurposeTitle>

        <PurposeButton>
          <FontAwesomeIcon icon={faPlus} />
        </PurposeButton>
      </StyledPurposeItem>
    </PurposesContainer>
  );
};

Purposes.propTypes = {
  items: PropTypes.arrayOf({})
};

export default Purposes;
