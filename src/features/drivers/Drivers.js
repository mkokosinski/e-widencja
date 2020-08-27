import React from 'react';
import { selectDrivers } from './driversSlice';
import { useSelector } from 'react-redux';
import Routing from '../layout/Routing';

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
} from '@fortawesome/free-solid-svg-icons';

const buttons = [
  {
    ico: faFileAlt,
    label: 'Szczegóły',
    action: 'details',
  },
  {
    ico: faPlusSquare,
    label: 'cośtam',
    action: 'details',
  },
  {
    ico: faPlusSquare,
    label: 'cośtam',
    action: 'details',
  },
];

function Drivers() {
  const drivers = useSelector(selectDrivers);
  
  return (
    <ItemsList>
      <TopPanel>
        <ButtonAdd>
          <AddItem to={`${Routing.Drivers.path}/addDriver`}>
            <FontAwesomeIcon icon={faPlus} />
            Nowy <span>kierowca</span>
          </AddItem>
        </ButtonAdd>
        <SearchInput />
      </TopPanel>

      {drivers.map((driver) => (
        <ListViewItem
          ico={faUser}
          item={driver}
          path={Routing.Drivers.path}
          buttons={buttons}
        />
      ))}
    </ItemsList>
  );
}

export default Drivers;
