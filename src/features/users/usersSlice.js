import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk(
  'vehicles/fetchUsers',
  async (arg = 1, thunkAPI) => {
    const resp = await fetch(
      `https://run.mocky.io/v3/bc54bd66-37a1-4490-b0c4-472beed48806`
    );
    return await resp.json();
  }
);

export const usersSlice = createSlice({
  name: 'users',
  initialState: { status: 'idle', users: [], error: null },
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
      state.users = [...action.payload.users];
    },

    [fetchUsers.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export const selectUsers = (state) => state.users;

export const selectUserById = (state, userId) =>
  state.users.users.find((user) => user.id === userId);

export const { next } = usersSlice.actions;

export default usersSlice.reducer;
