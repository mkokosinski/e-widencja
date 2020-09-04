import React from 'react';
import { useParams, useHistory, Redirect } from 'react-router';
import { useSelector } from 'react-redux';
import { selectVehicleById } from './vehiclesSlice';

import Routing from '../layout/Routing';

const VehileDetails = () => {
  const { id } = useParams();
  const { goBack } = useHistory();

  const { vehicle } = useSelector((state) => selectVehicleById(state, id));

  return vehicle ? (
    <div>
      <button onClick={goBack}>go back</button>
      <div>Name: {vehicle.name}</div>
      <div>mark: {vehicle.mark}</div>
      <div>model: {vehicle.model}</div>
      <div>odometer: {vehicle.odometer}</div>
      <div>registrationNumber: {vehicle.registrationNumber}</div>
    </div>
  ) : null;
};

export default VehileDetails;
