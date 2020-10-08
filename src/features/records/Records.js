import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router';

import Select from 'react-select';

import Routing from '../routing/Routing';
import { selectVehicles } from '../vehicles/vehiclesSlice';
import { Input } from '../forms/FormsStyles';
import DatePicker from 'react-datepicker';

import ListViewItem from '../templates/ListView/ListViewItem';
import {
  ButtonAdd,
  TopPanel,
  AddItem,
  ItemsList,
  DatePickerContainer,
  SelectContainer,
  FilterButton
} from '../templates/ListView/ListViewStyles';
import {
  selectRecordsWithVehicles,
  setVehicleFilter,
  selectActiveVehicleFilter,
  selectEldestDate,
  setDateFilter,
  selectFilters
} from './recordsSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faUser,
  faFileAlt,
  faPlusSquare,
  faEdit,
  faBolt,
  faCalendar
} from '@fortawesome/free-solid-svg-icons';
import { useDropdown } from '../hooks/useDropdown';
import { locale } from '../forms/DatePickerLocale';
import { selectIsLaptop } from '../layout/layoutSlice';

const buttons = (id) => [
  {
    ico: faFileAlt,
    label: 'Szczegóły',
    action: `${Routing.RecordDetails.action}/${id}`
  },
  {
    ico: faEdit,
    label: 'Edytuj',
    action: `${Routing.RecordEdit.action}/${id}`
  },
  {
    ico: faPlusSquare,
    label: 'Przejazd',
    action: 'details'
  }
];

const List = ({ records }) => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const dispatch = useDispatch();

  const { vehicles } = useSelector(selectVehicles);
  const minDate = useSelector(selectEldestDate);
  const { dateFilter } = useSelector(selectFilters);
  const isLaptop = useSelector(selectIsLaptop);

  const button = useRef(null);
  const [DropdownList, setIsDropdownOpen, isDropdownOpen] = useDropdown(button);

  const sortItems = [
    { label: 'Wszystkie', value: '0' },
    ...vehicles.map((veh) => ({ label: veh.name, value: veh.id }))
  ];

  useEffect(() => {
    if (!startDate) {
      setStartDate(dateFilter.filter.from);
    }
    if (!endDate) {
      setEndDate(dateFilter.filter.to);
    }
  }, []);

  return (
    <ItemsList>
      <TopPanel>
        <ButtonAdd>
          <AddItem to={`${Routing.RecordAdd.path}`}>
            <FontAwesomeIcon icon={faPlus} />
            <span> Nowa ewidencja</span>
          </AddItem>
        </ButtonAdd>
        <DropdownList>
          <Select
            menuIsOpen
            options={sortItems}
            onChange={(filter) => {
              dispatch(setVehicleFilter(filter));
            }}
            placeholder='Wybierz pojazd'
          />
        </DropdownList>

        <FilterButton ref={button} onClick={() => setIsDropdownOpen(true)}>
          <FontAwesomeIcon icon={faCalendar} />
        </FilterButton>

        <DropdownList>
          <DatePicker
            selected={startDate}
            dateFormat='yyyy-MM'
            locale={locale}
            withPortal={!isLaptop}
            customInput={<Input />}
            onChange={(date) => {
              setStartDate(date);
              dispatch(setDateFilter({ from: date }));
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
              dispatch(setDateFilter({ to: date }));
            }}
            startDate={startDate}
            endDate={endDate}
            selectsEnd
            showMonthYearPicker
          />
        </DropdownList>
      </TopPanel>

      {records.map((record) => {
        const subname = record.vehicle && record.vehicle.name;
        return (
          <ListViewItem
            key={record.id}
            ico={faUser}
            item={{ ...record, subname }}
            path={Routing.Records.path}
            buttons={buttons(record.id)}
          />
        );
      })}
    </ItemsList>
  );
};

const Records = () => {
  const { records, status, error } = useSelector((state) =>
    selectRecordsWithVehicles(state)
  );
  return (
    <Switch>
      <Route exact path={Routing.RecordAdd.path}>
        <Routing.RecordAdd.Component />
      </Route>
      <Route exact path={Routing.RecordEdit.path}>
        <Routing.RecordEdit.Component />
      </Route>
      <Route exact path={Routing.RecordDetails.path}>
        <Routing.RecordDetails.Component />
      </Route>
      <Route>
        <List records={records} />
      </Route>
    </Switch>
  );
};

export default Records;
