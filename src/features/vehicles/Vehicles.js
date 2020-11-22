import React from 'react';
import { useSelector } from 'react-redux';

import {
  selectFilteredVehicles,
  selectVehicleSort,
  setSortFunc
} from './vehiclesSlice';
import Routing from '../routing/RoutingPaths';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faCarAlt,
  faFileAlt,
  faPlusSquare,
  faEdit
} from '@fortawesome/free-solid-svg-icons';

import ListViewItem from '../templates/ListView/ListViewItem';
import {
  ButtonAdd,
  TopPanel,
  AddItem,
  ItemsList
} from '../templates/ListView/ListViewStyles';
import FilterButton from '../../app/components/FilterButton';
import FilterModal from './VehiclesFiltersModal';
import SortButton from '../../app/components/SortButton';
import {
  InfoMain,
  InfoSecondary,
  Journey,
  Journeys,
  Name,
  Subname,
  Title
} from '../templates/ListView/ListViewItemStyles';

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
          path={Routing.Vehicles.path}
          buttons={buttons(vehicle.id)}
        >
          <Title>
            <Name>{vehicle.name}</Name>
            <Subname>{`${vehicle.brand} ${vehicle.model}`}</Subname>
          </Title>

          <Journeys>
            <Journey>
              <InfoMain>359,34km</InfoMain>
              <InfoSecondary>w tym miesiącu</InfoSecondary>
            </Journey>
            <Journey>
              <InfoMain>29 przejazdów</InfoMain>
              <InfoSecondary>w tym miesiącu</InfoSecondary>
            </Journey>
          </Journeys>
        </ListViewItem>
      ))}
    </ItemsList>
  );
}

export default Vehicles;
