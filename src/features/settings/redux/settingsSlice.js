import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
import { selectFilters } from '../../templates/filterSlice';
import { firestore } from '../../../app/firebase/firebase';
import { selectRecordById, selectRecords } from '../../records/recordsSlice';
import { compareDates } from '../../../utils/dateUtils';
import { FETCH_STATUS, SETTING_NAME } from '../../../utils/constants';
import { toast } from 'react-toastify';

const mergeSettings = (docs) => {
  return docs.length
    ? docs
        .map((doc) => ({ [doc.id]: doc.data() }))
        .reduce((obj, data) => ({ ...obj, ...data }))
    : [];
};

/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
export function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Performs a deep merge of `source` into `target`.
 * Mutates `target` only but not its objects and arrays.
 *
 * @author inspired by [jhildenbiddle](https://stackoverflow.com/a/48218209).
 */
function mergeDeep(target, source) {
  const isObject = (obj) => obj && typeof obj === 'object';

  if (!isObject(target) || !isObject(source)) {
    return source;
  }

  Object.keys(source).forEach((key) => {
    const targetValue = target[key];
    const sourceValue = source[key];

    if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
      target[key] = targetValue.concat(sourceValue);
    } else if (isObject(targetValue) && isObject(sourceValue)) {
      target[key] = mergeDeep(Object.assign({}, targetValue), sourceValue);
    } else {
      target[key] = sourceValue;
    }
  });

  return target;
}

export const fetchSettings = createAsyncThunk(
  'settings/fetchSettings',
  async (arg = 1, thunkAPI) => {
    const user = thunkAPI.getState().auth.user;

    const globalSett = await firestore.collection('Settings').get();
    const globalData = mergeSettings(globalSett.docs);

    const companySett = await firestore
      .collection('Companies')
      .doc(user.companyId)
      .collection('Settings')
      .get();
    const companyData = mergeSettings(companySett.docs);

    const userSett = await firestore
      .collection('Users')
      .doc(user.id)
      .collection('Settings')
      .get();
    const userData = mergeSettings(userSett.docs);

    const settings = { ...globalData };
    mergeDeep(settings, companyData);
    mergeDeep(settings, userData);

    return Object.values(settings);
  }
);

export const addPurpose = createAsyncThunk(
  'settings/addPurpose',
  async (arg, thunkAPI) => {
    const user = thunkAPI.getState().auth.user;
    const purposes = thunkAPI
      .getState()
      .settings.items.find((s) => s.id === SETTING_NAME.PURPOSES);

    const newItems = [...purposes.items, arg];
    const newPurposes = {
      ...purposes,
      items: newItems,
    };

    return firestore
      .collection('Companies')
      .doc(user.companyId)
      .collection('Settings')
      .doc('Purposes')
      .update(newPurposes)
      .then((res) => {
        return newPurposes;
      })
      .catch((err) => {
        return thunkAPI.rejectWithValue(err);
      });
  }
);

export const editPurpose = createAsyncThunk(
  'settings/editPurpose',
  async (arg, thunkAPI) => {
    const user = thunkAPI.getState().auth.user;
    const purposes = thunkAPI
      .getState()
      .settings.items.find((s) => s.id === SETTING_NAME.PURPOSES);

    const newItems = purposes.items.map((p) => (p.id === arg.id ? arg : p));
    const newPurposes = {
      ...purposes,
      items: newItems,
    };

    return firestore
      .collection('Companies')
      .doc(user.companyId)
      .collection('Settings')
      .doc('Purposes')
      .update(newPurposes)
      .then((res) => {
        return newPurposes;
      })
      .catch((err) => {
        return thunkAPI.rejectWithValue(err);
      });
  }
);
export const deletePurpose = createAsyncThunk(
  'settings/deletePurpose',
  async (arg, thunkAPI) => {
    const user = thunkAPI.getState().auth.user;
    const purposes = thunkAPI
      .getState()
      .settings.items.find((s) => s.id === SETTING_NAME.PURPOSES);

    const newItems = purposes.items.filter((p) => p.id !== arg.id);
    const newPurposes = {
      ...purposes,
      items: newItems,
    };

    return firestore
      .collection('Companies')
      .doc(user.companyId)
      .collection('Settings')
      .doc('Purposes')
      .update(newPurposes)
      .then((res) => {
        return newPurposes;
      })
      .catch((err) => {
        return thunkAPI.rejectWithValue(err);
      });
  }
);

const sortMethods = {
  Data: {
    asc: (a, b) => compareDates(a.date, b.date),
    desc: (a, b) => compareDates(b.date, a.date),
  },
};

export const settingSlice = createSlice({
  name: 'settings',
  initialState: {
    status: 'idle',
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
    [fetchSettings.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchSettings.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'succeeded';
    },
    [fetchSettings.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },

    [addPurpose.pending]: (state, action) => {
      state.status = FETCH_STATUS.LOADING;
    },
    [addPurpose.fulfilled]: (state, action) => {
      state.status = FETCH_STATUS.SUCCESS;
      state.items = state.items.map((i) =>
        i.id === SETTING_NAME.PURPOSES ? action.payload : i
      );
      toast.success('Poprawnie dodano opcje');
    },
    [addPurpose.rejected]: (state, action) => {
      state.status = FETCH_STATUS.ERROR;
      console.error('err', action);
      state.error = action.error.message;
      toast.error(action.payload);
    },

    [editPurpose.pending]: (state, action) => {
      state.status = FETCH_STATUS.LOADING;
    },
    [editPurpose.fulfilled]: (state, action) => {
      state.status = FETCH_STATUS.SUCCESS;
      state.items = state.items.map((i) =>
        i.id === SETTING_NAME.PURPOSES ? action.payload : i
      );
      toast.success('Poprawnie edytowano opcje');
    },
    [editPurpose.rejected]: (state, action) => {
      state.status = FETCH_STATUS.ERROR;
      console.error('err', action);
      state.error = action.error.message;
      toast.error(action.payload);
    },

    [deletePurpose.pending]: (state, action) => {
      state.status = FETCH_STATUS.LOADING;
    },
    [deletePurpose.fulfilled]: (state, action) => {
      state.status = FETCH_STATUS.SUCCESS;
      state.items = state.items.map((i) =>
        i.id === SETTING_NAME.PURPOSES ? action.payload : i
      );
      toast.success('Poprawnie usunięto opcje');
    },
    [deletePurpose.rejected]: (state, action) => {
      state.status = FETCH_STATUS.ERROR;
      console.error('err', action);
      state.error = action.error.message;
      toast.error(action.payload);
    },
  },
});

const tips = (state) => state.settings;

export const selectSettings = (state) => state.settings.items;

export const selectPurposes = (state) =>
  state.settings.items.find((i) => i.id === SETTING_NAME.PURPOSES);

export const selectNotices = (state) =>
  state.settings.items.find((i) => i.id === SETTING_NAME.NOTICES);

export const selectFilteredSettings = createSelector(
  [selectSettings, selectFilters],
  (settings, filters) => {
    const { settingFilter, carBrandFilter } = filters;

    const filtered = settings.items
      .filter((veh) =>
        settingFilter.enable ? veh.id === settingFilter.filter.value : veh
      )
      .filter((veh) =>
        carBrandFilter.enable ? veh.brand === carBrandFilter.filter.value : veh
      );

    return { ...settings, items: filtered };
  }
);

export const selectSettingSort = (state) => state.settings.sortCases;

export const { setSortFunc } = settingSlice.actions;

export default settingSlice.reducer;
