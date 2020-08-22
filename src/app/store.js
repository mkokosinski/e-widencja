import { configureStore } from '@reduxjs/toolkit';
import vehicleReducer from '../features/vehicles/vehiclesSlice';
import driversReducer from '../features/drivers/driversSlice';
import layoutReducer from '../features/layout/layoutSlice';

export default configureStore({
  reducer: {
    vehicles: vehicleReducer,
    drivers: driversReducer,
    layout: layoutReducer,
  },
});
