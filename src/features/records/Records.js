import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ListViewItem from '../templates/ListView/ListViewItem';
import {
  ButtonAdd,
  TopPanel,
  AddItem,
  SearchInput,
  ItemsList,
} from '../templates/ListView/ListViewStyles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faUser,
  faFileAlt,
  faPlusSquare,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';
import Routing from '../routing/Routing';
import { selectRecords, fetchRecords } from './recordsSlice';
import { Switch, Route } from 'react-router';

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
  return (
    <ItemsList>
      <TopPanel>
        <ButtonAdd>
          <AddItem to={`${Routing.RecordAdd.path}`}>
            <FontAwesomeIcon icon={faPlus} />
            Nowa <span>ewidencja</span>
          </AddItem>
        </ButtonAdd>
        <SearchInput />
      </TopPanel>

      {records.map((record) => (
        <ListViewItem
          key={record.id}
          ico={faUser}
          item={record}
          path={Routing.Records.path}
          buttons={buttons(record.id)}
        />
      ))}
    </ItemsList>
  );
};

const Records = () => {
  const dispatch = useDispatch();
  const { records, status, error } = useSelector(selectRecords);

console.log('rec', records);
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
