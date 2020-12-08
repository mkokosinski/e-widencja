import React from 'react';
import { useSelector } from 'react-redux';
import { selectVehicleById } from '../vehicles/vehiclesSlice';

export const validationMessages = {
  isDuplicate: 'Element już istnieje',
  record: {
    isDuplicate: 'Istnieje już ewidencja dla tego pojazdu w podanym okresie',
    wrongMileage:
      'Podany przebieg nie zgadza się z przebiegiem wybranego pojazdu'
  }
};

const useValidation = () => {
  const state = useSelector((state) => state);

  const addRecord = (values) => {
    const { items: records } = state.records;
    const { items: vehicles } = state.vehicles;
    const {
      date,
      vehicle: { value: vehicleId },
      mileage
    } = values;

    const dateObj = new Date(date);
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();

    const isDuplicate = records.some(
      (rec) =>
        rec.month === month && rec.year === year && rec.vehicleId === vehicleId
    );

    if (isDuplicate) {
      return {
        error: validationMessages.record.isDuplicate,
        success: false
      };
    }

    const vehicle = vehicles.find((veh) => veh.id === vehicleId);
    console.log(vehicle.mileage);
    console.log(mileage);
    if (vehicle.mileage !== mileage) {
      return {
        error: validationMessages.record.wrongMileage,
        success: false
      };
    }

    return { success: true, error: null };
  };

  const editRecord = (values) => {
    const { items: vehicles } = state.vehicles;
    const {
      vehicle: { value: vehicleId },
      mileage
    } = values;

    const vehicle = vehicles.find((veh) => veh.id === vehicleId);
    console.log(vehicle.mileage);
    console.log(mileage);
    if (vehicle.mileage !== mileage) {
      return {
        error: validationMessages.record.wrongMileage,
        success: false
      };
    }

    return { success: true, error: null };
  };

  return { addRecord, editRecord };
};

export default useValidation;
