import React from 'react';

import Routing from '../routing/Routing';

import {
  faEdit,
  faFileAlt,
  faPlus,
  faPlusSquare,
  faTruckPickup,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilteredUsers } from '../users/usersSlice';
import {
  AddItem,
  ButtonAdd,
  ItemsList,
  TopPanel,
} from '../templates/ListView/ListViewStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TripsFilters from './TripFilters';
import ListViewItem from '../templates/ListView/ListViewItem';
import FilterButton from '../../app/components/FilterButton';
import FilterModal from './TripFilters';
import { selectTrips } from './tripsSlice';
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
  const trips = useSelector(selectTrips);

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
