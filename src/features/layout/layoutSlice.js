import { createSlice } from '@reduxjs/toolkit';

export const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
    isMobile: false,
    IsLaptop: false,
    isMobileKeyboard: false,
    siteSize: {height: 0, width: 0}
  },
  reducers: {
    func: (state) => {
      //function body
    },
    setIsMobile: (state, payload) => {
      state.isMobile = payload.payload;
    },
    setIsLaptop: (state, payload) => {
      state.IsLaptop = payload.payload;
    },
    setSiteSize: (state, payload) => {
      state.siteSize = payload.payload;
    },
    setIsMobileKeyboard: (state, payload) => {
      state.isMobileKeyboard = payload.payload;
    },
  },
});

export const selectIsMobile = (state) => state.layout.isMobile;

export const selectIsLaptop = (state) => state.layout.IsLaptop;

export const selectSiteSize = (state) => state.layout.siteSize;

export const selectIsMobileKeyboard = (state) =>
  state.layout.isMobileKeyboard;

export const { setIsMobile, setIsLaptop, setSiteSize, setIsMobileKeyboard } = layoutSlice.actions;

export default layoutSlice.reducer;
