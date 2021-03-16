import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { auth, authOtherUser, firestore } from '../../app/firebase/firebase';
import { FETCH_STATUS } from '../../utils/constants';

export const authorize = createAsyncThunk(
  'auth/authorize',
  async (arg, thunkAPI) => {
    console.log(arg);
    if (arg && arg.user) {
      const data = await getFirebaseUser(arg.user.uid);
      if (data.created) {
        data.created = data.created.toDate().toString();
      }

      if (data.updated) {
        data.updated = data.updated.toDate().toString();
      }

      if (data.deleted) {
        data.deleted = data.deleted.toDate().toString();
      }
      return { ...data, id: arg.user.uid };
    } else return thunkAPI.rejectWithValue('user not exists');
  },
);

export const signUpEmail = createAsyncThunk(
  'auth/signUpEmail',
  async (arg, thunkAPI) => {
    const { email, password } = arg;
    return await authOtherUser
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
);

export const signIn = createAsyncThunk('auth/signIn', async (arg, thunkAPI) => {
  try {
    const { email, password } = arg;
    const isAuth = await auth.signInWithEmailAndPassword(email, password);

    if (isAuth) {
      const user = await getFirebaseUser(isAuth.user.uid);
      return user;
    }
  } catch (err) {
    console.error(err);
    if (err.code === 'auth/internal-error') {
      return thunkAPI.rejectWithValue(
        'Przepraszamy, serwis chwilowo niedostępny. Pracujemy nad tym. Spróbuj ponownie za chwilę.',
      );
    } else {
      return thunkAPI.rejectWithValue('Niepoprawne dane logowania!');
    }
  }
});

export const signOut = createAsyncThunk(
  'auth/signOut',
  async (arg, thunkAPI) => {
    const res = await auth.signOut();
    return res;
  },
);

export const getFirebaseUser = async (userId) => {
  try {
    const user = await firestore.collection('Users').doc(userId).get();
    return user.data();
  } catch (err) {
    console.error(err);
  }
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      const { payload } = action;
      state.user = payload;
    },
  },
  extraReducers: {
    [signIn.pending]: (state, action) => {
      state.status = FETCH_STATUS.LOADING;
    },

    [signIn.fulfilled]: (state, action) => {
      state.status = FETCH_STATUS.SUCCESS;
      toast.success('Poprawnie zalogowano');
      state.user = action.payload;
      state.error = null;
    },

    [signIn.rejected]: (state, action) => {
      state.status = FETCH_STATUS.ERROR;
      state.error = action.payload;
      toast.error(`Błąd: ${action.payload}`);
    },

    [signUpEmail.pending]: (state, action) => {
      state.status = FETCH_STATUS.LOADING;
    },

    [signUpEmail.fulfilled]: (state, action) => {
      state.status = FETCH_STATUS.SUCCESS;
      toast.success('Poprawnie zarejestrowano');
      state.error = null;
    },

    [signUpEmail.rejected]: (state, action) => {
      state.status = FETCH_STATUS.ERROR;
      state.error = action.payload;
      toast.error(`Błąd: ${action.payload}`);
    },

    [signOut.pending]: (state, action) => {
      state.status = FETCH_STATUS.LOADING;
    },

    [signOut.fulfilled]: (state, action) => {
      state.status = FETCH_STATUS.SUCCESS;
      state.user = null;
    },

    [signOut.rejected]: (state, action) => {
      state.status = FETCH_STATUS.ERROR;
      state.error = action.error.message;
    },

    [authorize.fulfilled]: (state, action) => {
      state.status = FETCH_STATUS.SUCCESS;
      state.user = action.payload;
    },

    [authorize.rejected]: (state, action) => {
      state.status = FETCH_STATUS.ERROR;
    },
  },
});

export const selectAuth = (state) => state.auth;

export const selectFbUser = (state) => state.auth.user;

// export const selectUser = (state) =>
//   createSelector([selectAuth, selectUsers], (auth, users) => {
//     const fbUser = auth.user;
//     const appUser = users.items.find((user) => user.id === fbUser.id);
//     console.error(users.items);

//     return appUser;
//   });

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
