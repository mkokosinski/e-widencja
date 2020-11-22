import React, { useCallback, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import {
  DatepickerContainer,
  DatepickerContent,
  DatepickerDaysContainer,
  DatepickerDaysNamesContainer,
  DatepickerHeader,
  DatepickerNext,
  DatepickerPrevious,
  DetepickerActiveMonth
} from './DatepickerStyles';

import { useEffect } from 'react';
import { format } from 'date-fns';
import {
  compareDates,
  dateBetween,
  datesAreEqual,
  daysShort,
  months
} from '../../../utils/dateUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import Day from './Day';
import useDetectOutsideClick from '../../../features/hooks/useDetectOutsideClick';
import { AnimatePresence } from 'framer-motion';
import { ModalAnimation } from '../../../utils/animationUtils';

const getDaysCount = (year, month) => new Date(year, month + 1, 0).getDate();

const getPreviousDays = (year, month, count) => {
  const previousDate =
    month === 1 ? new Date(year - 1, 12, 1) : new Date(year, month - 1, 1);

  const previuosDaysCount = getDaysCount(
    previousDate.getFullYear(),
    previousDate.getMonth()
  );

  const previousDays = [];

  for (let i = 0; i < count; i++) {
    previousDays.push({
      label: previuosDaysCount - i,
      isOtherMonth: true,
      date: new Date(
        previousDate.getFullYear(),
        previousDate.getMonth(),
        previuosDaysCount - i
      )
    });
  }
  return previousDays.reverse();
};

const getNextDays = (year, month, count) => {
  const nextDate =
    month === 12 ? new Date(year + 1, 1, 1) : new Date(year, month + 1, 1);

  const nextDays = [];

  for (let i = 1; i <= count; i++) {
    nextDays.push({
      label: i,
      isOtherMonth: true,
      date: new Date(nextDate.getFullYear(), nextDate.getMonth(), i)
    });
  }
  return nextDays;
};

const getCalendarDays = (year, month, firstDayOfWeek) => {
  const daysCount = getDaysCount(year, month);
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const lastDayOfMonth = new Date(year, month + 1, 0).getDay();
  const firstDayOffset = (firstDayOfMonth - firstDayOfWeek + 7) % 7;
  const lastDayOffset = (7 - lastDayOfMonth) % 7;

  const days = [...Array(daysCount + 1).keys()].slice(1).map((day) => ({
    label: day,
    date: new Date(year, month, day)
  }));

  const previousDays = getPreviousDays(year, month, firstDayOffset);
  const nextDays = getNextDays(year, month, lastDayOffset);

  return [...previousDays, ...days, ...nextDays];
};

const useDatepicker = (date, firstDayOfWeek) => {
  const [currentMonth, setCurrentMonth] = useState(date.getMonth());
  const [currentYear, setCurrentYear] = useState(date.getFullYear());
  const [daysLabels, setDaysLabels] = useState([]);
  const [days, setDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(date);

  useEffect(() => {
    const labels = [...daysShort];
    labels.push(...labels.splice(0, firstDayOfWeek));
    setDaysLabels(labels);
  }, [firstDayOfWeek]);

  useEffect(() => {
    const newDays = getCalendarDays(currentYear, currentMonth, firstDayOfWeek);
    setDays(newDays);
  }, [currentMonth, currentYear, firstDayOfWeek]);

  useEffect(() => {
    setCurrentMonth(selectedDate.getMonth());
    setCurrentYear(selectedDate.getFullYear());
  }, [selectedDate]);

  const nextMonth = () => {
    if (currentMonth < 11) {
      setCurrentMonth(currentMonth + 1);
    } else {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    }
  };

  const previousMonth = () => {
    if (currentMonth >= 1) {
      setCurrentMonth(currentMonth - 1);
    } else {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    }
  };

  const onSelectDate = () => {};

  const selectDate = (date) => {
    setSelectedDate(date);
  };

  return {
    days,
    daysLabels,
    selectedDate,
    currentMonth,
    currentYear,
    nextMonth,
    previousMonth,
    onSelectDate,
    selectDate
  };
};

const Calendar = (props) => {
  const {
    currentMonth,
    currentYear,
    closeDatepicker,
    days,
    daysLabels,
    isRange,
    minDate,
    maxDate,
    endDate,
    startDate,
    rangeStart,
    rangeEnd,
    isOpen,
    nextMonth,
    previousMonth,
    selectedDate,
    selectDate
  } = props;

  const datepickerRef = useRef(null);
  useDetectOutsideClick(datepickerRef, closeDatepicker);

  const checkDisable = (date) => {
    if (isRange) {
      if (rangeStart && compareDates(date, endDate) === 1) {
        return true;
      }

      if (rangeEnd && compareDates(date, startDate) === -1) {
        return true;
      }
    }

    if (minDate && compareDates(date, minDate) === -1) {
      return true;
    }

    if (maxDate && compareDates(date, maxDate) === 1) {
      return true;
    }

    return false;
  };

  const handelSelect = (date) => {
    selectDate(date);
    closeDatepicker();
  };

  const monthLabel = `${months[currentMonth]} ${currentYear}`;
  return (
    <>
      {!isOpen ? null : (
        <DatepickerContent ref={datepickerRef}>
          <DatepickerHeader>
            <DatepickerPrevious onClick={previousMonth}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </DatepickerPrevious>
            <DetepickerActiveMonth>{monthLabel}</DetepickerActiveMonth>
            <DatepickerNext onClick={nextMonth}>
              <FontAwesomeIcon icon={faChevronRight} />
            </DatepickerNext>
          </DatepickerHeader>

          <DatepickerDaysNamesContainer>
            {daysLabels.map((dayLabel) => (
              <div key={dayLabel}>{dayLabel}</div>
            ))}
          </DatepickerDaysNamesContainer>

          <DatepickerDaysContainer>
            {days.map((day, index) => {
              const isSelected = isRange
                ? datesAreEqual(day.date, startDate) ||
                  datesAreEqual(day.date, endDate)
                : datesAreEqual(day.date, selectedDate);
              const isRanged =
                isRange && dateBetween(day.date, startDate, endDate);

              const isDisabled = checkDisable(day.date);
              return (
                <Day
                  key={day.date + index}
                  selectedDate={selectedDate}
                  day={day}
                  selectDate={() => {
                    if (!isDisabled) {
                      handelSelect(day.date);
                    }
                  }}
                  isSelected={isSelected}
                  isRanged={isRanged}
                  isDisabled={isDisabled}
                />
              );
            })}
          </DatepickerDaysContainer>
        </DatepickerContent>
      )}
    </>
  );
};

export const Datepicker = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);

  const {
    defaultDate = new Date(),
    firstDayOfWeek = 1,
    withPortal = true,
    portalId = 'root',
    customInput: CustomInput,
    dateFormat = 'yyyy-MM-dd',
    onChange,
    isRange,
    minDate,
    maxDate,
    rangeStart,
    rangeEnd,
    readOnly,
    endDate,
    startDate
  } = props;

  const {
    currentMonth,
    currentYear,
    days,
    daysLabels,
    selectedDate,
    nextMonth,
    previousMonth,
    selectDate
  } = useDatepicker(new Date(defaultDate), firstDayOfWeek);

  const dispatchOnClick = useCallback(() => {
    const input = inputRef.current;

    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      'value'
    ).set;

    nativeInputValueSetter.call(input, selectedDate);

    const event = new Event('input', { bubbles: true });
    input.dispatchEvent(event);
  }, [selectedDate]);

  const openDatepicker = () => {
    setIsOpen(true);
  };

  const closeDatepicker = () => {
    setIsOpen(false);
  };

  const datepickerProps = {
    currentMonth,
    currentYear,
    days,
    daysLabels,
    isRange,
    minDate,
    maxDate,
    rangeStart,
    rangeEnd,
    endDate,
    startDate,
    isOpen,
    selectedDate,
    withPortal,
    closeDatepicker,
    nextMonth,
    previousMonth,
    selectDate
  };

  const inputProps = {
    ...props,
    onFocus: openDatepicker,
    onChange: () => onChange(format(selectedDate, dateFormat)),
    type: 'text',
    autoComplete: 'off',
    value: format(new Date(selectedDate), dateFormat),
    ref: inputRef,
    readOnly
  };

  useEffect(() => {
    dispatchOnClick();
  }, [dispatchOnClick, selectedDate]);

  return (
    <div>
      {CustomInput ? (
        React.cloneElement(CustomInput, inputProps)
      ) : (
        <input {...inputProps} />
      )}
      {withPortal ? (
        ReactDOM.createPortal(
          <AnimatePresence>
            {isOpen && (
              <DatepickerContainer {...ModalAnimation.bg}>
                <Calendar {...datepickerProps} />
              </DatepickerContainer>
            )}
          </AnimatePresence>,
          document.getElementById(portalId)
        )
      ) : (
        <AnimatePresence>
          {isOpen && <Calendar {...datepickerProps} />}
        </AnimatePresence>
      )}
    </div>
  );
};

export default Datepicker;
