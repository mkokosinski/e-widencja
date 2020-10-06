import React, { useState } from 'react';
import { StyledField } from './FormsStyles';
import { format } from 'date-fns';

import DatePicker from './DatePickerLocale';

const DateInput = React.forwardRef(
  ({ name, setFieldTouched, setFieldValue, focusOn, initialValue }, ref) => {

    return (
      <DatePicker
        onChange={(value) => {
          const date = format(value, 'yyyy-MM-dd');
          setFieldTouched(name);
          setFieldValue(name, date);
          focusOn();
        }}
        minDate={new Date()}
        customInput={<StyledField ref={ref} />}
      />
    );
  }
);

export default DateInput;
