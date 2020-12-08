import { useField, useFormikContext } from 'formik';
import React, { useEffect } from 'react';
import { StyledField } from './FormsStyles';

const skipedProps = ['triggerField', 'triggerValue'];

export const DepentetInput = (props) => {
  const { triggerField, triggerValue = 'value', name } = props;
  const inputProps = Object.keys(props)
    .filter((key) => !skipedProps.includes(key))
    .reduce(
      (obj, key) => ({
        ...obj,
        [key]: props[key]
      }),
      {}
    );

  const { values, touched, setFieldValue } = useFormikContext();

  useEffect(() => {
    const trigField = values[triggerField];
    const trigTouched = touched[triggerField];
    if (trigTouched) {
      const trigValue = trigField[triggerValue];
      setFieldValue(name, trigValue);
    }
  }, [name, setFieldValue, touched, triggerField, triggerValue, values]);

  return <StyledField {...inputProps} />;
};
