import React from "react";
import { StyledCheckbox, Label, StyledError } from "./FormsStyles";
import { Field, ErrorMessage } from "formik";

const FieldWithErrors = ({ label, name }) => {
  return (
    <StyledCheckbox>
      <Label>
        <Field name={name} type="checkbox" />
        {label}
      </Label>

      <ErrorMessage name={name}>
        {(msg) => <StyledError>{msg}</StyledError>}
      </ErrorMessage>
    </StyledCheckbox>
  );
};

export default FieldWithErrors;
