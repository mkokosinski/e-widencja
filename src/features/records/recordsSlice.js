import { createSlice } from '@reduxjs/toolkit';

export const recordsSlice = createSlice({
  name: 'records',
  initialState: [
    {
      id: '1',
      year: '2020',
      month: 'Styczeń',
      name: 'Styczeń 2020',
      registrationNumber: 'SK 999999',
      mileage: 4503.4,
      checkupDate: '2020-10-02'
    },
    {
      id: '2',
      year: '2020',
      month: 'Luty',
      name: 'Luty 2020',
      registrationNumber: 'SK 888888',
      mileage: 18293.2,
      checkupDate: '2020-10-02'
    },
    {
      id: '3',
      year: '2020',
      month: 'Marzec',
      name: 'Marzec 2020',
      registrationNumber: 'SK 777777',
      mileage: 124503.1,
      checkupDate: '2020-10-02'
    },
    {
      id: '4',
      year: '2020',
      month: 'Kwiecień',
      name: 'Kwiecień 2020',
      registrationNumber: 'SK 666666',
      mileage: 74023.4,
      checkupDate: '2020-10-02'
    },
  ],
  reducers: {
    func: (state) => {
      //function body
    },
  },
});

export const selectRecords = (state) => state.records;

export const { next } = recordsSlice.actions;

export default recordsSlice.reducer;
