import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { firestore, firestoreFunctions } from '../../firebase/firebase';
import { FETCH_STATUS } from '../../utils/constants';

export const fetchCompany = createAsyncThunk(
  'company/fetch',
  async (arg, thunkAPI) => {
    const user = thunkAPI.getState().auth.user;

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
  },
);

export const editCompany = createAsyncThunk(
  'company/EditCompany',
  async (companyData, thunkAPI) => {
    try {
      const currentUser = thunkAPI.getState().auth.user;

      await firestore
        .collection('Companies')
        .doc(companyData.id)
        .update({
          ...companyData,
          updatedBy: currentUser.id,
          updated: firestoreFunctions.FieldValue.serverTimestamp(),
        });

      return companyData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
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

    [editCompany.pending]: (state, action) => {
      state.status = FETCH_STATUS.LOADING;
    },
    [editCompany.fulfilled]: (state, { payload }) => {
      state.data = { ...state.data, ...payload };
      state.status = FETCH_STATUS.SUCCESS;
      toast.success('Popranie edytowano date firmy');
    },
    [editCompany.rejected]: (state, { payload }) => {
      state.status = FETCH_STATUS.ERROR;
      console.error('err', payload);
      state.error = payload;
      toast.error(
        'Wystąpił błąd podczas zapisu danych firmy, spontaktuj się z administratorem lub sprawdź szczegóły w konsoli.',
      );
    },
  },
});

export const selectCompany = (state) => state.company.data;

export default companySlice.reducer;
