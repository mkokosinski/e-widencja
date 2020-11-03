import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { auth } from '../../app/firebase/firebase';

export const fetchAuth = createAsyncThunk(
  'auth/fetchAuth',
  async (arg = 1, thunkAPI) => {
    const resp = await fetch(
      `https://run.mocky.io/v3/7578b0e6-25d8-4b7d-936c-547f891fd35f`
    );

    return await resp.json();
  }
);

auth.onAuthStateChanged(function (user) {
  console.log('user', user);
  if (user) {
    // User is signed in.
  } else {
    // No user is signed in.
  }
});

export const signIn = createAsyncThunk('auth/signIn', async (arg, thunkAPI) => {
  const { login, password } = arg;

  // auth.onAuthStateChanged(function (user) {
  //   console.log('user', user);
  //   if (user) {
  //     // User is signed in.
  //   } else {
  //     // No user is signed in.
  //   }
  // });
  return await auth.signInWithEmailAndPassword(login, password);
});
export const signOut = createAsyncThunk(
  'auth/signOut',
  async (arg, thunkAPI) => {
    const { login, password } = arg;

    // auth.onAuthStateChanged(function (user) {
    //   console.log('user', user);
    //   if (user) {
    //     // User is signed in.
    //   } else {
    //     // No user is signed in.
    //   }
    // });
    return await auth.signOut();
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle',
    error: null
  },
  reducers: {
    setUser: (state, payload) => {
      console.log(payload);
      state.user = payload.payload;
    }
  },
  extraReducers: {
    [fetchAuth.pending]: (state, action) => {
      state.status = 'loading';
    },

    [fetchAuth.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.user = { ...action.payload.user };
    },

    [fetchAuth.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },

    [signIn.pending]: (state, action) => {
      state.status = 'loading';
    },

    [signIn.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.error = null;
    },

    [signIn.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },

    [signOut.pending]: (state, action) => {
      state.status = 'loading';
    },

    [signOut.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.user = null;
    },

    [signOut.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    }
  }
});

export const selectUser = (state) => state.auth.user;

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
