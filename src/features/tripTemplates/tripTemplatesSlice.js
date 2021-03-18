import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
import { selectFilters } from '../templates/filterSlice';
import { firestore, firestoreFunctions } from '../../app/firebase/firebase';
import { compareDates, getNowString } from '../../utils/dateUtils';
import { FETCH_STATUS } from '../../utils/constants';
import { toast } from 'react-toastify';

export const fetchTripTemplates = createAsyncThunk(
  'tripTemplates/fetchTripTemplates',
  async (arg = 1, thunkAPI) => {
    const currUser = thunkAPI.getState().auth.user;

    const tripTemplates = [];
    const coll = await firestore
      .collection('TripTemplates')
      .where('companyId', '==', currUser.companyId)
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

      tripTemplates.push({ ...data, id: doc.id });
    });

    return tripTemplates;
  },
);

export const addTripTemplate = createAsyncThunk(
  'records/addTripTemplate',
  async (newTemplate, thunkAPI) => {
    try {
      const currUser = thunkAPI.getState().auth.user;

      const template = {
        name: newTemplate.name,
        purpose: newTemplate.purpose,
        stops: newTemplate.stops,
        companyId: currUser.companyId,
        createdBy: currUser.id,
        created: firestoreFunctions.FieldValue.serverTimestamp(),
        active: true,
      };

      const doc = await firestore.collection('TripTemplates').add(template);

      return {
        ...template,
        id: doc.id,
        created: template.created.toDate().toString(),
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const editTripTemplate = createAsyncThunk(
  'records/editTripTemplate',
  async (editedTemplate, thunkAPI) => {
    try {
      const currUser = thunkAPI.getState().auth.user;

      const template = {
        name: editedTemplate.name,
        purpose: editedTemplate.purpose,
        stops: editedTemplate.stops,
        updatedBy: currUser.id,
        updated: firestoreFunctions.FieldValue.serverTimestamp(),
      };

      firestore
        .collection('TripTemplates')
        .doc(editedTemplate.id)
        .update(template);

      return { ...template, id: editedTemplate.id, updated: getNowString() };
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const deleteTripTemplate = createAsyncThunk(
  'tripTemplates/deleteTripTemplate',
  (deletedId, thunkAPI) => {
    try {
      firestore
        .collection('TripTemplates')
        .doc(deletedId)
        .update({ active: false });

      return deletedId;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const sortMethods = {
  Data: {
    asc: (a, b) => compareDates(a.date, b.date),
    desc: (a, b) => compareDates(b.date, a.date),
  },
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
    [fetchTripTemplates.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchTripTemplates.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'succeeded';
    },
    [fetchTripTemplates.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },

    [addTripTemplate.pending]: (state, action) => {
      state.status = FETCH_STATUS.LOADING;
    },
    [addTripTemplate.fulfilled]: (state, { payload }) => {
      state.status = FETCH_STATUS.SUCCESS;
      state.items.push(payload);
      toast.success('Poprawnie dodano nowy szablon');
    },
    [addTripTemplate.rejected]: (state, action) => {
      state.status = FETCH_STATUS.ERROR;
      console.error('err', action);
      state.error = action.error.message;
      toast.error(action.payload);
    },

    [editTripTemplate.pending]: (state, action) => {
      state.status = FETCH_STATUS.LOADING;
    },
    [editTripTemplate.fulfilled]: (state, { payload }) => {
      state.status = FETCH_STATUS.SUCCESS;
      state.items = state.items.map((template) =>
        template.id === payload.id ? { ...template, ...payload } : template,
      );
      toast.success('Poprawnie edytowano szablon');
    },
    [editTripTemplate.rejected]: (state, action) => {
      state.status = FETCH_STATUS.ERROR;
      state.error = action.error.message;
      toast.error(action.payload);
    },

    [deleteTripTemplate.pending]: (state, action) => {
      state.status = FETCH_STATUS.LOADING;
    },
    [deleteTripTemplate.fulfilled]: (state, { payload }) => {
      state.status = FETCH_STATUS.SUCCESS;
      state.items = state.items.map((template) =>
        template.id === payload ? { ...template, active: false } : template,
      );
      toast.success('Poprawnie usunięto szblon');
    },
    [deleteTripTemplate.rejected]: (state, action) => {
      state.status = FETCH_STATUS.ERROR;
      state.error = action.error.message;
      toast.error(action.payload);
    },
  },
});

const tips = (state) => state.tripTemplates;

export const selectTripTemplates = (state) =>
  state.tripTemplates.items.filter((template) => template.active);

export const selectFilteredTripTemplates = createSelector(
  [selectTripTemplates, selectFilters],
  (tripTemplates, filters) => {
    const { tripTemplateFilter, carBrandFilter } = filters;

    const filtered = tripTemplates.items
      .filter((veh) =>
        tripTemplateFilter.enable
          ? veh.id === tripTemplateFilter.filter.value
          : veh,
      )
      .filter((veh) =>
        carBrandFilter.enable ? veh.brand === carBrandFilter.filter.value : veh,
      );

    return { ...tripTemplates, items: filtered };
  },
);

export const selectTripTemplateSort = (state) => state.tripTemplates.sortCases;

export const selectTripTemplateById = (state, templateId) =>
  state.tripTemplates.items.find((t) => t.id === templateId);

export const { setSortFunc } = tripTemplateSlice.actions;

export default tripTemplateSlice.reducer;
