import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { selectIsLaptop } from '../layout/layoutSlice';

import { locale } from './DatePickerLocale';
import DatePicker from 'react-datepicker';

const DatePickerRange = (props) => {
  const { customInput } = props;

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const isLaptop = useSelector(selectIsLaptop);

  console.log('render', startDate);

  useEffect(() => {
    console.log('effect', startDate);
  });

  return (
    <>
      <DatePicker
        selected={startDate}
        dateFormat='yyyy-MM'
        locale={locale}
        withPortal={!isLaptop}
        customInput={customInput}
        onChange={(date) => {
          setStartDate(date);

          // onChange({ from: date.toString()});
        }}
        startDate={startDate}
        endDate={endDate}
        selectsStart
        showMonthYearPicker
      />
      <DatePicker
        selected={endDate}
        dateFormat='yyyy-MM'
        locale={locale}
        withPortal={!isLaptop}
        customInput={customInput}
        onChange={(date) => {
          setEndDate(date);
          // onChange({ to: date.toString() });
        }}
        startDate={startDate}
        endDate={endDate}
        selectsEnd
        showMonthYearPicker
      />
    </>
  );
};

export default DatePickerRange;
