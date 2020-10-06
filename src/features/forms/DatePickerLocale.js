import React, { useEffect, useState } from 'react';

import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import formatLong from 'date-fns/locale/pl/_lib/formatLong/index';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector } from 'react-redux';
import { selectIsLaptop } from '../layout/layoutSlice';

export const months = [
  'Styczeń',
  'Luty',
  'Marzec',
  'Kwiecień',
  'Maj',
  'Czerwiec',
  'Lipiec',
  'Sierpień',
  'Wrzesień',
  'Październik',
  'Listopad',
  'Grudzień',
];
const days = ['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So'];

export const locale = {
  pl,
  localize: {
    day: (n) => days[n],
    month: (n) => months[n],
  },
  options: {
    weekStartsOn: 1,
  },
  formatLong,
};

const DatepickerLocale = (props) => {
  const { initialValue, customInput, onChange } = props;

  const [startDate, setStartDate] = useState(new Date());
  const isLaptop = useSelector(selectIsLaptop);

  useEffect(() => {
    if (initialValue) {
      setStartDate(new Date(initialValue));
    }
  }, []);
  
  return (
    <DatePicker
      selected={startDate}
      dateFormat='yyyy-MM-dd'
      locale={locale}
      withPortal={!isLaptop}
      customInput={customInput}
      {...props}
        onChange={(val) => {
          setStartDate(val);
          onChange && onChange(val);
        }}
    />
  );
};

export default DatepickerLocale;
