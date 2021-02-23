import React from 'react';

import VehicleForm from './VehicleForm';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { selectVehicleById } from '../../vehicles/redux/vehiclesSlice';
import { selectCarBrandById } from '../../vehicles/carBrandsSlice';

const EditVehicleForm = () => {
  const { id } = useParams();

  const vehicle = useSelector((state) => selectVehicleById(state, id));
  const carBrand = useSelector((state) =>
    selectCarBrandById(state, vehicle.brand),
  );

  const initVehicle = {
    ...vehicle,
    brand: { ...carBrand },
    model: { label: vehicle.model, model: vehicle.model },
  };

  return vehicle ? <VehicleForm vehicle={initVehicle} isEdit={true} /> : null;
};

export default EditVehicleForm;
