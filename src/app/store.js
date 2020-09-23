import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import layoutReducer from '../features/layout/layoutSlice';
import recordsReducer from '../features/records/recordsSlice';
import vehicleReducer from '../features/vehicles/vehiclesSlice';
import usersReducer from '../features/users/usersSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    layout: layoutReducer,
    records: recordsReducer,
    vehicles: vehicleReducer,
    users: usersReducer
  },
});
