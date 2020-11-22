import {
  createSlice,
  createAsyncThunk,
  createSelector
} from '@reduxjs/toolkit';
import { months } from '../../utils/dateUtils';
import { selectFilters } from '../templates/filterSlice';
import { selectVehicleById } from '../vehicles/vehiclesSlice';
import { firestore } from '../../app/firebase/firebase';
import { selectUserById } from '../users/usersSlice';

import { FETCH_STATUS } from '../../utils/fetchUtils';

export const fetchRecords = createAsyncThunk(
  'records/fetchrecords',
  async (arg = 1, thunkAPI) => {
    const records = [];
    const user = thunkAPI.getState().auth.user;

    const coll = await firestore
      .collection('Records')
      .where('companyId', '==', user.companyId)
      .get();

    coll.forEach((doc) => {
      records.push({ ...doc.data(), id: doc.id });
    });

    return records;
  }
);

export const addRecord = createAsyncThunk(
  'records/addRecord',
  async (arg, thunkAPI) => {
    const date = new Date(arg.date);
    const record = {
      company: 'KAMSOFT S.A.',
      year: date.getFullYear(),
      month: date.getMonth(),
      vehicleId: arg.vehicle
    };

    const test = await firestore
      .collection('Records')
      .add(record)
      .catch((err) => console.log(err));

    console.log(test.data());

    // return test.data();
  }
);

const sortMethods = {
  Data: {
    asc: (a, b) => a.year - b.year || a.month - b.month,
    desc: (a, b) => b.year - a.year || b.month - a.month
  }
};

export const recordsSlice = createSlice({
  name: 'records',
  initialState: {
    status: FETCH_STATUS.IDLE,
    items: [],
    error: null,
    sortFunc: { name: 'Data', condition: 'desc' },
    sortCases: [
      {
        title: 'Data',
        items: [
          { label: 'od najnowszych', condition: 'desc' },
          { label: 'od najstarszych', condition: 'asc' }
        ]
      }
    ]
  },
  reducers: {
    setSortFunc: (state, action) => {
      const { payload } = action;
      const entry = Object.entries(payload)[0];

      state.sortFunc = { name: entry[0], condition: entry[1] };
    }
  },
  extraReducers: {
    [fetchRecords.pending]: (state, action) => {
      state.status = FETCH_STATUS.LOADING;
    },

    [fetchRecords.fulfilled]: (state, action) => {
      state.status = FETCH_STATUS.SUCCESS;
      const items = [];
      action.payload.forEach((rec) => {
        items.push({
          ...rec,
          get name() {
            return `${months[this.month - 1]} ${this.year}`;
          }
        });
      });
      state.items = items;
    },

    [fetchRecords.rejected]: (state, action) => {
      state.status = FETCH_STATUS.ERROR;
      state.error = action.error.message;
    },
    [addRecord.pending]: (state, action) => {
      state.status = 'loading';
    },

    [addRecord.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.items.push(action.payload);
    },

    [addRecord.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    }
  }
});

export const selectRecords = (state) => {
  const { records } = state;
  const { sortFunc } = records;
  const withVehicles = [];

  records.items.forEach((rec) => {
    const vehicle = selectVehicleById(state, rec.vehicleId);
    withVehicles.push({ ...rec, vehicle });
  });

  withVehicles.sort(sortMethods[sortFunc.name][sortFunc.condition]);

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
            rec: new Date(rec.year, rec.month - 1, 1)
          };

          return (
            formatedDate.rec >= formatedDate.from &&
            formatedDate.rec <= formatedDate.to
          );
        } else {
          return rec;
        }
      });

    return { ...records, items: filtered };
  }
);

export const selectRecordById = (state, recordId) => {
  const { records } = state;
  if (records.status === FETCH_STATUS.SUCCESS) {
    const record = state.records.items.find((record) => record.id === recordId);
    console.log('items', record, recordId);
    const vehicle = state.vehicles.items.find(
      (vehicle) => vehicle.id === record.vehicleId
    );
    return { ...record, vehicle: { ...vehicle } };
  }

  return { status: records.status };
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

export const selectSortCases = (state) => state.records.sortCases;

export const {
  setDateFilter,
  setVehicleFilter,
  setSortFunc
} = recordsSlice.actions;

export default recordsSlice.reducer;
