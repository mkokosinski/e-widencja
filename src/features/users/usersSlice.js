import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
import { selectFilters } from '../templates/filterSlice';
import { firestore, firestoreFunctions } from '../../app/firebase/firebase';
import { FETCH_STATUS } from '../../utils/constants';
import { toast } from 'react-toastify';
import { getNowString } from '../../utils/dateUtils';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (arg = 1, thunkAPI) => {
    const users = [];
    const user = thunkAPI.getState().auth.user;

    const coll = await firestore
      .collection('Users')
      .where('companyId', '==', user.companyId)
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
      users.push({ ...data, id: doc.id });
    });

    return users;
  },
);

export const addUser = createAsyncThunk(
  'records/addUser',
  async (user, thunkAPI) => {
    try {
      const currUser = thunkAPI.getState().auth.user;

      const newUser = {
        name: user.name,
        surname: user.surname,
        label: user.label,
        email: user.email,
        isDriver: user.isDriver,
        companyId: currUser.companyId,
        createdBy: currUser.id,
        created: firestoreFunctions.FieldValue.serverTimestamp(),
        active: true,
        role: 'User',
      };

      const doc = await firestore.collection('Users').add(newUser);

      return {
        ...newUser,
        id: doc.id,
        created: getNowString(),
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const editUser = createAsyncThunk(
  'records/editUser',
  async (user, thunkAPI) => {
    try {
      const currUser = thunkAPI.getState().auth.user;

      const editedUser = {
        name: user.name,
        surname: user.surname,
        label: user.label,
        email: user.email,
        isDriver: user.isDriver,
        updatedBy: currUser.id,
        updated: firestoreFunctions.FieldValue.serverTimestamp(),
      };

      if (user.isAppUser) {
        //TODO: SignUp
      }

      firestore.collection('Users').doc(user.id).update(editedUser);

      return { ...user, ...editedUser, updated: getNowString() };
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const deleteUser = createAsyncThunk(
  'records/deleteUser',
  async (deletedUserId, thunkAPI) => {
    try {
      const currUser = thunkAPI.getState().auth.user;

      firestore.collection('Users').doc(deletedUserId).update({
        active: false,
        deletedBy: currUser.id,
        deleted: firestoreFunctions.FieldValue.serverTimestamp(),
      });

      return deletedUserId;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState: { status: 'idle', items: [], error: null },
  reducers: {
    func: (state) => {
      //function body
    },
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
          },
        })),
      ];
    },

    [fetchUsers.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },

    [addUser.pending]: (state, action) => {
      state.status = FETCH_STATUS.LOADING;
    },
    [addUser.fulfilled]: (state, { payload }) => {
      state.status = FETCH_STATUS.SUCCESS;
      state.items.push(payload);
      toast.success('Poprawnie dodano nowego użytkownika');
    },
    [addUser.rejected]: (state, { payload }) => {
      state.status = FETCH_STATUS.ERROR;
      state.error = payload.message;
      toast.error(payload.message);
    },

    [editUser.pending]: (state, action) => {
      state.status = FETCH_STATUS.LOADING;
    },
    [editUser.fulfilled]: (state, { payload }) => {
      state.status = FETCH_STATUS.SUCCESS;
      state.items = state.items.map((user) =>
        user.id === payload.id ? { ...user, ...payload } : user,
      );
      toast.success('Poprawnie edytowano użytkownika');
    },
    [editUser.rejected]: (state, action) => {
      state.status = FETCH_STATUS.ERROR;
      state.error = action.error.message;
      toast.error(action.error.message);
    },

    [deleteUser.pending]: (state, action) => {
      state.status = FETCH_STATUS.LOADING;
    },
    [deleteUser.fulfilled]: (state, { payload }) => {
      state.status = FETCH_STATUS.SUCCESS;
      state.items = state.items.filter((user) => user.id !== payload);
      toast.success('Poprawnie usunięto użytkownika');
    },
    [deleteUser.rejected]: (state, action) => {
      state.status = FETCH_STATUS.ERROR;
      toast.error(action.error.message);
    },
  },
});

export const selectUsers = (state) => ({
  ...state.users,
  items: state.users.items.filter((user) => user.active),
});

export const selectFilteredUsers = createSelector(
  [selectUsers, selectFilters],
  (users, filters) => {
    const { userFilter, userDriverFilter } = filters;

    const filtered = users.items
      .filter((user) =>
        userFilter.enable ? user.id === userFilter.filter.value : user,
      )
      .filter((user) =>
        userDriverFilter.enable
          ? user.isDriver === userDriverFilter.filter
          : user,
      );

    return { ...users, items: filtered };
  },
);

export const selectDrivers = (state) => {
  return state.users.items.filter((user) => user.isDriver);
};

export const selectUserById = (state, userId) =>
  state.users.items.find((user) => user.id === userId);

export const { next } = usersSlice.actions;

export default usersSlice.reducer;
