import React from 'react';
import { MonthpickerMonth } from '../DatepickerStyles';

const Month = ({ month, isSelected, isRanged, isDisabled, selectDate }) => {
  return (
    <MonthpickerMonth
      onClick={selectDate}
      isSelected={isSelected}
      isRanged={isRanged}
      isDisabled={isDisabled}
    >
      {month.label}
    </MonthpickerMonth>
  );
};

export default Month;
