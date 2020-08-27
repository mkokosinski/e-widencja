import React from 'react';
import { selectVehicles } from './vehiclesSlice';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Routing from '../layout/Routing';
import { PanelLight, ButtonMain } from '../layout/LayoutStyles';
import VehiclePanel from './VehiclePanel';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import {
  TopPanel,
  AddVehicle,
  SearchVehicle,
  VehicleList,
} from './VehicleStyles';

function Vehicles() {
  const vehicles = useSelector(selectVehicles);
  return (
    <VehicleList>
      <TopPanel>
        <ButtonMain>
          <AddVehicle to={`${Routing.Vehicles.path}/addVehicle`}>
            <FontAwesomeIcon icon={faPlus} />
            Nowy <span>pojazd</span>
          </AddVehicle>
        </ButtonMain>
        <SearchVehicle />
      </TopPanel>

      {vehicles.map((vehicle) => (
        <VehiclePanel vehicle={vehicle} />
      ))}
      {vehicles.map((vehicle) => (
        <VehiclePanel vehicle={vehicle} />
      ))}
      {vehicles.map((vehicle) => (
        <VehiclePanel vehicle={vehicle} />
      ))}
    </VehicleList>
  );
}

export default Vehicles;
