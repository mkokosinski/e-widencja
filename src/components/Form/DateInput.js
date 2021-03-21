import React from 'react';
import { Input } from './FormsStyles';

import Datepicker from '../..//components/Datepicker/Datepicker';
import Monthpicker from '../..//components/Datepicker/Monthpicker/Monthpicker';

export const DATEPICKER_TYPES = {
  daypicker: 'daypicker',
  monthpicker: 'monthpicker',
};

const DateInput = (props) => {
  const { type = DATEPICKER_TYPES.daypicker } = props;
  let Component = null;

  switch (type) {
    case DATEPICKER_TYPES.daypicker:
      Component = (
        <Datepicker
          {...props}
          customInput={<Input />}
          withPortal={true}
          readOnly
        />
      );
      break;
    case DATEPICKER_TYPES.monthpicker:
      Component = (
        <Monthpicker
          {...props}
          customInput={<Input />}
          withPortal={true}
          readOnly
        />
      );
      break;

    default:
      break;
  }

  return Component;
};

export default DateInput;
