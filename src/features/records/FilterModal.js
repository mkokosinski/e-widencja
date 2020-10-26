import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { locale } from '../forms/DatePickerLocale';

import { selectIsLaptop } from '../layout/layoutSlice';
import { selectEldestDate, selectFilters, setDateFilter, setVehicleFilter } from './recordsSlice';
import { selectVehicles } from '../vehicles/vehiclesSlice';

import { FilterContainer, SelectContainer } from '../templates/ListView/ListViewStyles';
import { Input } from '../forms/FormsStyles';

const FilterModal = () => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  
  const dispatch = useDispatch();
  const { dateFilter, vehicleFilter } = useSelector(selectFilters);
  const { vehicles } = useSelector(selectVehicles);
  const minDate = useSelector(selectEldestDate);
  const isLaptop = useSelector(selectIsLaptop);


  useEffect(() => {
    if (!startDate) {
      setStartDate(new Date(dateFilter.filter.from));
    }
    if (!endDate) {
      setEndDate(new Date(dateFilter.filter.to));
    }
  }, []);

  const sortItems = [
    { label: 'Wszystkie', value: '0' },
    ...vehicles.map((veh) => ({ label: veh.name, value: veh.id }))
  ];

  return (
      <FilterContainer>
        <SelectContainer>
          <Select
            menuIsOpen
            options={sortItems}
            onChange={(filter) => {
              dispatch(setVehicleFilter(filter));
            }}
            placeholder='Wybierz pojazd'
          />
        </SelectContainer>

        <DatePicker
          selected={startDate}
          dateFormat='yyyy-MM'
          locale={locale}
          withPortal={!isLaptop}
          customInput={<Input />}
          onChange={(date) => {
            setStartDate(date);
            dispatch(setDateFilter({ from: format(date, 'yyyy-MM') }));
          }}
          startDate={startDate}
          endDate={endDate}
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
            dispatch(setDateFilter({ to: format(date, 'yyyy-MM') }));
          }}
          startDate={startDate}
          endDate={endDate}
          selectsEnd
          showMonthYearPicker
        />
      </FilterContainer>
  );
};

export default FilterModal;
