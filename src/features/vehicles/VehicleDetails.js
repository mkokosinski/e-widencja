import React from 'react';
import { useParams, useHistory } from 'react-router';
import { useSelector } from 'react-redux';

const VehileDetails = () => {
  const { id } = useParams();
  const {goBack} = useHistory();


  const vehicle = useSelector((state) =>
    state.vehicles.find((veh) => veh.id === id)
  );

  return (
    <div>
      <button onClick={goBack}>go back</button>
      <div>Name: {vehicle.name}</div>
      <div>mark: {vehicle.mark}</div>
      <div>model: {vehicle.model}</div>
      <div>odometer: {vehicle.odometer}</div>
      <div>registrationNumber: {vehicle.registrationNumber}</div>
    </div>
  );
};

export default VehileDetails;
