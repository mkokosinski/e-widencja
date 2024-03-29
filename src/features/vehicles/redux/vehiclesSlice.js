import { createSlice, createSelector } from '@reduxjs/toolkit';
import { selectFilters } from '../../templates/filterSlice';
import { FETCH_STATUS } from '../../../utils/constants';
import { toast } from 'react-toastify';
import { addVehicle, deleteVehicle, editVehicle, fetchVehicles } from './vehicleThunk';
import noticeReducers from './notices';

const sortMethods = {
  Nazwa: {
    asc: (a, b) => a.name.localeCompare(b.name),
    desc: (a, b) => b.name.localeCompare(a.name),
  },
  Producent: {
    asc: (a, b) => a.brand.localeCompare(b.brand),
    desc: (a, b) => b.brand.localeCompare(a.brand),
  },
  Przebieg: {
    asc: (a, b) => b.mileage - a.mileage,
    desc: (a, b) => a.mileage - b.mileage,
  },
};

export const vehicleSlice = createSlice({
  name: 'vehicles',
  initialState: {
    status: 'idle',
    items: [],
    error: null,
    sortFunc: { name: 'Nazwa', condition: 'asc' },
    sortCases: [
      {
        title: 'Nazwa',
        items: [
          { label: 'a-z', condition: 'asc' },
          { label: 'z-a', condition: 'desc' },
        ],
      },
      {
        title: 'Producent',
        items: [
          { label: 'a-z', condition: 'asc' },
          { label: 'z-a', condition: 'desc' },
        ],
      },
      {
        title: 'Przebieg',
        items: [
          { label: 'malejąco', condition: 'asc' },
          { label: 'rosnąco', condition: 'desc' },
        ],
      },
    ],
  },
  reducers: {
    setSortFunc: (state, action) => {
      console.error(action);
      const { payload } = action;
      const entry = Object.entries(payload)[0];

      state.sortFunc = { name: entry[0], condition: entry[1] };
    },
  },
  extraReducers: {
    [fetchVehicles.pending]: (state, action) => {
      state.status = FETCH_STATUS.LOADING;
    },

    [fetchVehicles.fulfilled]: (state, action) => {
      state.status = FETCH_STATUS.SUCCESS;
      state.items = [...action.payload];
    },

    [fetchVehicles.rejected]: (state, action) => {
      state.status = FETCH_STATUS.ERROR;
      state.error = action.payload.message;
      console.error(action.payload);
    },

    [addVehicle.pending]: (state, { payload }) => {
      state.status = FETCH_STATUS.LOADING;
    },
    [addVehicle.fulfilled]: (state, { payload }) => {
      state.status = FETCH_STATUS.SUCCESS;
      state.items.push(payload);
      toast.success('Poprawnie dodano nowy pojazd');
    },
    [addVehicle.rejected]: (state, action) => {
      state.status = FETCH_STATUS.ERROR;
      state.error = action.payload.message;
      toast.error(action.payload);
    },

    [editVehicle.pending]: (state, action) => {
      state.status = FETCH_STATUS.LOADING;
    },
    [editVehicle.fulfilled]: (state, { payload }) => {
      state.status = FETCH_STATUS.SUCCESS;
      state.items = state.items.map((vehicle) => (vehicle.id === payload.id ? { ...vehicle, ...payload } : vehicle));
      toast.success('Poprawnie edytowano pojazd');
    },
    [editVehicle.rejected]: (state, action) => {
      state.status = FETCH_STATUS.ERROR;
      state.error = action.payload.message;
      toast.error(action.payload);
    },

    [deleteVehicle.pending]: (state, action) => {
      state.status = FETCH_STATUS.LOADING;
    },
    [deleteVehicle.fulfilled]: (state, { payload }) => {
      state.status = FETCH_STATUS.SUCCESS;
      state.items = state.items.filter((veh) => veh.id !== payload);
      toast.success('Poprawnie usunieto pojazd');
    },
    [deleteVehicle.rejected]: (state, { payload }) => {
      state.status = FETCH_STATUS.ERROR;
      state.error = payload.message;
      toast.error(payload.message);
    },
    ...noticeReducers,
  },
});

export const selectVehicles = (state) => ({
  ...state.vehicles,
  items: state.vehicles.items.filter((veh) => veh.active),
});

export const selectSortedVehicles = (state) => {
  const { vehicles } = state;
  const { sortFunc } = vehicles;
  const sorted = [...vehicles.items].sort(sortMethods[sortFunc.name][sortFunc.condition]);
  return { ...vehicles, items: sorted };
};

export const selectFilteredVehicles = createSelector([selectSortedVehicles, selectFilters], (vehicles, filters) => {
  const { vehicleFilter, carBrandFilter } = filters;

  const filtered = vehicles.items
    .filter((veh) => veh.active)
    .filter((veh) => (vehicleFilter.enable ? veh.id === vehicleFilter.filter.value : veh))
    .filter((veh) => (carBrandFilter.enable ? veh.brand === carBrandFilter.filter.value : veh));

  return { ...vehicles, items: filtered };
});

export const selectVehicleById = (state, vehicleId) => state.vehicles.items.find((vehicle) => vehicle.id === vehicleId);

export const selectCarBrands = (state) => [...new Set(state.vehicles.items.map((veh) => veh.brand))];

export const selectVehicleSort = (state) => state.vehicles.sortCases;

export const { setSortFunc } = vehicleSlice.actions;

export default vehicleSlice.reducer;
