import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import filtersReducer from '../features/templates/filterSlice';
import layoutReducer from '../features/layout/layoutSlice';
import recordsReducer from '../features/records/recordsSlice';
import settingsReducer from '../features/settings/settingsSlice';
import tripsReducer from '../features/trips/tripsSlice';
import vehicleReducer from '../features/vehicles/vehiclesSlice';
import usersReducer from '../features/users/usersSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    filters: filtersReducer,
    layout: layoutReducer,
    records: recordsReducer,
    settings: settingsReducer,
    trips: tripsReducer,
    vehicles: vehicleReducer,
    users: usersReducer
  }
});
