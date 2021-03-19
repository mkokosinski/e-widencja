import { useField, useFormikContext } from 'formik';
import React, { useCallback } from 'react';
import { Input } from '../FormsStyles';

const DistanceInput = (props) => {
  // const [value, setValue] = useState(0);

  const {
    values: { stops, record },
    setFieldValue,
  } = useFormikContext();
  const [field] = useField(props);

  const handleChange = useCallback(
    (value) => {
      const newStops = stops.reduce((acc, cur, i) => {
        const previousMileage = acc[i - 1]?.mileage || record?.mileage || 0;

        if (props.index === i) {
          return [
            ...acc,
            { ...cur, distance: value, mileage: value + previousMileage },
          ];
        }

        return [...acc, { ...cur, mileage: previousMileage + cur.distance }];
      }, []);

      setFieldValue('stops', newStops);
    },
    [props],
  );

  return (
    <>
      <Input
        {...props}
        {...field}
        onChange={(e) => {
          const val = parseInt(e.target.value);
          handleChange(val);
        }}
      />
    </>
  );
};

export default DistanceInput;
