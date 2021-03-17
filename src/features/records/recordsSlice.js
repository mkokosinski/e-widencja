import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
import { months } from '../../utils/dateUtils';
import { selectFilters } from '../templates/filterSlice';
import { selectVehicleById } from '../vehicles/redux/vehiclesSlice';
import { firestore, firestoreFunctions } from '../../app/firebase/firebase';

import { FETCH_STATUS } from '../../utils/constants';
import { toast } from 'react-toastify';

export const fetchRecords = createAsyncThunk(
  'records/fetchrecords',
  async (arg = 1, thunkAPI) => {
    const records = [];
    const user = await thunkAPI.getState().auth.user;

    if (user) {
      const coll = await firestore
        .collection('Records')
        .where('companyId', '==', user.companyId)
        .where('active', '==', true)
        .get();

      coll.forEach((doc) => {
        const data = doc.data();
        if (data.created) {
          data.created = data.created.toDate().toString();
        }

        if (data.updated) {
          data.updated = data.updated.toDate().toString();
        }

        if (data.deleted) {
          data.deleted = data.deleted.toDate().toString();
        }

        records.push({
          ...data,
          id: doc.id,
        });
      });
    }

    return records;
  },
);

export const addRecord = createAsyncThunk(
  'records/addRecord',
  async (newRecord, thunkAPI) => {
    const currUser = thunkAPI.getState().auth.user;

    const record = {
      month: newRecord.month,
      year: newRecord.year,
      mileage: newRecord.mileage,
      vehicleId: newRecord.vehicleId,
      get name() {
        return `${months[this.month - 1]} ${this.year}`;
      },
      companyId: currUser.companyId,
      createdBy: currUser.id,
      created: firestoreFunctions.FieldValue.serverTimestamp(),
      active: true,
    };

    const doc = await firestore
      .collection('Records')
      .add(record)
      .catch((err) => {
        console.error(err);
        return thunkAPI.rejectWithValue(err.toString());
      });

    return { ...record, id: doc.id };
  },
);

export const editRecord = createAsyncThunk(
  'records/editRecord',
  async (editedRecord, thunkAPI) => {
    const currUser = thunkAPI.getState().auth.user;

    const record = {
      month: editedRecord.month,
      year: editedRecord.year,
      mileage: editedRecord.mileage,
      get name() {
        return `${months[this.month - 1]} ${this.year}`;
      },
      vehicleId: editedRecord.vehicleId,
      updatedBy: currUser.id,
      updated: firestoreFunctions.FieldValue.serverTimestamp(),
    };

    await firestore
      .collection('Records')
      .doc(editedRecord.id)
      .update(record)
      .catch((err) => {
        return thunkAPI.rejectWithValue(err);
      });

    return { ...editedRecord, ...record };
  },
);

export const deleteRecord = createAsyncThunk(
  'records/deleteRecord',
  async (deletedRecordId, thunkAPI) => {
    try {
      const currUser = thunkAPI.getState().auth.user;

      firestore.collection('Records').doc(deletedRecordId).update({
        active: false,
        deletedBy: currUser.id,
        deleted: firestoreFunctions.FieldValue.serverTimestamp(),
      });

      return deletedRecordId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const sortMethods = {
  Data: {
    asc: (a, b) => a.year - b.year || a.month - b.month,
    desc: (a, b) => b.year - a.year || b.month - a.month,
  },
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
          { label: 'od najstarszych', condition: 'asc' },
        ],
      },
    ],
  },
  reducers: {
    setSortFunc: (state, action) => {
      const { payload } = action;
      const entry = Object.entries(payload)[0];

      state.sortFunc = { name: entry[0], condition: entry[1] };
    },
  },
  extraReducers: {
    [fetchRecords.pending]: (state, action) => {
      state.status = FETCH_STATUS.LOADING;
    },

    [fetchRecords.fulfilled]: (state, { payload }) => {
      state.status = FETCH_STATUS.SUCCESS;
      const items = [];
      payload.forEach((rec) => {
        items.push(rec);
      });
      state.items = items;
    },

    [fetchRecords.rejected]: (state, action) => {
      state.status = FETCH_STATUS.ERROR;
      state.error = action.error.message;
      toast.error(action.error.message);
    },
    [addRecord.pending]: (state, action) => {
      state.status = FETCH_STATUS.LOADING;
    },

    [addRecord.fulfilled]: (state, { payload }) => {
      state.status = FETCH_STATUS.SUCCESS;
      state.items.push(payload);
      toast.success('Poprawnie dodano nową ewidencję');
    },

    [addRecord.rejected]: (state, action) => {
      state.status = FETCH_STATUS.ERROR;
      state.error = action.error.message;
      toast.error(action.payload);
    },
    [editRecord.pending]: (state, action) => {
      state.status = FETCH_STATUS.LOADING;
    },

    [editRecord.fulfilled]: (state, { payload }) => {
      state.status = FETCH_STATUS.SUCCESS;
      state.items = state.items.map((rec) =>
        rec.id === payload.id ? payload : rec,
      );
      toast.success('Poprawnie edytowano ewidencję');
    },

    [editRecord.rejected]: (state, action) => {
      state.status = FETCH_STATUS.ERROR;
      state.error = action.payload.message;
      toast.error(action.payload);
    },
    [deleteRecord.pending]: (state, action) => {
      state.status = FETCH_STATUS.LOADING;
    },

    [deleteRecord.fulfilled]: (state, { payload }) => {
      state.status = FETCH_STATUS.SUCCESS;
      state.items = state.items.filter((rec) => rec.id !== payload);
      toast.success('Poprawnie usunięto ewidencję');
    },

    [deleteRecord.rejected]: (state, { payload }) => {
      state.status = FETCH_STATUS.ERROR;
      state.error = payload.message;
      toast.error(payload);
    },
  },
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
          : rec,
      )
      .filter((rec) => {
        if (dateFilter.enable) {
          const date = {
            from: new Date(dateFilter.filter.from),
            to: new Date(dateFilter.filter.to),
          };

          const formatedDate = {
            from: new Date(date.from.getFullYear(), date.from.getMonth(), 1),
            to: new Date(date.to.getFullYear(), date.to.getMonth(), 1),
            rec: new Date(rec.year, rec.month - 1, 1),
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
  },
);

export const selectRecordById = (state, recordId) => {
  const record = state.records.items.find((record) => record.id === recordId);
  const vehicle = state.vehicles.items.find(
    (vehicle) => vehicle.id === record.vehicleId,
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

export const selectSortCases = (state) => state.records.sortCases;

export const {
  setDateFilter,
  setVehicleFilter,
  setSortFunc,
} = recordsSlice.actions;

export default recordsSlice.reducer;
