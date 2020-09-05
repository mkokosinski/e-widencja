import React from 'react';
import { useParams, useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { selectRecordById } from './recordsSlice';
import { selectVehicleById } from '../vehicles/vehiclesSlice';

const RecordDetails = () => {
  const { id } = useParams();
  const { goBack } = useHistory();

  const record = useSelector((state) => selectRecordById(state, id));

  // const vehicle = useSelector((state) => selectVehicleById(state, record.vehicleId));

  return (record) ? (
    <div>
      <button onClick={goBack}>go back</button>
      <div>Year: {record.year}</div>
      <div>Month: {record.month}</div>
      <div>Vehicle: {record.vehicle.name}</div>
    </div>
  ) : null;
};

export default RecordDetails;
