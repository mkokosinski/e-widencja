import React from 'react';
import { selectVehicles } from './vehiclesSlice';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Vehicles() {
  const vehicles = useSelector(selectVehicles);
  return (
    <div>
      {vehicles.map((vehicle) => (
        <div key={vehicle.id}>
          <Link to={`/vehicles/${vehicle.id}`} props={{...vehicle}}>{vehicle.name}</Link>
        </div>
      ))}
    </div>
  );
}

export default Vehicles;
