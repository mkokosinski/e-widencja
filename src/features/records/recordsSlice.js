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
  initialState: {
    status: 'idle',
    records: [],
    error: null,
    dateFilter: { enable: false, filter: '' },
    vehicleFilter: { enable: false, filter: { label: 'Wszytkie', value: '0' } },
  },
  reducers: {
    setDateFilter: (state, action) => {
      const { payload } = action;
      console.log('dateFilter', payload);
      if (payload.value === '0') {
        state.dateFilter = { enable: false, filter: '' };
      } else {
        state.dateFilter = { enable: true, filter: payload };
      }
    },

    setVehicleFilter: (state, action) => {
      const { payload } = action;
      console.log('dateFilter', payload);
      if (payload.value === '0') {
        state.vehicleFilter = {
          enable: false,
          filter: { label: 'Wszytko', value: '0' },
        };
      } else {
        state.vehicleFilter = { enable: true, filter: payload };
      }
    },
  },
  extraReducers: {
    [fetchRecords.pending]: (state, action) => {
      state.status = 'loading';
    },

    [fetchRecords.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.records = [];
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

export const selectRecordsWithVehicles = (state) => {
  const { vehicleFilter, dateFilter } = state.records;
  const records = [];
  state.records.records
    .filter((rec) =>
      vehicleFilter.enable ? rec.vehicleId === vehicleFilter.filter.value : rec
    )
    .filter((rec) =>
      dateFilter.enable ? rec.vehicleId === dateFilter.filter : rec
    )
    .forEach((rec) => {
      const vehicle = state.vehicles.vehicles.find(
        (vehicle) => vehicle.id === rec.vehicleId
      );
      records.push({ ...rec, vehicle });
    });

  return { ...state.records, records };
};

export const selectRecordById = (state, recordId) => {
  const record = state.records.records.find((record) => record.id === recordId);
  const vehicle = state.vehicles.vehicles.find(
    (vehicle) => vehicle.id === record.vehicleId
  );
  return { ...record, vehicle: { ...vehicle } };
};

export const selectActiveVehicleFilter = (state) => state.records.vehicleFilter.filter;

export const { setDateFilter, setVehicleFilter } = recordsSlice.actions;

export default recordsSlice.reducer;
