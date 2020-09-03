import { configureStore } from '@reduxjs/toolkit';
import layoutReducer from '../features/layout/layoutSlice';
import recordsReducer from '../features/records/recordsSlice';
import vehicleReducer from '../features/vehicles/vehiclesSlice';
import usersReducer from '../features/users/usersSlice';

export default configureStore({
  reducer: {
    layout: layoutReducer,
    records: recordsReducer,
    vehicles: vehicleReducer,
    users: usersReducer,
  },
});
