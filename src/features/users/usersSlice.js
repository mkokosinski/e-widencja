import {
  createSlice,
  createAsyncThunk,
  createSelector
} from '@reduxjs/toolkit';
import { selectFilters } from '../templates/filterSlice';
import firestore from '../../app/firebase/firebase';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (arg = 1, thunkAPI) => {
    const users = [];
    const coll = await firestore.collection('Users').get();

    coll.forEach((doc) => {
      users.push(doc.data());
    });

    return users;
  }
);

export const usersSlice = createSlice({
  name: 'users',
  initialState: { status: 'idle', items: [], error: null },
  reducers: {
    func: (state) => {
      //function body
    }
  },
  extraReducers: {
    [fetchUsers.pending]: (state, action) => {
      state.status = 'loading';
    },

    [fetchUsers.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.items = [
        ...action.payload.map((user) => ({
          ...user,
          get fullName() {
            return `${this.name} ${this.surname}`;
          }
        }))
      ];
    },

    [fetchUsers.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    }
  }
});

export const selectUsers = (state) => state.users;

export const selectFilteredUsers = createSelector(
  [selectUsers, selectFilters],
  (users, filters) => {
    const { userFilter, userDriverFilter } = filters;

    console.log(filters);

    const filtered = users.items
      .filter((user) =>
        userFilter.enable ? user.id === userFilter.filter.value : user
      )
      .filter((user) =>
        userDriverFilter.enable
          ? user.isDriver === userDriverFilter.filter
          : user
      );

    return { ...users, items: filtered };
  }
);

export const selectDrivers = (state) =>
  state.users.items.filter((user) => user.isDriver === true);

export const selectUserById = (state, userId) =>
  state.users.items.find((user) => user.id === userId);

export const { next } = usersSlice.actions;

export default usersSlice.reducer;
