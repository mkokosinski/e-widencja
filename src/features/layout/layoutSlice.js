import { createSlice } from '@reduxjs/toolkit';

export const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
      isMobile: false
  },
  reducers: {
    func: (state) => {
      //function body
    },
    setIsMobile: (state, payload) => {
      state.isMobile = payload.payload;
    },
  },
});

export const selectIsMobile = (state) => state.layout.isMobile;

export const { setIsMobile } = layoutSlice.actions;

export default layoutSlice.reducer;
