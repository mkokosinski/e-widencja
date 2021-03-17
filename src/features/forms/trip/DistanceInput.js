import { useField, useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import { number } from 'yup';
import { Input } from '../FormsStyles';

const DistanceInput = (props) => {
  const [value, setValue] = useState(0);

  const {
    values: { stops },
    touched,
    initialValues,
    setFieldValue,
  } = useFormikContext();
  const [field] = useField(props);

  useEffect(() => {
    const newStops = [...stops];

    newStops[props.index] = {
      ...newStops[props.index],
      distance: value,
    };

    for (let i = 0; i < newStops.length; i++) {
      const s = newStops[i];
      const pre = i !== 0 ? newStops[i - 1].mileage : initialValues.initMileage;
      const newMileage = parseFloat(pre + s.distance);
      newStops[i] = {
        ...s,
        mileage: newMileage,
      };
    }

    setFieldValue('stops', newStops);
  }, [initialValues.initMileage, setFieldValue, value, stops.length]);

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

export default DistanceInput;
