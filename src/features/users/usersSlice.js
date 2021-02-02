import {
  createSlice,
  createAsyncThunk,
  createSelector
} from '@reduxjs/toolkit';
import { selectFilters } from '../templates/filterSlice';
import {
  auth,
  authOtherUser,
  firestore,
  firestoreFunctions
} from '../../app/firebase/firebase';
import { FETCH_STATUS } from '../../utils/fetchUtils';
import { toast } from 'react-toastify';
import { signUpEmail } from '../auth/authSlice';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (arg = 1, thunkAPI) => {
    const users = [];
    const user = thunkAPI.getState().auth.user;

    const coll = await firestore
      .collection('Users')
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
      users.push({ ...data, id: doc.id });
    });

    return users;
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

    // if (arg.isAppUser) {
    //   //TODO: SignUp

    //   authOtherUser
    //     .createUserWithEmailAndPassword(newUser.eMail, 'Asd1233##')
    //     .then((res) => {
    //       console.log('res', res);
    //     })
    //     .catch((err) => {
    //       if (err.code === 'auth/email-already-in-use') {
    //         console.log(err);
    //       }
    //     });
    // }

    return await firestore
      .collection('Users')
      .add(newUser)
      .catch((err) => {
        console.log(err);
        return thunkAPI.rejectWithValue(err.toString());
      });
  }
);

export const editUser = createAsyncThunk(
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

export const deleteUser = createAsyncThunk(
  'records/deleteUser',
  async (arg, thunkAPI) => {
    const currUser = thunkAPI.getState().auth.user;

    firestore
      .collection('Users')
      .doc(arg)
      .update({
        active: false,
        deletedBy: currUser.id,
        deleted: firestoreFunctions.FieldValue.serverTimestamp()
      })
      .catch((err) => {
        return thunkAPI.rejectWithValue(err);
      });
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
    },
    [addUser.pending]: (state, action) => {
      state.status = FETCH_STATUS.LOADING;
    },

    [addUser.fulfilled]: (state, action) => {
      state.status = FETCH_STATUS.SUCCESS;
      toast.success('Poprawnie dodano nowego użytkownika');
    },

    [addUser.rejected]: (state, action) => {
      state.status = FETCH_STATUS.ERROR;
      state.error = action.payload;
      toast.error(action.payload);
    },
    [editUser.pending]: (state, action) => {
      state.status = FETCH_STATUS.LOADING;
    },

    [editUser.fulfilled]: (state, action) => {
      state.status = FETCH_STATUS.SUCCESS;
      toast.success('Poprawnie edytowano użytkownika');
    },

    [editUser.rejected]: (state, action) => {
      state.status = FETCH_STATUS.ERROR;
      state.error = action.payload;
      toast.error(action.payload);
    },
    [deleteUser.pending]: (state, action) => {
      state.status = FETCH_STATUS.LOADING;
    },

    [deleteUser.fulfilled]: (state, action) => {
      state.status = FETCH_STATUS.SUCCESS;
      toast.success('Poprawnie usunięto użytkownika');
    },

    [deleteUser.rejected]: (state, action) => {
      state.status = FETCH_STATUS.ERROR;
      toast.error(action.payload);
    }
  }
});

export const selectUsers = (state) => state.users;

export const selectFilteredUsers = createSelector(
  [selectUsers, selectFilters],
  (users, filters) => {
    const { userFilter, userDriverFilter } = filters;

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

export const selectDrivers = (state) => {
  return state.users.items.filter((user) => user.isDriver);
};

export const selectUserById = (state, userId) =>
  state.users.items.find((user) => user.id === userId);

export const { next } = usersSlice.actions;

export default usersSlice.reducer;
