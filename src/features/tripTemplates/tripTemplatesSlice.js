import {
  createSlice,
  createAsyncThunk,
  createSelector
} from '@reduxjs/toolkit';
import { selectFilters } from '../templates/filterSlice';
import { firestore } from '../../app/firebase/firebase';
import { selectRecordById, selectRecords } from '../records/recordsSlice';
import { compareDates } from '../../utils/dateUtils';

export const fetchTripTemplates = createAsyncThunk(
  'tripTemplates/fetchTripTemplates',
  async (arg = 1, thunkAPI) => {
    const tripTemplates = [];
    const coll = await firestore.collection('TripTemplates').get();

    coll.forEach((doc) => {
      tripTemplates.push({ ...doc.data(), id: doc.id });
    });

    return tripTemplates;
  }
);

const sortMethods = {
  Data: {
    asc: (a, b) => compareDates(a.date, b.date),
    desc: (a, b) => compareDates(b.date, a.date)
  }
};

export const tripTemplateSlice = createSlice({
  name: 'tripTemplates',
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
          { label: 'od najstarszych', condition: 'asc' }
        ]
      }
    ]
  },
  reducers: {
    setSortFunc: (state, action) => {
      console.log(action);
      const { payload } = action;
      const entry = Object.entries(payload)[0];

      state.sortFunc = { name: entry[0], condition: entry[1] };
    }
  },
  extraReducers: {
    [fetchTripTemplates.pending]: (state, action) => {
      state.status = 'loading';
    },

    [fetchTripTemplates.fulfilled]: (state, action) => {
      const templates = action.payload.map((template) => ({
        ...template,
        label: template.stops.map((s) => s.place).join(' - ')
      }));
      state.items = templates;
      state.status = 'succeeded';
    },

    [fetchTripTemplates.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    }
  }
});

const tips = (state) => state.tripTemplates;

export const selectTripTemplates = (state) => state.tripTemplates.items;

export const selectFilteredTripTemplates = createSelector(
  [selectTripTemplates, selectFilters],
  (tripTemplates, filters) => {
    const { tripTemplateFilter, carBrandFilter } = filters;

    const filtered = tripTemplates.items
      .filter((veh) =>
        tripTemplateFilter.enable
          ? veh.id === tripTemplateFilter.filter.value
          : veh
      )
      .filter((veh) =>
        carBrandFilter.enable ? veh.brand === carBrandFilter.filter.value : veh
      );

    return { ...tripTemplates, items: filtered };
  }
);

export const selectTripTemplateSort = (state) => state.tripTemplates.sortCases;

export const selectTripTemplateById = (state, templateId) =>
  state.tripTemplates.items.find((t) => t.id === templateId);

export const { setSortFunc } = tripTemplateSlice.actions;

export default tripTemplateSlice.reducer;
