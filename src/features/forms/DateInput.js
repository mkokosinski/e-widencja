import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import formatLong from 'date-fns/locale/pl/_lib/formatLong/index';

import { Input } from './FormsStyles';
import { selectIsLaptop } from '../layout/layoutSlice';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const months = [
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

const locale = {
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

const DateInput = React.forwardRef(
  ({ setFieldTouched, setFieldValue, focusOn, initialValue }, ref) => {
    const [startDate, setStartDate] = useState(new Date());
    const isLaptop = useSelector(selectIsLaptop);

    useEffect(()=>{
      if (initialValue) {
        setStartDate(new Date(initialValue))
      }
    },[])

    return (
      <DatePicker
        selected={startDate}
        onChange={(value) => {
          const date = format(value, 'yyyy-MM-dd');
          setStartDate(value);
          setFieldTouched('checkupDate');
          setFieldValue('checkupDate', date);
          focusOn();
        }}
        customInput={<Input />}
        dateFormat='yyyy-MM-dd'
        locale={locale}
        minDate={new Date()}
        withPortal={!isLaptop}
      />
    );
  }
);

export default DateInput;
