import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { firestore, firestoreFunctions } from '../../app/firebase/firebase';
import { FETCH_STATUS } from '../../utils/constants';

export const fetchCompany = createAsyncThunk(
  'company/fetch',
  async (arg, thunkAPI) => {
    const user = thunkAPI.getState().auth.user;

    console.log(user);

    const companyDoc = await firestore
      .collection('Companies')
      .doc(user.companyId)
      .get();

    const companyData = companyDoc.data();

    if (companyData.created) {
      companyData.created = companyData.created.toDate().toString();
    }

    if (companyData.updated) {
      companyData.updated = companyData.updated.toDate().toString();
    }

    if (companyData.deleted) {
      companyData.deleted = companyData.deleted.toDate().toString();
    }

    return companyData;
  }
);

export const companySlice = createSlice({
  name: 'company',
  initialState: {
    status: FETCH_STATUS.IDLE,
    data: {},
    error: null,
  },
  extraReducers: {
    [fetchCompany.pending]: (state, action) => {
      state.status = FETCH_STATUS.LOADING;
    },
    [fetchCompany.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = FETCH_STATUS.SUCCESS;
    },
    [fetchCompany.rejected]: (state, action) => {
      state.status = FETCH_STATUS.ERROR;
      console.error('err', action);
      state.error = action.error.message;
      toast.error(action.payload);
    },
  },
});

export const selectCompany = (state) => state.company.data;

export default companySlice.reducer;
