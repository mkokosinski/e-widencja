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
import AddPurposeItem from './AddPurposeItem';

const Purposes = ({ items }) => {
  const [selected, setSelected] = useState(null);

  const handleSelect = (item) => {
    setSelected(item);
  };

  const handleSavePurpose = (values) => {
    console.log(values);
  };

  const purposes = items.reduce(
    (acc, cur, i) => ({
      ...acc,
      [cur]: cur
    }),
    {}
  );

  return (
    <Formik
      initialValues={{
        purposes: [...items]
      }}
      onSubmit={handleSavePurpose}
    >
      {({ values }) => (
        <PurposesContainer>
          {values.purposes.map((item, index) => (
            <PurposeItem
              item={values.purposes[index]}
              index={index}
              handleSelect={handleSelect}
              isSelected={selected === item}
            />
          ))}
          <AddPurposeItem />
        </PurposesContainer>
      )}
    </Formik>
  );
};

Purposes.propTypes = {
  items: PropTypes.arrayOf({})
};

export default Purposes;
