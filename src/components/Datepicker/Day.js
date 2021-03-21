import React from 'react';
import { DatepickerDay } from './DatepickerStyles';

const Day = ({ day, isSelected, isRanged, isDisabled, selectDate }) => {
  return (
    <DatepickerDay
      isOtherMonth={day.isOtherMonth}
      isSelected={isSelected}
      onClick={selectDate}
      isRanged={isRanged}
      isDisabled={isDisabled}
    >
      {day.label}
    </DatepickerDay>
  );
};
export default Day;
