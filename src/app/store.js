import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import carBrandsReducer from '../features/vehicles/carBrandsSlice';
import companyReducer from '../features/company/companySlice';
import carModelsReducer from '../features/vehicles/carModelsSlice';
import filtersReducer from '../features/templates/filterSlice';
import layoutReducer from '../features/layout/layoutSlice';
import recordsReducer from '../features/records/recordsSlice';
import settingsReducer from '../features/settings/redux/settingsSlice';
import tripsReducer from '../features/trips/tripsSlice';
import tripTemplatesReducer from '../features/tripTemplates/tripTemplatesSlice';
import vehicleReducer from '../features/vehicles/redux/vehiclesSlice';
import usersReducer from '../features/users/usersSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    carBrands: carBrandsReducer,
    carModels: carModelsReducer,
    company: companyReducer,
    filters: filtersReducer,
    layout: layoutReducer,
    records: recordsReducer,
    settings: settingsReducer,
    trips: tripsReducer,
    tripTemplates: tripTemplatesReducer,
    vehicles: vehicleReducer,
    users: usersReducer,
  },
});
