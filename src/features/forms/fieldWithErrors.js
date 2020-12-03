import React from 'react';
import { ErrorContainer, FormField, Label, StyledError } from './FormsStyles';
import { ErrorMessage, useFormikContext, getIn } from 'formik';

const FieldWithErrors = React.forwardRef(
  ({ children, label, name }, ref) => {
    const context = useFormikContext();

    const errors = getIn(context.errors, name);
    const isTouched = getIn(context.touched, name);

    const hasError = isTouched && errors;

    return (
      <FormField>
        <Label htmlFor={name}>{label}</Label>

        {React.Children.map(children, (child) =>
          React.cloneElement(child, {
            name,
            id: name,
            haserror: hasError,
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
  }
);

export default FieldWithErrors;
