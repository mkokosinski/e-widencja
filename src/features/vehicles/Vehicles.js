import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectVehicles, fetchVehicles } from './vehiclesSlice';
import Routing from '../layout/Routing';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faCarAlt,
  faFileAlt,
  faPlusSquare,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';

import ListViewItem from '../templates/ListView/ListViewItem';
import {
  ButtonAdd,
  TopPanel,
  AddItem,
  SearchInput,
  ItemsList,
} from '../templates/ListView/ListViewStyles';

const buttons = (id) => [
  {
    ico: faFileAlt,
    label: 'Szczegóły',
    action: `${Routing.VehicleDetails.action}/${id}`,
  },
  {
    ico: faEdit,
    label: 'Edytuj',
    action: `${Routing.VehicleEdit.action}/${id}`,
  },
  {
    ico: faPlusSquare,
    label: 'Przejazd',
    action: 'details',
  },
];

function Vehicles() {
  const dispatch = useDispatch();
  const vehicles = useSelector(selectVehicles);

  useEffect(() => {
    const promise = dispatch(fetchVehicles());
    return () => {
      promise.abort();
    };
  });

  return (
    <ItemsList>
      <TopPanel>
        <ButtonAdd>
          <AddItem to={`${Routing.VehicleAdd.path}`}>
            <FontAwesomeIcon icon={faPlus} />
            Nowy <span>pojazd</span>
          </AddItem>
        </ButtonAdd>
        <SearchInput />
      </TopPanel>

      {vehicles.map((vehicle) => (
        <ListViewItem
          key={vehicle.id}
          ico={faCarAlt}
          item={vehicle}
          path={Routing.Vehicles.path}
          buttons={buttons(vehicle.id)}
        />
      ))}
    </ItemsList>
  );
}

export default Vehicles;
