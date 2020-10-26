import {
  faEdit,
  faFileAlt,
  faPlus,
  faPlusSquare,
  faSortAmountUpAlt,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router';
import useModal from '../hooks/useModal';
import { selectIsLaptop, selectIsMobileKeyboard } from '../layout/layoutSlice';
import Routing from '../routing/Routing';
import ListViewItem from '../templates/ListView/ListViewItem';
import {
  AddItem,
  ButtonAdd,
  ItemsList,
  ShowFilterButton,
  ShowFilterIco,
  ShowFilterLabel,
  TopPanel
} from '../templates/ListView/ListViewStyles';
import { selectVehicles } from '../vehicles/vehiclesSlice';
import FilterModal from './FilterModal';
import { selectEldestDate, selectRecordsWithVehicles } from './recordsSlice';

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
  const [showFilters, setShowFilters] = useState(false);
  const isMobileKeyboard = useSelector(selectIsMobileKeyboard);

  const { Modal, openModal } = useModal();

  return (
    <ItemsList>
      <TopPanel isMobileKeyboard={isMobileKeyboard}>
        <ButtonAdd>
          <AddItem to={`${Routing.RecordAdd.path}`}>
            <FontAwesomeIcon icon={faPlus} />
            <span> Nowa ewidencja</span>
          </AddItem>
        </ButtonAdd>

        <ShowFilterButton onClick={openModal} showFilters={showFilters}>
          <Modal>
            <FilterModal />
          </Modal>

          <ShowFilterIco showFilters={showFilters}>
            <FontAwesomeIcon icon={faSortAmountUpAlt} />
          </ShowFilterIco>
          <ShowFilterLabel>Filtry</ShowFilterLabel>
        </ShowFilterButton>
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
