import { v4 as uuid4 } from 'uuid';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { firestore } from '../../../app/firebase/firebase';
import { toast } from 'react-toastify';
import { FETCH_STATUS } from '../../../utils/constants';

export const addNotice = createAsyncThunk(
  'vehicles/addNotice',
  (notice, thunkAPI) => {
    try {
      const vehicle = thunkAPI
        .getState()
        .vehicles.items.find((veh) => veh.id === notice.vehicleId);

      const oldNotices = vehicle.notices || [];
      const newNotices = [
        ...oldNotices,
        { ...notice, id: notice.id || uuid4() },
      ];

      firestore
        .collection('Vehicles')
        .doc(vehicle.id)
        .update({ notices: newNotices })
        .catch((err) => {
          return thunkAPI.rejectWithValue(err);
        });

      return { ...vehicle, notices: newNotices };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const editNotice = createAsyncThunk(
  'vehicles/editNotice',
  (editedNotice, thunkAPI) => {
    try {
      const vehicle = thunkAPI
        .getState()
        .vehicles.items.find((veh) => veh.id === notice.vehicleId);

      const newNotices = vehicel.notices?.map((notice) =>
        notice.id !== editedNotice.id ? notice : editedNotice,
      );

      firestore
        .collection('Vehicles')
        .doc(vehicle.id)
        .update({ notices: newNotices })
        .catch((err) => {
          return thunkAPI.rejectWithValue(err);
        });

      return { ...vehicle, notices: newNotices };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const deleteNotice = createAsyncThunk(
  'vehicles/deleteNotice',
  (deletedNotice, thunkAPI) => {
    try {
      const vehicle = thunkAPI
        .getState()
        .vehicles.items.find((veh) => veh.id === deletedNotice.vehicleId);

      const newNotices = vehicel.notices?.filter(
        (notice) => notice.id !== deletedNotice.id,
      );

      firestore
        .collection('Vehicles')
        .doc(vehicle.id)
        .update({ notices: newNotices })
        .catch((err) => {
          return thunkAPI.rejectWithValue(err);
        });

      return { ...vehicle, notices: newNotices };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const noticeReducers = {
  [addNotice.pending]: (state, action) => {
    state.status = FETCH_STATUS.LOADING;
  },
  [addNotice.fulfilled]: (state, { payload }) => {
    state.status = FETCH_STATUS.SUCCESS;
    state.items = state.items.map((veh) =>
      veh.id !== payload.id ? veh : payload,
    );
    toast.success('Poprawnie dodano uwagi');
  },
  [addNotice.rejected]: (state, action) => {
    console.log(action);
    state.status = FETCH_STATUS.ERROR;
    toast.error('Nie udało się dodać uwag');
  },
  [editNotice.pending]: (state, action) => {
    state.status = FETCH_STATUS.LOADING;
  },
  [editNotice.fulfilled]: (state, { payload }) => {
    state.status = FETCH_STATUS.SUCCESS;
    state.items = state.items.map((veh) =>
      veh.id !== payload.id ? veh : payload,
    );
  },
  [editNotice.rejected]: (state, action) => {
    console.log(action);
    state.status = FETCH_STATUS.ERROR;
  },
  [deleteNotice.pending]: (state, action) => {
    state.status = FETCH_STATUS.LOADING;
  },
  [deleteNotice.fulfilled]: (state, { payload }) => {
    state.status = FETCH_STATUS.SUCCESS;
    state.items = state.items.map((veh) =>
      veh.id !== payload.id ? veh : payload,
    );
  },
  [deleteNotice.rejected]: (state, action) => {
    console.log(action);
    state.status = FETCH_STATUS.ERROR;
  },
};

export default noticeReducers;
