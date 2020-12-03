import {
  createSlice,
  createAsyncThunk,
  createSelector
} from '@reduxjs/toolkit';
import { firestore } from '../../app/firebase/firebase';
import { makes } from '../../utils/carData';
import { toCapitalize } from '../../utils/stringUtils';
import { selectCarModels } from './carModelsSlice';

export const fetchCarBrands = createAsyncThunk(
  'carBrands/fetchCarBrands',
  async (arg = 1, thunkAPI) => {
    const carBrands = [];
    const coll = await firestore.collection('CarBrands').get();

    coll.forEach((doc) => {
      carBrands.push({ ...doc.data(), id: doc.id });
    });
    return carBrands;
  }
);

export const carBrandSlice = createSlice({
  name: 'carBrands',
  initialState: {
    status: 'idle',
    items: [],
    error: null
  },
  reducers: {},
  extraReducers: {
    [fetchCarBrands.pending]: (state, action) => {
      state.status = 'loading';
    },

    [fetchCarBrands.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.items = [...action.payload];
    },

    [fetchCarBrands.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    }
  }
});

export const selectCarBrands = (state) => state.carBrands.items;

export const selectCarBrandById = (state,brand) => state.carBrands.items.find(br => br.label.toLowerCase() === brand.toLowerCase())

  export default carBrandSlice.reducer;