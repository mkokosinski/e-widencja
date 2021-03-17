import React from 'react';

import Routing from '../routing/Routing';

import {
  faEdit,
  faFileAlt,
  faPlus,
  faTruckPickup,
} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import {
  AddItem,
  ButtonAdd,
  ItemsList,
  TopPanel,
} from '../templates/ListView/ListViewStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ListViewItem from '../templates/ListView/ListViewItem';
import FilterButton from '../../app/components/FilterButton';
import FilterModal from './TripFilters';
import { selectTripsFullData } from './tripsSlice';
import { Name, Subname, Title } from '../templates/ListView/ListViewItemStyles';

const buttons = (id) => [
  {
    ico: faFileAlt,
    label: 'Szczegóły',
    action: `${Routing.TripDetails.action}/${id}`,
  },
  {
    ico: faEdit,
    label: 'Edytuj',
    action: `${Routing.TripEdit.action}/${id}`,
  },
];

const Users = () => {
  const { items: trips } = useSelector(selectTripsFullData);

  return (
    <ItemsList>
      <TopPanel>
        <ButtonAdd>
          <AddItem to={`${Routing.TripAdd.path}`}>
            <FontAwesomeIcon icon={faPlus} />
            <span> Nowa trasa</span>
          </AddItem>
        </ButtonAdd>

        <FilterButton modalComponent={FilterModal} />
      </TopPanel>

      {trips.map((trip) => {
        return (
          <ListViewItem
            key={trip.id}
            ico={faTruckPickup}
            item={trip}
            path={Routing.Trips.path}
            buttons={buttons(trip.id)}
          >
            <Title>
              <Name>{trip.name}</Name>
              <Subname>
                <span>{trip.date}</span>
                &nbsp; &nbsp;
                <span style={{ opacity: 0.7 }}>{trip.vehicle}</span>
              </Subname>
            </Title>
          </ListViewItem>
        );
      })}
    </ItemsList>
  );
};

export default Users;
