import React from 'react';
import { useSelector } from 'react-redux';

import {
  selectFilteredVehicles,
  selectVehicleSort,
  setSortFunc,
} from './redux/vehiclesSlice';
import Routing from '../routing/Routing';

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
import FilterButton from '../..//components/FilterButton';
import FilterModal from './VehiclesFiltersModal';
import SortButton from '../..//components/SortButton';
import {
  InfoMain,
  InfoSecondary,
  Journey,
  Journeys,
  Name,
  Subname,
  Title,
} from '../templates/ListView/ListViewItemStyles';
import { EmptyState } from '../templates/detailsView/DetailsStyles';
import { selectRecords } from '../records/recordsSlice';

const buttons = (id, currentMonthRecordId) => [
  {
    ico: faFileAlt,
    label: 'Szczegóły',
    action: `${Routing.VehicleDetails.action}/${id}`,
  },
  {
    ico: faPlusSquare,
    label: 'Przejazd',
    action: `${Routing.TripAdd.action}/${currentMonthRecordId}`,
    state: { vehicleId: id },
  },
  {
    ico: faEdit,
    label: 'Edytuj',
    action: `${Routing.VehicleEdit.action}/${id}`,
  },
];

function Vehicles() {
  const { items: vehicles } = useSelector(selectFilteredVehicles);
  const { items: records } = useSelector(selectRecords);
  const sortItems = useSelector(selectVehicleSort);

  return (
    <ItemsList>
      <TopPanel>
        <ButtonAdd tabIndex='-1'>
          <AddItem to={`${Routing.VehicleAdd.path}`}>
            <FontAwesomeIcon icon={faPlus} />
            <span>Nowy pojazd</span>
          </AddItem>
        </ButtonAdd>
        <FilterButton modalComponent={FilterModal} />
        <SortButton modalItems={sortItems} sortFunc={setSortFunc} />
      </TopPanel>

      {vehicles.length > 0 ? (
        vehicles.map((vehicle) => {
          const recordForCurrentMonth = records.find(
            (rec) =>
              rec.vehicleId === vehicle.id &&
              rec.month === new Date().getMonth() + 1,
          );
          return (
            <ListViewItem
              key={vehicle.id}
              ico={faCarAlt}
              path={Routing.Vehicles.path}
              buttons={buttons(vehicle.id, recordForCurrentMonth?.id || '')}
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
          );
        })
      ) : (
        <EmptyState>Brak dostępnych pojazdów</EmptyState>
      )}
    </ItemsList>
  );
}

export default Vehicles;
