import { configureStore } from '@reduxjs/toolkit';
import vehicleReducer from '../features/vehicles/vehiclesSlice';

export default configureStore({
  reducer: {
    vehicles:vehicleReducer
  },
});
