import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchVehicles = createAsyncThunk(
  'vehicles/fetchVehicles',
  async (arg = 1, thunkAPI) => {
    const test = await fetch(
      `https://run.mocky.io/v3/c102e1e8-a6f3-461b-acf7-217884df0c65`
    );

    return await test.json();
  }
);

export const vehicleSlice = createSlice({
  name: 'vehicles',
  initialState: {
    loading: false,
    vehicles: [],
  },
  reducers: {
    func: (state) => {
      //function body
    },
  },
  extraReducers: {
    [fetchVehicles.pending]: (state, action) => {
      console.log('pending', action);
      state.loading = true;
    },

    [fetchVehicles.fulfilled]: (state, action) => {
      state.loading = false;

      console.log(action.payload.vehicles);
      state.vehicles = [...action.payload.vehicles];
      console.log(state.vehicles);
    },

    [fetchVehicles.rejected]: (state, action) => {
      state.loading = false;

      console.log('rejected', action);
      console.log(state);
    },
  },
});

export const selectVehicles = (state) => state.vehicles.vehicles;

export const { next } = vehicleSlice.actions;

export default vehicleSlice.reducer;
