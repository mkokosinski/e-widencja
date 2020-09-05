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
import { Switch, Route, useParams } from 'react-router';

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

const List = ({ vehicles }) => {
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
};

function Vehicles() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { vehicles, status, error } = useSelector(selectVehicles);
 
  return (
    <Switch>
      <Route exact path={Routing.VehicleAdd.path}>
        <Routing.VehicleAdd.Component />
      </Route>
      <Route exact path={Routing.VehicleEdit.path}>
        <Routing.VehicleEdit.Component />
      </Route>
      <Route exact path={Routing.VehicleDetails.path}>
        <Routing.VehicleDetails.Component />
      </Route>
      <Route>
        <List vehicles={vehicles} />
      </Route>
    </Switch>
  );
}

export default Vehicles;
