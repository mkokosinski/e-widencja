import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { auth, firestore } from '../../app/firebase/firebase';
import { FETCH_STATUS } from '../../utils/fetchUtils';

export const authorize = createAsyncThunk(
  'auth/authorize',
  async (arg, thunkAPI) => {
    if (arg && arg.user) {
      return await getFirebaseUser(arg.user.uid);
    } else return thunkAPI.rejectWithValue('user not exists');
  }
);

export const signUpEmail = createAsyncThunk(
  'auth/signUpEmail',
  async (arg, thunkAPI) => {
    const { email, password } = arg;
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => console.log(res));
  }
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
    console.log(err);
    if (err.code === 'auth/internal-error') {
      return thunkAPI.rejectWithValue(
        'Przepraszamy, serwis chwilowo niedostępny. Pracujemy nad tym. Spróbuj ponownie za chwilę.'
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
  }
);

export const getFirebaseUser = async (userId) => {
  try {
    const user = await firestore.collection('Users').doc(userId).get();
    return user.data();
  } catch (err) {
    console.log(err);
  }
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle',
    error: null
  },
  reducers: {
    setUser: (state, action) => {
      const { payload } = action;
      state.user = payload;
    }
  },
  extraReducers: {
    [signIn.pending]: (state, action) => {
      state.status = FETCH_STATUS.LOADING;
    },

    [signIn.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      toast.success('Poprawnie zalogowano');
      state.user = action.payload;
      state.error = null;
    },

    [signIn.rejected]: (state, action) => {
      state.status = 'failed';
      console.log(action);
      state.error = action.payload;
      toast.error(`Błąd:
      ${action.payload}`);
    },

    [signOut.pending]: (state, action) => {
      state.status = FETCH_STATUS.LOADING;
    },

    [signOut.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.user = null;
    },

    [signOut.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },

    [authorize.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.user = action.payload;
    },

    [authorize.rejected]: (state, action) => {
      state.status = 'failed';
    }
  }
});

export const selectAuth = (state) => state.auth;

export const selectFbUser = (state) => state.auth.user;

// export const selectUser = (state) =>
//   createSelector([selectAuth, selectUsers], (auth, users) => {
//     const fbUser = auth.user;
//     const appUser = users.items.find((user) => user.id === fbUser.id);
//     console.log(users.items);

//     return appUser;
//   });

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
