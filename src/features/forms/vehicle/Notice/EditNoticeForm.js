import React from 'react';

import VehicleNoticeForm from './VehicleNoticeForm';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

const EditVehicleNoticeForm = () => {
  const { id } = useParams();

  const vehicle = useSelector((state) => selectVehicleById(state, id));

  //   const initVehicle = {
  //     ...vehicle,
  //     brand: { ...carBrand },
  //     model: { label: vehicle.model, model: vehicle.model },
  //   };

  return vehicle ? <VehicleNoticeForm isEdit={true} /> : null;
};

export default EditVehicleNoticeForm;
