import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { selectVehicleById } from '../vehicles/vehiclesSlice';

export const fetchRecords = createAsyncThunk(
  'records/fetchrecords',
  async (arg = 1, thunkAPI) => {
    const resp = await fetch(
      `https://run.mocky.io/v3/e6a37feb-88fd-4973-8ba1-1a98c45da1a9`
    );
    return await resp.json();
  }
);

export const recordsSlice = createSlice({
  name: 'records',
  initialState: { status: 'idle', records: [], error: null },
  reducers: {
    func: (state) => {
      //function body
    },
  },
  extraReducers: {
    [fetchRecords.pending]: (state, action) => {
      state.status = 'loading';
    },

    [fetchRecords.fulfilled]: (state, action) => {
      state.status = 'succeeded';

      action.payload.records.forEach((rec) => {
        state.records.push({
          ...rec,
          get name() {
            return `${this.month} ${this.year}`;
          },
        });
      });
    },

    [fetchRecords.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export const selectRecords = (state) => state.records;

export const selectRecordById = (state, recordId) => {
  const record = state.records.records.find((record) => record.id === recordId);
  const vehicle = state.vehicles.vehicles.find(
    (vehicle) => vehicle.id === record.vehicleId
  );
  return { ...record, vehicle: { ...vehicle } };
};

export const { next } = recordsSlice.actions;

export default recordsSlice.reducer;
