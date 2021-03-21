import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { firestore } from '../../firebase/firebase';
import { FETCH_STATUS } from '../../utils/constants';

export const fetchCarBrands = createAsyncThunk(
  'carBrands/fetchCarBrands',
  async (arg = 1, thunkAPI) => {
    const carBrands = [];
    const coll = await firestore.collection('CarBrands').get();

    coll.forEach((doc) => {
      carBrands.push({ ...doc.data(), id: doc.id });
    });
    return carBrands;
  },
);

export const carBrandSlice = createSlice({
  name: 'carBrands',
  initialState: {
    status: 'idle',
    items: [],
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchCarBrands.pending]: (state, action) => {
      state.status = FETCH_STATUS.LOADING;
    },

    [fetchCarBrands.fulfilled]: (state, action) => {
      state.status = FETCH_STATUS.SUCCESS;
      state.items = [...action.payload];
    },

    [fetchCarBrands.rejected]: (state, action) => {
      state.status = FETCH_STATUS.ERROR;
      state.error = action.error.message;
    },
  },
});

export const selectCarBrands = (state) => state.carBrands.items;

export const selectCarBrandById = (state, brand) =>
  state.carBrands.items.find(
    (br) => br.label.toLowerCase() === brand.toLowerCase(),
  );

export default carBrandSlice.reducer;
