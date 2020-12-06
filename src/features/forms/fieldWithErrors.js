import React from 'react';
import { ErrorContainer, FormField, Label, StyledError } from './FormsStyles';
import { ErrorMessage, useFormikContext, getIn } from 'formik';

const FieldWithErrors = React.forwardRef((props, ref) => {
  const { children, label, name, onFocus, scrollFocused } = props;

  const context = useFormikContext();

  const errors = getIn(context.errors, name);
  const isTouched = getIn(context.touched, name);

  const hasError = isTouched && errors;

  const handleFocus = () => {
    if (scrollFocused) {
      const focused = document.activeElement;
      const labelHeight = 26;
      const pos = focused.getBoundingClientRect();

      setTimeout(() => {
        window.scrollBy({
          top: pos.y - labelHeight,
          behavior: 'smooth',
          align: 'top'
        });
      }, 200);
    }

    onFocus && onFocus();
  };

  return (
    <FormField>
      <Label htmlFor={name}>{label}</Label>

      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          name,
          id: name,
          haserror: hasError,
          onFocus: handleFocus,
          ref
        })
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
