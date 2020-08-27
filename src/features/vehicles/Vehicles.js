import React from 'react';
import { useSelector } from 'react-redux';

import { selectVehicles } from './vehiclesSlice';
import Routing from '../layout/Routing';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faCarAlt,
  faFileAlt,
  faPlusSquare,
} from '@fortawesome/free-solid-svg-icons';

import ListViewItem from '../templates/ListView/ListViewItem';
import {
  ButtonAdd,
  TopPanel,
  AddItem,
  SearchInput,
  ItemsList,
} from '../templates/ListView/ListViewStyles';

const buttons = [
  {
    ico: faFileAlt,
    label: 'Szczegóły',
    action: 'details',
  },
  {
    ico: faPlusSquare,
    label: 'Przejazd',
    action: 'details',
  },
  {
    ico: faPlusSquare,
    label: 'Przejazd',
    action: 'details',
  },
];

function Vehicles() {
  const vehicles = useSelector(selectVehicles);

  return (
    <ItemsList>
      <TopPanel>
        <ButtonAdd>
          <AddItem to={`${Routing.Vehicles.path}/addVehicle`}>
            <FontAwesomeIcon icon={faPlus} />
            Nowy <span>pojazd</span>
          </AddItem>
        </ButtonAdd>
        <SearchInput />
      </TopPanel>

      {vehicles.map((vehicle) => (
        <ListViewItem
          ico={faCarAlt}
          item={vehicle}
          path={Routing.Vehicles.path}
          buttons={buttons}
        />
      ))}
    </ItemsList>
  );
}

export default Vehicles;
