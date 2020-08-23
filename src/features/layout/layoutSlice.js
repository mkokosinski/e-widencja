import { createSlice } from '@reduxjs/toolkit';

export const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
    isMobile: false,
    IsLaptop: false,
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
  },
});

export const selectIsMobile = (state) => state.layout.isMobile;

export const selectIsLaptop = (state) => state.layout.IsLaptop;

export const { setIsMobile, setIsLaptop } = layoutSlice.actions;

export default layoutSlice.reducer;
