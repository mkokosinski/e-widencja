import React, { useState } from 'react';
import { useDatepicker, START_DATE } from '@datepicker-react/hooks';
import { jsx } from '@emotion/core';
import Month from './Month';
import { DatepickerContainer } from './DatepickerStyles';

const datepickerContextDefaultValue = {
  focusedDate: null,
  isDateFocused: () => false,
  isDateSelected: () => false,
  isDateHovered: () => false,
  isDateBlocked: () => false,
  isFirstOrLastSelectedDate: () => false,
  onDateFocus: () => {},
  onDateHover: () => {},
  onDateSelect: () => {}
};

export const DatepickerContext = React.createContext(
  datepickerContextDefaultValue
);

const Datepicker = () => {
  const [state, setState] = useState({
    startDate: null,
    endDate: null,
    focusedInput: START_DATE
  });

  const handleDateChange = (data) => {
    if (!data.focusedInput) {
      setState({ ...data, focusedInput: START_DATE });
    } else {
      setState(data);
    }
  };

  const {
    firstDayOfWeek,
    activeMonths,
    isDateSelected,
    isDateHovered,
    isFirstOrLastSelectedDate,
    isDateBlocked,
    isDateFocused,
    focusedDate,
    onDateHover,
    onDateSelect,
    onDateFocus,
    goToPreviousMonths,
    goToNextMonths
  } = useDatepicker({
    startDate: state.startDate,
    endDate: state.endDate,
    focusedInput: state.focusedInput,
    onDatesChange: handleDateChange,
    numberOfMonths: 1
  });

  return (
    <DatepickerContext.Provider
      value={{
        focusedDate,
        isDateFocused,
        isDateSelected,
        isDateHovered,
        isDateBlocked,
        isFirstOrLastSelectedDate,
        onDateSelect,
        onDateFocus,
        onDateHover
      }}
    >
      <div>
        <strong>Focused input: </strong>
        {state.focusedInput}
      </div>
      <div>
        <strong>Start date: </strong>
        {state.startDate && state.startDate.toLocaleString()}
      </div>
      <div>
        <strong>End date: </strong>
        {state.endDate && state.endDate.toLocaleString()}
      </div>
      <DatepickerContainer>
        <button onClick={goToPreviousMonths}>Previous</button>
        <button onClick={goToNextMonths}>Next</button>
        <div
          css={{
            display: 'grid',
            margin: '32px 0 0',
            gridTemplateColumns: `repeat(${activeMonths.length}, 300px)`,
            gridGap: '0 64px'
          }}
        >
          {activeMonths.map((month) => (
            <Month
              key={`${month.year}-${month.month}`}
              year={month.year}
              month={month.month}
              firstDayOfWeek={firstDayOfWeek}
            />
          ))}
        </div>
      </DatepickerContainer>
    </DatepickerContext.Provider>
  );
};

export default Datepicker;
