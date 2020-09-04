import React from 'react';

import VehicleForm from './VehicleForm';
import { useSelector } from 'react-redux';
import { selectVehicleById } from '../../vehicles/vehiclesSlice';
import { useParams } from 'react-router';

const EditVehicleForm = () => {
  const { id } = useParams();

  const vehicle = useSelector((state) => selectVehicleById(state, id));
  
  return vehicle ? <VehicleForm vehicle={vehicle} /> : null;
};

export default EditVehicleForm;
