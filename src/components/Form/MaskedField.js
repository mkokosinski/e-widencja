import React from 'react';
import PropTypes from 'prop-types';
import { StyledMaskedInput } from './FormsStyles';
import { useField } from 'formik';

const MaskedField = (props) => {
  const [field] = useField(props.name);
  return <StyledMaskedInput type='text' {...props} {...field} />;
};

MaskedField.defaultProps = {
  autoComplete: 'on',
  disabled: false,
};

MaskedField.propTypes = {
  autoComplete: PropTypes.oneOf(['on', 'off']),
  disabled: PropTypes.bool,
  mask: PropTypes.string,
  maxLength: PropTypes.number,
  name: PropTypes.string,
  placeholder: PropTypes.string,
};

export default MaskedField;
