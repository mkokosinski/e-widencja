import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router';

import Select from 'react-select';

import ListViewItem from '../templates/ListView/ListViewItem';
import {
  ButtonAdd,
  TopPanel,
  AddItem,
  ItemsList,
} from '../templates/ListView/ListViewStyles';
import { selectRecordsWithVehicles, setVehicleFilter, selectActiveVehicleFilter } from './recordsSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faUser,
  faFileAlt,
  faPlusSquare,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';
import Routing from '../routing/Routing';
import { selectVehicles } from '../vehicles/vehiclesSlice';

const buttons = (id) => [
  {
    ico: faFileAlt,
    label: 'Szczegóły',
    action: `${Routing.RecordDetails.action}/${id}`,
  },
  {
    ico: faEdit,
    label: 'Edytuj',
    action: `${Routing.RecordEdit.action}/${id}`,
  },
  {
    ico: faPlusSquare,
    label: 'Przejazd',
    action: 'details',
  },
];

const List = ({ records }) => {
  const dispatch = useDispatch();

  const { vehicles } = useSelector(selectVehicles);
  const t = useSelector(selectActiveVehicleFilter);

  console.log(t);

  const sortItems = [
    { label: 'Wszystkie', value: '0' },
    ...vehicles.map((veh) => ({ label: veh.name, value: veh.id })),
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
        <Select
          as='select'
          options={sortItems}
          defaultValue={t}
          onChange={(filter) => {
            dispatch(setVehicleFilter(filter));
          }}
        />
      </TopPanel>

      {records.map((record) => {
        const subname = record.vehicle && record.vehicle.name;
        console.log(subname);
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
