import React from 'react';
import { selectVehicles } from './vehiclesSlice';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Routing from '../layout/Routing';

function Vehicles() {
  const vehicles = useSelector(selectVehicles);
  return (
    <div>
      <Link to={`${Routing.Vehicles.path}/addVehicle`}>Add vehicle</Link>
      {vehicles.map((vehicle) => (
        <div key={vehicle.id}>
          <Link to={`${Routing.Vehicles.path}/${vehicle.id}`} props={{...vehicle}}>{vehicle.name}</Link>
        </div>
      ))}
    </div>
  );
}

export default Vehicles;
