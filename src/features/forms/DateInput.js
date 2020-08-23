import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import formatLong from 'date-fns/locale/pl/_lib/formatLong/index';

import { Input } from './FormsStyles';

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

const DateInput = ({ setFieldTouched, setFieldValue }) => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <DatePicker
      selected={startDate}
      onChange={(value) => {
        console.log(value);
        const date = format(value, 'yyyy-MM-dd');
        setStartDate(value);
        setFieldTouched('checkupDate');
        setFieldValue('checkupDate', date);
      }}
      customInput={<Input />}
      dateFormat='yyyy-MM-dd'
      locale={locale}
      minDate={new Date()}
      day
    />
  );
};

export default DateInput;
