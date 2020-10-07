import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { selectIsLaptop } from '../layout/layoutSlice';

import { locale } from './DatePickerLocale';
import DatePicker from 'react-datepicker';

const DatePickerRange = (props) => {
  const { from, to, customInput, onChange } = props;

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const isLaptop = useSelector(selectIsLaptop);

  useEffect(() => {
    if (from) {
      setStartDate(new Date(from));
    }
    if (to) {
      setEndDate(new Date(to));
    }
  }, []);

  return (
    <>
      <DatePicker
        selected={startDate}
        dateFormat='yyyy-MM-dd'
        locale={locale}
        withPortal={!isLaptop}
        customInput={customInput}
        startDate={startDate}
        endDate={endDate}
        onChange={(date) => {
          setStartDate(date);
          onChange({ from: date, to: endDate });
        }}
        selectsStart
        showMonthYearPicker
      />
      <DatePicker
        selected={endDate}
        dateFormat='yyyy-MM-dd'
        locale={locale}
        withPortal={!isLaptop}
        customInput={customInput}
        startDate={startDate}
        endDate={endDate}
        onChange={(date) => {
          setEndDate(date);
          onChange({ from: startDate, to: date });
        }}
        selectsEnd
        showMonthYearPicker
      />
    </>
  );
};

export default DatePickerRange;
