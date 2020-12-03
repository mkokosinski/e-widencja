import { useField, useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import { number } from 'yup';
import { Input } from '../FormsStyles';

const MilageInput = (props) => {
  const [value, setValue] = useState(0);

  const {
    values: { stops },
    touched,
    initialValues,
    setFieldValue
  } = useFormikContext();
  const [field] = useField(props);

  useEffect(() => {
    const newStops = [...stops];

    newStops[props.index] = {
      ...newStops[props.index],
      mileage: value
    };

    for (let i = 0; i < newStops.length; i++) {
      const s = newStops[i];
      const pre = i !== 0 ? newStops[i - 1].mileage : initialValues.initMileage;

      const newDistance = parseFloat(s.mileage - pre)

      if (i === props.index) {
        newStops[i] = {
          ...s,
          distance: newDistance
        };
      } else {
        newStops[i] = {
          ...s,
          mileage: pre + s.distance
        };
      }
    }

    setFieldValue('stops', newStops);
  }, [initialValues.initMileage, setFieldValue, value]);

  return (
    <>
      <Input
        {...props}
        {...field}
        onChange={(e) => {
          const val = Number.parseInt(e.target.value);
          setValue(val);
        }}
      />
    </>
  );
};

export default MilageInput;
