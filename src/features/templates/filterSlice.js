import { createSlice } from '@reduxjs/toolkit';
import { format } from 'date-fns';

export const filterDefaults = {
  dateFilter: {
    from: format(new Date(new Date().getFullYear(), 0, 1), 'yyyy-MM-dd'),
    to: format(new Date(new Date().getFullYear(), 11, 1), 'yyyy-MM-dd'),
  },
  vehicleFilter: { label: 'Wszystkie', value: '0' },
  userFilter: { label: 'Wszyscy', value: '0' },
  userDriverFilter: false,
  carBrandFilter: { label: 'Wszystkie', value: 'Wszystkie' },
};

export const filters = createSlice({
  name: 'filters',
  initialState: {
    dateFilter: {
      enable: true,
      filter: filterDefaults.dateFilter,
    },
    vehicleFilter: { enable: false, filter: filterDefaults.vehicleFilter },
    userFilter: { enable: false, filter: filterDefaults.userFilter },
    userDriverFilter: {
      enable: false,
      filter: filterDefaults.userDriverFilter,
    },
    carBrandFilter: { enable: false, filter: filterDefaults.carBrandFilter },
  },
  reducers: {
    setFilter: (state, action) => {
      const { payload } = action;

      Object.keys(payload).forEach((filter) => {
        if (payload[filter] === filterDefaults[filter]) {
          state[filter].enable = false;
          state[filter].filter = filterDefaults[filter];
        } else {
          state[filter].enable = true;
          state[filter].filter = payload[filter];
        }
      });
    },
  },
});

export const selectFilters = (state) => state.filters;

// export const selectAvailableFilters = (state) => {
//   const keys = Object.keys(state.filters).map((key) => ({
//     [key]: key
//   }));
//   return Object.assign(...keys);
// };

export const { setFilter } = filters.actions;

export default filters.reducer;
