import {
  createSlice,
  createAsyncThunk,
  createSelector
} from '@reduxjs/toolkit';
import { selectFilters } from '../templates/filterSlice';
import { firestore } from '../../app/firebase/firebase';

export const fetchVehicles = createAsyncThunk(
  'vehicles/fetchVehicles',
  async (arg = 1, thunkAPI) => {
    const vehicles = [];
    const coll = await firestore.collection('Vehicles').get();

    coll.forEach((doc) => {
      vehicles.push({ ...doc.data(), id: doc.id });
    });

    return vehicles;
  }
);

export const vehicleSlice = createSlice({
  name: 'vehicles',
  initialState: {
    status: 'idle',
    items: [],
    error: null
  },
  reducers: {
    func: (state) => {
      //function body
    }
  },
  extraReducers: {
    [fetchVehicles.pending]: (state, action) => {
      state.status = 'loading';
    },

    [fetchVehicles.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.items = [...action.payload];
    },

    [fetchVehicles.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    }
  }
});

export const selectVehicles = (state) => state.vehicles;

export const selectFilteredVehicles = createSelector(
  [selectVehicles, selectFilters],
  (vehicles, filters) => {
    const { vehicleFilter, carBrandFilter } = filters;

    const filtered = vehicles.items
      .filter((veh) =>
        vehicleFilter.enable ? veh.id === vehicleFilter.filter.value : veh
      )
      .filter((veh) =>
        carBrandFilter.enable ? veh.brand === carBrandFilter.filter.value : veh
      );

    return { ...vehicles, items: filtered };
  }
);

export const selectVehicleById = (state, vehicleId) =>
  state.vehicles.items.find((vehicle) => vehicle.id === vehicleId);

export const selectCarBrands = (state) => [
  ...new Set(state.vehicles.items.map((veh) => veh.brand))
];

export const { next } = vehicleSlice.actions;

export default vehicleSlice.reducer;
