import { createSlice } from '@reduxjs/toolkit';

export const driversSlice = createSlice({
  name: 'drivers',
  initialState: [
    {
      id: '1',
      name: 'Michał',
      surname: 'Kokosiński',
      label: 'Szef'
    },
    {
      id: '2',
      name: 'Dawid',
      surname: 'Świdurki',
      label: 'Świdur'
    },
    {
      id: '3',
      name: 'Marcin',
      surname: 'Ławniczak',
      label: 'Poseł'
    },
    {
      id: '4',
      name: 'Jolanta',
      surname: 'Szmyl',
      label: 'Zarząd'
    },
  ],
  reducers: {
    func: (state) => {
      //function body
    },
  },
});

export const selectDrivers = (state) => state.drivers;

export const { next } = driversSlice.actions;

export default driversSlice.reducer;
