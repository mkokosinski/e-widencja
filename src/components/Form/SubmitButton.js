import React from 'react';
import PropTypes from 'prop-types';
import { ButtonMain } from '../../features/layout/LayoutStyles';
import { useFormikContext } from 'formik';
import { LoaderSpinner } from '../../features/loading/LoadingStyles';

const SubmitButton = (props) => {
  const { dirty, isSubmitting } = useFormikContext();
  return isSubmitting ? (
    <ButtonMain type='button'>
      <LoaderSpinner height='20px' width='20px' color='white' />
    </ButtonMain>
  ) : (
    <ButtonMain type='submit' disabled={!dirty} {...props}>
      {props.children}
    </ButtonMain>
  );
};

SubmitButton.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  type: PropTypes.string,
};

export default SubmitButton;
