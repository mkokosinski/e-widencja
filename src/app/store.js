import { configureStore } from '@reduxjs/toolkit';
import layoutReducer from '../features/layout/layoutSlice';
import recordsReducer from '../features/records/recordsSlice';
import vehicleReducer from '../features/vehicles/vehiclesSlice';
import driversReducer from '../features/drivers/driversSlice';

export default configureStore({
  reducer: {
    layout: layoutReducer,
    records: recordsReducer,
    vehicles: vehicleReducer,
    drivers: driversReducer,
  },
});
