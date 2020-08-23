import React from 'react';
import { FormField, Label, StyledError } from './FormsStyles';
import { ErrorMessage, useFormikContext, getIn } from 'formik';

const FieldWithErrors = ({ children, label, name }) => {
  const context = useFormikContext();

  const errors = getIn(context.errors, name);
  const isTouched = getIn(context.touched, name);

  const hasError = isTouched && errors;

  return (
    <FormField>
      <Label htmlFor={name}>{label}</Label>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { name, hasError })
      )}
      <ErrorMessage name={name}>
        {(msg) => <StyledError>{msg}</StyledError>}
      </ErrorMessage>
    </FormField>
  );
};

export default FieldWithErrors;
