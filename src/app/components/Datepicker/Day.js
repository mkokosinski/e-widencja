import React from 'react';
import { DatepickerDay } from './DatepickerStyles';

const Day = ({ day, isSelected, onSelectedDate }) => {
  return (
    <DatepickerDay isOtherMonth={day.isOtherMonth} isSelected={isSelected} onClick={onSelectedDate}>
      {day.label}
    </DatepickerDay>
  );
};
export default Day;
