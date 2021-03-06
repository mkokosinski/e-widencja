import React from 'react';
import { useSelector } from 'react-redux';

import { ErrorMessage, useFormikContext, getIn } from 'formik';

import { selectIsMobile } from '../../features/layout/layoutSlice';
import { INPUT_SIZE } from '../../utils/constants';

import { ErrorContainer, FormField, Label, StyledError } from './FormsStyles';

const FieldWithErrors = React.forwardRef((props, ref) => {
  const {
    children,
    label,
    name,
    size = INPUT_SIZE.NORMAL,
    onFocus,
    scrollFocused,
  } = props;

  const context = useFormikContext();
  const isMobile = useSelector(selectIsMobile);
  const errors = getIn(context.errors, name);
  const isTouched = getIn(context.touched, name);

  const hasError = isTouched && errors;

  const handleFocus = () => {
    if (scrollFocused && isMobile) {
      const focused = document.activeElement;
      const labelHeight = 26;
      const pos = focused.getBoundingClientRect();

      setTimeout(() => {
        window.scrollTo({
          top: pos.top - labelHeight + window.scrollY,
          behavior: 'smooth',
          align: 'top',
        });
      }, 100);
    }

    onFocus && onFocus();
  };

  return (
    <FormField size={size}>
      <Label htmlFor={name}>{label}</Label>

      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          name,
          id: name,
          haserror: hasError,
          onFocus: handleFocus,
          ref,
        }),
      )}

      <ErrorContainer>
        <ErrorMessage name={name}>
          {(msg) => <StyledError>{msg}</StyledError>}
        </ErrorMessage>
      </ErrorContainer>
    </FormField>
  );
});

export default FieldWithErrors;
