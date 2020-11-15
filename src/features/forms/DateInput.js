import React, { useEffect, useRef } from 'react';
import { Input, inputStyle } from './FormsStyles';

import { useSelector } from 'react-redux';
import { selectIsLaptop } from '../layout/layoutSlice';

import Datepicker from '../../app/components/Datepicker/Datepicker';
import Monthpicker from '../../app/components/Datepicker/Monthpicker/Monthpicker';

export const DATEPICKER_TYPES = {
  daypicker: 'daypicker',
  monthpicker: 'monthpicker'
};

const DateInput = (props) => {
  const { type = DATEPICKER_TYPES.daypicker } = props;
  const isLaptop = useSelector(selectIsLaptop);
  let Component = null;

  switch (type) {
    case DATEPICKER_TYPES.daypicker:
      Component = (
        <Datepicker {...props} customInput={<Input />} withPortal={true} />
      );
      break;
    case DATEPICKER_TYPES.monthpicker:
      Component = (
        <Monthpicker {...props} customInput={<Input />} withPortal={true} />
      );
      break;

    default:
      break;
  }

  return Component;
};

export default DateInput;
