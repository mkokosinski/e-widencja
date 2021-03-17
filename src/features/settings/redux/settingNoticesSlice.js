import { createAsyncThunk } from '@reduxjs/toolkit';
import { firestore } from '../../../app/firebase/firebase';
import { toast } from 'react-toastify';
import { FETCH_STATUS, SETTING_NAME } from '../../../utils/constants';

export const settingsAddNotice = createAsyncThunk(
  'settings/settingsAddNotice',
  (notice, thunkAPI) => {
    try {
      const user = thunkAPI.getState().auth.user;
      const notices = thunkAPI
        .getState()
        .settings.items.find((s) => s.id === SETTING_NAME.NOTICES);

      const newItems = {
        ...notices,
        items: [...notices.items, notice],
      };

      firestore
        .collection('Companies')
        .doc(user.companyId)
        .collection('Settings')
        .doc(SETTING_NAME.NOTICES)
        .update(newItems);
      return newItems;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const settingsEditNotice = createAsyncThunk(
  'settings/settingsEditNotice',
  (editedNotice, thunkAPI) => {
    try {
      const user = thunkAPI.getState().auth.user;
      const notices = thunkAPI
        .getState()
        .settings.items.find((s) => s.id === SETTING_NAME.NOTICES);

      const newNotices = {
        ...notices,
        items: notices.items.map((notice) =>
          notice.id === editedNotice.id ? editedNotice : notice,
        ),
      };

      firestore
        .collection('Companies')
        .doc(user.companyId)
        .collection('Settings')
        .doc(SETTING_NAME.NOTICES)
        .update(newNotices);

      return newNotices;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const settingsDeleteNotice = createAsyncThunk(
  'settings/settingsDeleteNotice',
  (deletedNotice, thunkAPI) => {
    try {
      const user = thunkAPI.getState().auth.user;
      const notices = thunkAPI
        .getState()
        .settings.items.find((s) => s.id === SETTING_NAME.NOTICES);

      const newNotices = {
        ...notices,
        items: notices.items.filter((p) => p.id !== deletedNotice.id),
      };

      firestore
        .collection('Companies')
        .doc(user.companyId)
        .collection('Settings')
        .doc(SETTING_NAME.NOTICES)
        .update(newNotices);

      return newNotices;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const settingNoticesReducers = {
  [settingsAddNotice.pending]: (state, action) => {
    state.status = FETCH_STATUS.LOADING;
  },
  [settingsAddNotice.fulfilled]: (state, { payload }) => {
    state.status = FETCH_STATUS.SUCCESS;
    state.items = state.items.map((sett) =>
      sett.id !== SETTING_NAME.NOTICES ? sett : payload,
    );
    toast.success('Poprawnie dodano opcję');
  },
  [settingsAddNotice.rejected]: (state, action) => {
    state.status = FETCH_STATUS.ERROR;
    toast.error('Nie udało się dodać opcji');
  },

  [settingsEditNotice.pending]: (state, action) => {
    state.status = FETCH_STATUS.LOADING;
  },
  [settingsEditNotice.fulfilled]: (state, { payload }) => {
    state.status = FETCH_STATUS.SUCCESS;
    state.items = state.items.map((sett) =>
      sett.id !== SETTING_NAME.NOTICES ? sett : payload,
    );
    toast.success('Poprawnie edytowano uwagę');
  },
  [settingsEditNotice.rejected]: (state, action) => {
    state.status = FETCH_STATUS.ERROR;
    toast.error('Nie udało się edytować uwag');
  },
  [settingsDeleteNotice.pending]: (state, action) => {
    state.status = FETCH_STATUS.LOADING;
  },

  [settingsDeleteNotice.fulfilled]: (state, { payload }) => {
    state.status = FETCH_STATUS.SUCCESS;
    state.items = state.items.map((sett) =>
      sett.id !== SETTING_NAME.NOTICES ? sett : payload,
    );
    toast.success('Poprawnie usunięto uwagę');
  },
  [settingsDeleteNotice.rejected]: (state, action) => {
    state.status = FETCH_STATUS.ERROR;
    toast.error('Nie udało się usunąć uwagi');
  },
};

export default settingNoticesReducers;
