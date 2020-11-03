import {
  createSlice,
  createAsyncThunk,
  createSelector
} from '@reduxjs/toolkit';
import { months } from '../../utils/dateUtils';
import { selectFilters } from '../templates/filterSlice';
import { selectVehicleById } from '../vehicles/vehiclesSlice';
import {firestore} from '../../app/firebase/firebase';


export const fetchRecords = createAsyncThunk(
  'records/fetchrecords',
  async (arg = 1, thunkAPI) => {
    const records = [];
    const coll = await firestore.collection('Records').get();

    coll.forEach((doc) => {
      records.push(doc.data());
    });

    return records;
  }
);

export const recordsSlice = createSlice({
  name: 'records',
  initialState: {
    status: 'idle',
    items: [],
    error: null
  },
  reducers: {},
  extraReducers: {
    [fetchRecords.pending]: (state, action) => {
      state.status = 'loading';
    },

    [fetchRecords.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      action.payload.forEach((rec) => {
        console.log(rec);
        state.items.push({
          ...rec,
          get name() {
            return `${months[this.month]} ${this.year}`;
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

const sortRecords = (a, b) => a.year - b.year || a.month - b.month;

export const selectRecords = (state) => {
  const { records } = state;
  const withVehicles = [];

  records.items.forEach((rec) => {
    const vehicle = selectVehicleById(state, rec.vehicleId);
    withVehicles.push({ ...rec, vehicle });
  });

  withVehicles.sort(sortRecords);

  return { ...records, items: withVehicles };
};

export const selectFiteredRecords = createSelector(
  [selectRecords, selectFilters],
  (records, filters) => {
    const { vehicleFilter, dateFilter } = filters;

    const filtered = records.items
      .filter((rec) =>
        vehicleFilter.enable
          ? rec.vehicleId === vehicleFilter.filter.value
          : rec
      )
      .filter((rec) => {
        if (dateFilter.enable) {
          const date = {
            from: new Date(dateFilter.filter.from),
            to: new Date(dateFilter.filter.to)
          };

          const formatedDate = {
            from: new Date(date.from.getFullYear(), date.from.getMonth(), 1),
            to: new Date(date.to.getFullYear(), date.to.getMonth(), 1),
            rec: new Date(rec.year, rec.month, 1)
          };

          return (
            formatedDate.rec >= formatedDate.from &&
            formatedDate.rec <= formatedDate.to
          );
        } else {
          return rec;
        }
      })

    return { ...records, items: filtered };
  }
);

export const selectRecordById = (state, recordId) => {
  const record = state.records.items.find((record) => record.id === recordId);
  const vehicle = state.vehicles.items.find(
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

export const selectEldestDate = (state) => searchMinDate(state.records.items);

export const { setDateFilter, setVehicleFilter } = recordsSlice.actions;

export default recordsSlice.reducer;
