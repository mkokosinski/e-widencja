import { createSlice } from '@reduxjs/toolkit';

export const vehicleSlice = createSlice({
  name: 'vehicles',
  initialState: [
    {
      id: '1',
      name: 'Nowe Picanto',
      mark: 'KIA',
      model: 'Picanto',
      registrationNumber: 'SK 999999',
      odometer: 4503.4,
      checkupDate: '2020-10-02'
    },
    {
      id: '2',
      name: 'Stare Picanto',
      mark: 'KIA',
      model: 'Picanto',
      registrationNumber: 'SK 888888',
      odometer: 18293.2,
      checkupDate: '2020-10-02'
    },
    {
      id: '3',
      name: 'Ceed',
      mark: 'KIA',
      model: 'Ceed',
      registrationNumber: 'SK 777777',
      odometer: 124503.1,
      checkupDate: '2020-10-02'
    },
    {
      id: '4',
      name: 'Venga',
      mark: 'KIA',
      model: 'Venga',
      registrationNumber: 'SK 666666',
      odometer: 74023.4,
      checkupDate: '2020-10-02'
    },
  ],
  reducers: {
    func: (state) => {
      //function body
    },
  },
});

export const selectVehicles = (state) => state.vehicles;

export const { next } = vehicleSlice.actions;

export default vehicleSlice.reducer;
