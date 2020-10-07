import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router';

import Select from 'react-select';

import Routing from '../routing/Routing';
import { selectVehicles } from '../vehicles/vehiclesSlice';
import { Input } from '../forms/FormsStyles';
import DatePickerRange from '../forms/DatePickerRange';

import ListViewItem from '../templates/ListView/ListViewItem';
import {
  ButtonAdd,
  TopPanel,
  AddItem,
  ItemsList,
  DatePickerContainer,
  SelectContainer
} from '../templates/ListView/ListViewStyles';
import {
  selectRecordsWithVehicles,
  setVehicleFilter,
  selectActiveVehicleFilter,
  selectEldestDate,
  setDateFilter
} from './recordsSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faUser,
  faFileAlt,
  faPlusSquare,
  faEdit
} from '@fortawesome/free-solid-svg-icons';
import { useDropdown } from '../hooks/useDropdown';

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
  const dispatch = useDispatch();

  const { vehicles } = useSelector(selectVehicles);
  const minDate = useSelector(selectEldestDate);

  const button = useRef(null);
  const [DropdownList, setIsDropdownOpen, isDropdownOpen] = useDropdown(button);

  const initDateFrom = new Date(new Date().getFullYear(), 0, 1);
  const initDateTo = new Date();

  const sortItems = [
    { label: 'Wszystkie', value: '0' },
    ...vehicles.map((veh) => ({ label: veh.name, value: veh.id }))
  ];

  return (
    <ItemsList>
      <TopPanel>
        <ButtonAdd>
          <AddItem to={`${Routing.RecordAdd.path}`}>
            <FontAwesomeIcon icon={faPlus} />
            <span> Nowa ewidencja</span>
          </AddItem>
        </ButtonAdd>
        <SelectContainer>
          <Select
            as='select'
            options={sortItems}
            onChange={(filter) => {
              dispatch(setVehicleFilter(filter));
            }}
            placeholder='Wybierz pojazd'
          />
        </SelectContainer>

        <button ref={button} onClick={() => setIsDropdownOpen(true)}>
          Data
        </button>
        <DropdownList>
          <DatePickerContainer>
            <DatePickerRange
              onChange={(date) => {
                dispatch(setDateFilter(date));
              }}
              minDate={minDate}
              maxDate={new Date()}
              customInput={<Input />}
              dateFormat='yyyy-MM'
              from={initDateFrom}
              to={initDateTo}
              showMonthYearPicker
              selectsRange
            />
          </DatePickerContainer>
        </DropdownList>
        <DatePickerRange
              onChange={(date) => {
                dispatch(setDateFilter(date));
              }}
              minDate={minDate}
              maxDate={new Date()}
              customInput={<Input />}
              dateFormat='yyyy-MM'
              from={initDateFrom}
              to={initDateTo}
              showMonthYearPicker
              selectsRange
            />
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
