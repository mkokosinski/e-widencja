import React from 'react';
import { useSelector } from 'react-redux';

import { selectFilteredVehicles } from './vehiclesSlice';
import Routing from '../routing/RoutingPaths';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faCarAlt,
  faFileAlt,
  faPlusSquare,
  faEdit,
  faSortAmountUpAlt
} from '@fortawesome/free-solid-svg-icons';

import ListViewItem from '../templates/ListView/ListViewItem';
import {
  ButtonAdd,
  TopPanel,
  AddItem,
  ItemsList,
  FilterButton,
  TopButtonIco,
  ShowFilterLabel
} from '../templates/ListView/ListViewStyles';
import VehiclesFiltersModal from './VehiclesFiltersModal';
import useModal from '../hooks/useModal';

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

  const { Modal, openModal, closeModal } = useModal();

  return (
    <ItemsList>
      <TopPanel>
        <ButtonAdd>
          <AddItem to={`${Routing.VehicleAdd.path}`}>
            <FontAwesomeIcon icon={faPlus} />
            <span>Nowy pojazd</span>
          </AddItem>
        </ButtonAdd>
        <FilterButton onClick={openModal}>
          <TopButtonIco>
            <FontAwesomeIcon icon={faSortAmountUpAlt} />
          </TopButtonIco>
          <ShowFilterLabel>Filtry</ShowFilterLabel>
        </FilterButton>
        <Modal>
          <VehiclesFiltersModal closeModal={closeModal} />
        </Modal>
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
