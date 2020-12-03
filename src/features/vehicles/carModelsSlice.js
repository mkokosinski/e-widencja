import {
    createSlice,
    createAsyncThunk,
  } from '@reduxjs/toolkit';
  import { firestore } from '../../app/firebase/firebase';
  
  export const fetchCarModels = createAsyncThunk(
    'carModels/fetchCarModels',
    async (arg = 1, thunkAPI) => {
      const carModels = [];
      const models = await firestore.collection('CarModels').get();
  
      models.forEach(async(doc) => {
        carModels.push({ ...doc.data(), id: doc.id });
      });
  
      return carModels;
    }
  );
  
  export const carModelSlice = createSlice({
    name: 'carModels',
    initialState: {
      status: 'idle',
      items: [],
      error: null
    },
    reducers: {},
    extraReducers: {
      [fetchCarModels.pending]: (state, action) => {
        state.status = 'loading';
      },
  
      [fetchCarModels.fulfilled]: (state, action) => {
        state.status = 'succeeded';
        state.items = [...action.payload];
      },
  
      [fetchCarModels.rejected]: (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      }
    }
  });
  
  export const selectCarModels = (state) => state.carModels.items;
  
  export default carModelSlice.reducer;
  