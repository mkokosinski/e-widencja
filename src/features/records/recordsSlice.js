import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { months } from '../forms/DatePickerLocale';

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
    filters: {
      dateFilter: {
        enable: true,
        filter: {
          from: new Date(new Date().getFullYear(), 0, 1),
          to: new Date()
        }
      },
      vehicleFilter: { enable: false, filter: { label: '', value: '0' } }
    }
  },
  reducers: {
    setDateFilter: (state, action) => {
      const { payload } = action;
      state.filters.dateFilter = {
        enable: true,
        filter: { ...state.filters.dateFilter.filter, ...payload }
      };
    },

    setVehicleFilter: (state, action) => {
      const { payload } = action;
      if (payload.value === '0') {
        state.filters.vehicleFilter = {
          enable: false,
          filter: { label: '', value: '0' }
        };
      } else {
        state.filters.vehicleFilter = { enable: true, filter: payload };
      }
    }
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
          }
        });
      });
    },

    [fetchRecords.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    }
  }
});

export const selectRecords = (state) => state.records;

export const selectRecordsWithVehicles = (state) => {
  const { vehicleFilter, dateFilter } = state.records.filters;
  const records = [];
  state.records.records
    .filter((rec) =>
      vehicleFilter.enable ? rec.vehicleId === vehicleFilter.filter.value : rec
    )
    .filter((rec) => {
      if (dateFilter.enable) {
        const dateFrom = new Date(dateFilter.filter.from);
        const dateTo = new Date(dateFilter.filter.to);
        const recDate = new Date(rec.year, months.indexOf(rec.month));

        return recDate >= dateFrom && recDate <= dateTo;
      } else {
        return rec;
      }
    })
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

export const selectActiveVehicleFilter = (state) =>
  state.records.vehicleFilter.filter;

const searchMinDate = (arr) => {
  if (arr.length > 0) {
    const dates = arr.map((item) => item.year);
    const min = Math.min(...dates);
    return min;
  } else return new Date();
};

export const selectEldestDate = (state) => searchMinDate(state.records.records);

export const selectFilters = (state) => state.records.filters;

export const { setDateFilter, setVehicleFilter } = recordsSlice.actions;

export default recordsSlice.reducer;
