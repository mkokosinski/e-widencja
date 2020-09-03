import { createSlice } from "@reduxjs/toolkit";

export const recordsSlice = createSlice({
  name: "records",
  initialState: [
    {
      id: '1',
      company: "KAMSOFT S.A.",
      vehicleId: '1',
      month: "Czerwiec",
      year: 2020,
      get name() {
        return `${this.month} ${this.year}`
      },
    },
    {
      id: '2',
      company: "KAMSOFT S.A.",
      vehicleId: '2',
      month: "Lipiec",
      year: 2020,
      get name() {
        return `${this.month} ${this.year}`
      },
    },
    {
      id: '3',
      company: "KAMSOFT S.A.",
      vehicleId: '2',
      month: "Sierpień",
      year: 2020,
      get name() {
        return `${this.month} ${this.year}`
      },
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
