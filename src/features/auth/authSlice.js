import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchAuth = createAsyncThunk(
  'auth/fetchAuth',
  async (arg = 1, thunkAPI) => {
    const resp = await fetch(
      `https://run.mocky.io/v3/7578b0e6-25d8-4b7d-936c-547f891fd35f`
    );

    return await resp.json();
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    setUser: (state, payload) => {
      console.log(payload);
      state.user = payload.payload;
    },
  },
  extraReducers: {
    [fetchAuth.pending]: (state, action) => {
      state.status = 'loading';
    },

    [fetchAuth.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.user = {...action.payload.user};
    },

    [fetchAuth.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export const selectUser = (state) => state.auth.user;

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
