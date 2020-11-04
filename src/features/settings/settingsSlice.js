import {
  createSlice,
  createAsyncThunk,
  createSelector
} from '@reduxjs/toolkit';
import { months } from '../../utils/dateUtils';
import { selectFilters } from '../templates/filterSlice';
import { selectVehicleById } from '../vehicles/vehiclesSlice';
import { auth, firestore } from '../../app/firebase/firebase';

export const fetchSettings = createAsyncThunk(
  'settings/fetchsettings',
  async (arg = 1, thunkAPI) => {
    try {
      const settings = [];

      const user = thunkAPI.getState().auth.user;
      if (user) {
        const coll = await firestore
          .collection('Settings')
          .where('permissions', 'array-contains', user.role)
          .get();

        coll.forEach((doc) => {
          console.log(doc.data());
          settings.push(doc.data());
        });

        console.log('ssss', settings);
      }

      return settings;
    } catch (err) {
      console.log(err);
    }
  }
);

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    status: 'idle',
    items: [],
    error: null
  },
  reducers: {},
  extraReducers: {
    [fetchSettings.pending]: (state, action) => {
      state.status = 'loading';
    },

    [fetchSettings.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.items = action.payload;
    },

    [fetchSettings.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    }
  }
});

const sortSettings = (a, b) => a.year - b.year || a.month - b.month;

export const selectSettings = (state) => {
  const { settings } = state;
  const withVehicles = [];

  settings.items.forEach((rec) => {
    const vehicle = selectVehicleById(state, rec.vehicleId);
    withVehicles.push({ ...rec, vehicle });
  });

  withVehicles.sort(sortSettings);

  return { ...settings, items: withVehicles };
};

export const selectFiteredSettings = createSelector(
  [selectSettings, selectFilters],
  (settings, filters) => {
    const { vehicleFilter, dateFilter } = filters;

    const filtered = settings.items
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
      });

    return { ...settings, items: filtered };
  }
);

export const selectSettingById = (state, settingId) => {
  const setting = state.settings.items.find(
    (setting) => setting.id === settingId
  );
  const vehicle = state.vehicles.items.find(
    (vehicle) => vehicle.id === setting.vehicleId
  );
  return { ...setting, vehicle: { ...vehicle } };
};

export const selectActiveVehicleFilter = (state) =>
  state.settings.vehicleFilter.filter;

const searchMinDate = (arr) => {
  if (arr.length > 0) {
    const dates = arr.map((item) => item.year);
    const min = Math.min(...dates);
    return min;
  } else return new Date();
};

export const selectEldestDate = (state) => searchMinDate(state.settings.items);

export const { setDateFilter, setVehicleFilter } = settingsSlice.actions;

export default settingsSlice.reducer;
