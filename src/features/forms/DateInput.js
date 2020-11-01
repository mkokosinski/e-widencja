import React, { useEffect, useRef } from 'react';
import { Input } from './FormsStyles';

import DatePicker from 'react-datepicker';
import { locale } from '../../utils/dateUtils';
import { useSelector } from 'react-redux';
import { selectIsLaptop } from '../layout/layoutSlice';

import 'react-datepicker/dist/react-datepicker.css';


const ReadOnlyInput = ({ value, onClick }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.readOnly = true;
    }
  });
  return <Input value={value} onClick={onClick} ref={inputRef} />;
};

const DateInput = (props) => {
  const isLaptop = useSelector(selectIsLaptop);

  return (
    <DatePicker
      {...props}
      customInput={isLaptop ? <Input /> : <ReadOnlyInput />}
      locale={locale}
      withPortal={!isLaptop}
    />
  );
};

export default DateInput;
