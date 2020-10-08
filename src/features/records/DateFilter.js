import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import DatePicker from 'react-datepicker';

import { locale } from '../forms/DatePickerLocale';

import { selectIsLaptop } from '../layout/layoutSlice';

import { Input } from '../forms/FormsStyles';
import { setDateFilter } from './recordsSlice';

const DateFilter = () => {
  const [startDate, setStartDate] = useState(()=>new Date('2020-01-02'));
  const [endDate, setEndDate] = useState(()=>new Date('2020-01-02'));
  const isLaptop = useSelector(selectIsLaptop);
  const dispatch = useDispatch();

  return (
    <>
      <DatePicker
        selected={startDate}
        dateFormat='yyyy-MM'
        locale={locale}
        withPortal={!isLaptop}
        customInput={<Input />}
        onChange={(date) => {
          setStartDate(date);
          dispatch(setDateFilter({ from: date.toLocaleDateString() }));
        }}
      
        selectsStart
        showMonthYearPicker
      />
      <DatePicker
        selected={endDate}
        dateFormat='yyyy-MM'
        locale={locale}
        withPortal={!isLaptop}
        customInput={<Input />}
        onChange={(date) => {
          setEndDate(date);
          dispatch(setDateFilter({ to: date.toLocaleDateString() }));
        }}
      
        selectsEnd
        showMonthYearPicker
      />
    </>
  );
};

export default DateFilter;
