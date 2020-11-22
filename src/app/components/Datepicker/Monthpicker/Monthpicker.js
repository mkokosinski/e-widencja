import {
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useCallback, useEffect, useState } from 'react';
import { useRef } from 'react';
import ReactDOM from 'react-dom';
import useDetectOutsideClick from '../../../../features/hooks/useDetectOutsideClick';
import { ModalAnimation } from '../../../../utils/animationUtils';
import {
  months as monthsNames,
  datesAreEqual,
  dateBetween,
  compareDates
} from '../../../../utils/dateUtils';

import {
  DatepickerContainer,
  DatepickerContent,
  DatepickerHeader,
  DatepickerNext,
  DatepickerPrevious,
  DetepickerActiveMonth,
  MonthpickerMonthsContainer
} from '../DatepickerStyles';
import Month from './Month';

const useMonthpicker = (date) => {
  const [currentYear, setCurrentYear] = useState(date.getFullYear());
  const [selectedDate, setSelectedDate] = useState(date);
  const [months, setMonths] = useState([]);

  useEffect(() => {
    const monthsItems = monthsNames.map((month, index) => ({
      label: month,
      date: new Date(currentYear, index, 1)
    }));

    setMonths(monthsItems);
  }, [currentYear]);

  const nextYear = () => {
    setCurrentYear(currentYear + 1);
  };
  const previousYear = () => {
    setCurrentYear(currentYear - 1);
  };

  const selectDate = (date) => {
    setSelectedDate(new Date(date));
  };

  return {
    currentYear,
    months,
    selectedDate,
    nextYear,
    previousYear,
    selectDate
  };
};

const MonthpickerComponent = (props) => {
  const {
    currentYear,
    endDate,
    months,
    isRange,
    minDate,
    maxDate,
    rangeStart,
    rangeEnd,
    selectedDate,
    startDate,
    closeDatepicker,
    nextYear,
    previousYear,
    selectDate
  } = props;

  const handelSelect = (date) => {
    selectDate(date);
    closeDatepicker();
  };

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

  const datepickerRef = useRef(null);
  useDetectOutsideClick(datepickerRef, closeDatepicker);

  return (
    <DatepickerContent ref={datepickerRef} {...ModalAnimation.content}>
      <DatepickerHeader>
        <DatepickerPrevious onClick={previousYear}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </DatepickerPrevious>
        <DetepickerActiveMonth>{currentYear}</DetepickerActiveMonth>
        <DatepickerNext onClick={nextYear}>
          <FontAwesomeIcon icon={faChevronRight} />
        </DatepickerNext>
      </DatepickerHeader>
      <MonthpickerMonthsContainer>
        {months.map((month, index) => {
          const isSelected = isRange
            ? datesAreEqual(month.date, startDate) ||
              datesAreEqual(month.date, endDate)
            : datesAreEqual(month.date, selectedDate);
          const isRanged =
            isRange && dateBetween(month.date, startDate, endDate);

          const isDisabled = checkDisable(month.date);

          return (
            <Month
              month={month}
              key={month.date + index}
              selectDate={() => {
                if (!isDisabled) {
                  handelSelect(month.date);
                }
              }}
              isSelected={isSelected}
              isRanged={isRanged}
              isDisabled={isDisabled}
              selectedDate={selectedDate}
            />
          );
        })}
      </MonthpickerMonthsContainer>
    </DatepickerContent>
  );
};

export const Monthpicker = (props) => {
  const {
    defaultDate = new Date(),
    withPortal = false,
    portalId = 'root',
    customInput: CustomInput,
    dateFormat = 'yyyy-MM',
    onChange = () => {},
    minDate,
    maxDate,
    isRange,
    rangeStart,
    rangeEnd,
    readOnly,
    startDate,
    endDate
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);

  const {
    currentYear,
    selectedDate,
    months,
    nextYear,
    previousYear,
    selectDate
  } = useMonthpicker(new Date(defaultDate));

  const dispatchOnClick = useCallback(() => {
    const input = inputRef.current;
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      'value'
    ).set;
    nativeInputValueSetter.call(input, 'selectedDate');
    const event = new Event('input', { bubbles: true });
    input.dispatchEvent(event);
  }, []);

  useEffect(() => {
    dispatchOnClick();
  }, [dispatchOnClick, selectedDate]);

  const openDatepicker = () => {
    setIsOpen(true);
  };

  const closeDatepicker = () => {
    setIsOpen(false);
  };

  const monthpickerProps = {
    currentYear,
    months,
    isOpen,
    isRange,
    rangeStart,
    rangeEnd,
    minDate,
    maxDate,
    endDate,
    startDate,
    selectedDate,
    closeDatepicker,
    nextYear,
    previousYear,
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

  return (
    <div>
      {CustomInput ? (
        React.cloneElement(CustomInput, inputProps)
      ) : (
        <input type='text' {...inputProps} readOnly />
      )}

      {withPortal ? (
        ReactDOM.createPortal(
          <AnimatePresence>
            {isOpen && (
              <DatepickerContainer {...ModalAnimation.bg}>
                <MonthpickerComponent {...monthpickerProps} />
              </DatepickerContainer>
            )}
          </AnimatePresence>,
          document.getElementById(portalId)
        )
      ) : (
        <AnimatePresence>
          {isOpen && <MonthpickerComponent {...monthpickerProps} />}
        </AnimatePresence>
      )}
    </div>
  );
};

export default Monthpicker;
