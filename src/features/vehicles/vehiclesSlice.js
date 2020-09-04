import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchVehicles = createAsyncThunk(
  'vehicles/fetchVehicles',
  async (arg = 1, thunkAPI) => {
    const resp = await fetch(
      `https://run.mocky.io/v3/c102e1e8-a6f3-461b-acf7-217884df0c65`
    );

    return await resp.json();
  }
);

export const vehicleSlice = createSlice({
  name: 'vehicles',
  initialState: {
    status: 'idle',
    vehicles: [],
    error: null,
  },
  reducers: {
    func: (state) => {
      //function body
    },
  },
  extraReducers: {
    [fetchVehicles.pending]: (state, action) => {
      state.status = 'loading';
    },

    [fetchVehicles.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.vehicles = [...action.payload.vehicles];
    },

    [fetchVehicles.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export const selectVehicles = (state) => state.vehicles;

export const selectVehicleById = (state, vehicleId) =>
  state.vehicles.vehicles.find((vehicle) => vehicle.id === vehicleId);

export const { next } = vehicleSlice.actions;

export default vehicleSlice.reducer;
