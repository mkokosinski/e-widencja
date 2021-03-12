import { createSlice } from '@reduxjs/toolkit';

export const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
    isMobile: false,
    IsLaptop: false,
    isMobileKeyboard: false,
    initSiteSize: { height: 0, width: 0 },
    siteSize: { height: 0, width: 0 },
  },
  reducers: {
    setCurrSiteSize: (state, { payload }) => {
      state.siteSize = payload;
    },
    setIsMobile: (state, { payload }) => {
      state.isMobile = payload;
    },
    setIsLaptop: (state, { payload }) => {
      state.IsLaptop = payload;
    },
    setInitSiteSize: (state, { payload }) => {
      state.initSiteSize = payload;
    },
    setIsMobileKeyboard: (state, action) => {
      state.isMobileKeyboard = action.payload;
    },
  },
});

export const selectIsMobile = (state) => state.layout.isMobile;

export const selectIsLaptop = (state) => state.layout.IsLaptop;

export const selectInitSize = (state) => state.layout.initSiteSize;

export const selectSiteSize = (state) => state.layout.siteSize;

export const selectIsMobileKeyboard = (state) => state.layout.isMobileKeyboard;

export const {
  setIsMobile,
  setIsLaptop,
  setInitSiteSize,
  setCurrSiteSize,
  setIsMobileKeyboard,
} = layoutSlice.actions;

export default layoutSlice.reducer;
