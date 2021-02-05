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
      const data = doc.data();
      tripTemplates.push({ ...data, id: doc.id });
    });

    return tripTemplates;
  }
);

export const addUser = createAsyncThunk(
  'records/addUser',
  async (arg, thunkAPI) => {
    const currUser = thunkAPI.getState().auth.user;

    console.log(currUser);

    const newUser = {
      name: arg.name,
      surname: arg.surname,
      label: arg.label,
      eMail: arg.eMail,
      isDriver: arg.isDriver,
      isAppUser: arg.isAppUser,
      isConnectedUser: arg.isAppUser,
      password: arg.isAppUser,
      companyId: currUser.companyId,
      createdBy: currUser.id,
      created: firestoreFunctions.FieldValue.serverTimestamp(),
      active: true
    };

    return await firestore
      .collection('Users')
      .add(newUser)
      .catch((err) => {
        console.log(err);
        return thunkAPI.rejectWithValue(err.toString());
      });
  }
);

export const editTripTemplate = createAsyncThunk(
  'records/editUser',
  async (arg, thunkAPI) => {
    const currUser = thunkAPI.getState().auth.user;

    const editedUser = {
      name: arg.name,
      surname: arg.surname,
      label: arg.label,
      eMail: arg.eMail,
      isDriver: arg.isDriver,
      isAppUser: arg.isAppUser,
      updatedBy: currUser.id,
      updated: firestoreFunctions.FieldValue.serverTimestamp()
    };

    if (arg.isAppUser) {
      //TODO: SignUp
    }

    firestore
      .collection('Users')
      .doc(arg.id)
      .update(editedUser)
      .catch((err) => {
        return thunkAPI.rejectWithValue(err);
      });
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
      state.items = action.payload;
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
