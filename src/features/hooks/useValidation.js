import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
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

  const record = (values) => {
    const { items: records } = state.records;
    const { items: vehicles } = state.vehicles;
    const { month, year, vehicleId, mileage, id } = values;
    const oldRecord = records
      .map((rec) => ({
        month: rec.month,
        year: rec.year,
        vehicleId: rec.vehicleId,
        mileage: rec.mileage,
        id: rec.id
      }))
      .find((rec) => rec.id === id);

    const itemWasChanged = id ? !shallowEqual(values, oldRecord) : true;
    const isDuplicate = records.some(
      (rec) =>
        rec.month === month && rec.year === year && rec.vehicleId === vehicleId
    );
    if (itemWasChanged && isDuplicate) {
      return {
        error: validationMessages.record.isDuplicate,
        success: false
      };
    }

    const vehicle = vehicles.find((veh) => veh.id === vehicleId);
    if (vehicle.mileage !== mileage) {
      return {
        error: validationMessages.record.wrongMileage,
        success: false
      };
    }

    return { success: true, error: null };
  };

  return { record };
};

export default useValidation;
