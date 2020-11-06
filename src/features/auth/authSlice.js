import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { auth, firestore } from '../../app/firebase/firebase';

export const authorize = createAsyncThunk(
  'auth/authorize',
  async (arg, thunkAPI) => {
    if (arg && arg.user) {
      return await getFirebaseUser(arg.user.uid);
    } else return thunkAPI.rejectWithValue('user not exists');
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
      state.status = 'pending';
    },

    [signIn.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.user = action.payload;
      state.error = null;
    },

    [signIn.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },

    [signOut.pending]: (state, action) => {
      state.status = 'pending';
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

export const selectUser = (state) => state.auth.user;

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
