import { createSlice } from '@reduxjs/toolkit';

export const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
    isMobile: false,
    IsLaptop: false,
    isMobileKeyboard: false,
    initSiteSize: {height: 0, width: 0},
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
    setInitSiteSize: (state, payload) => {
      state.initSiteSize = payload.payload;
    },
    setIsMobileKeyboard: (state, action) => {
      console.log(action);
      state.isMobileKeyboard = action.payload;
    },
  },
});

export const selectIsMobile = (state) => state.layout.isMobile;

export const selectIsLaptop = (state) => state.layout.IsLaptop;

export const selectInitSize = (state) => state.layout.initSiteSize;


export const selectIsMobileKeyboard = (state) =>
  state.layout.isMobileKeyboard;

export const { setIsMobile, setIsLaptop, setInitSiteSize, setIsMobileKeyboard } = layoutSlice.actions;

export default layoutSlice.reducer;
