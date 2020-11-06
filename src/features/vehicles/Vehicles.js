import React from 'react';
import { useSelector } from 'react-redux';

import { selectFilteredVehicles, selectVehicleSort, setSortFunc } from './vehiclesSlice';
import Routing from '../routing/RoutingPaths';

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
  ItemsList,
} from '../templates/ListView/ListViewStyles';
import FilterButton from '../../app/components/FilterButton';
import FilterModal from './VehiclesFiltersModal';
import SortButton from '../../app/components/SortButton';

const buttons = (id) => [
  {
    ico: faFileAlt,
    label: 'Szczegóły',
    action: `${Routing.VehicleDetails.action}/${id}`
  },
  {
    ico: faEdit,
    label: 'Edytuj',
    action: `${Routing.VehicleEdit.action}/${id}`
  },
  {
    ico: faPlusSquare,
    label: 'Przejazd',
    action: 'details'
  }
];

function Vehicles() {
  const { items: vehicles } = useSelector(selectFilteredVehicles);
  const sortItems = useSelector(selectVehicleSort);

  return (
    <ItemsList>
      <TopPanel>
        <ButtonAdd>
          <AddItem to={`${Routing.VehicleAdd.path}`}>
            <FontAwesomeIcon icon={faPlus} />
            <span>Nowy pojazd</span>
          </AddItem>
        </ButtonAdd>
        <FilterButton modalComponent={FilterModal} />
        <SortButton modalItems={sortItems} sortFunc={setSortFunc} />

      </TopPanel>

      {vehicles.map((vehicle) => (
        <ListViewItem
          key={vehicle.id}
          ico={faCarAlt}
          item={{ ...vehicle, subname: `${vehicle.brand} ${vehicle.model}` }}
          path={Routing.Vehicles.path}
          buttons={buttons(vehicle.id)}
        />
      ))}
    </ItemsList>
  );
}

export default Vehicles;
