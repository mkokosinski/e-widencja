import {
  createSlice,
  createAsyncThunk,
  createSelector
} from '@reduxjs/toolkit';
import { selectFilters } from '../templates/filterSlice';
import { firestore } from '../../app/firebase/firebase';
import { selectRecordById, selectRecords } from '../records/recordsSlice';
import { compareDates } from '../../utils/dateUtils';

const data = [
  {
    record: 'h9NLhJSpgYnSROODO6VK',
    date: '2020-11-02',
    tripTemplate: 'h2xYWFdsf6iqKGz9cbZK',
    purpose: 'Szkolenie',
    stops: [
      { label: 'Start', place: 'Biuro', distance: 0 },
      { label: 'Cel', place: 'Posum', distance: 8 }
    ],
    driver: 'RNOGS5sIeYzrKuMIbsCP'
  },
  {
    record: 'h9NLhJSpgYnSROODO6VK',
    date: '2020-11-03',
    tripTemplate: '',
    purpose: 'Serwis',
    stops: [
      { label: 'Start', place: 'Biuro', distance: 0 },
      { label: 'Przystanek1', place: 'Apteka', distance: 5 },
      { label: 'Cel', place: 'Posum', distance: 11 }
    ],
    driver: 'RNOGS5sIeYzrKuMIbsCP'
  },
  {
    record: '0xrTyhzI26ykZ9Le5TMC',
    date: '2020-11-06',
    tripTemplate: 'h2xYWFdsf6iqKGz9cbZK',
    purpose: 'Prezentacja',
    stops: [
      { label: 'Start', place: 'Biuro', distance: 0 },
      { label: 'Cel', place: 'USI-MED', distance: 8 }
    ],
    driver: 'ScJmLDeddkU4WV1Qrd3NHkJ3nr43'
  },
  {
    record: '0xrTyhzI26ykZ9Le5TMC',
    date: '2020-11-02',
    tripTemplate: '',
    purpose: 'Serwis',
    stops: [
      { label: 'Start', place: 'Biuro', distance: 0 },
      { label: 'Cel', place: 'Posum', distance: 10 }
    ],
    driver: 'ScJmLDeddkU4WV1Qrd3NHkJ3nr43'
  }
];

export const fetchTrips = createAsyncThunk(
  'trips/fetchTrips',
  async (arg = 1, thunkAPI) => {
    const trips = [];

    // data.forEach((d) => {
    //   firestore.collection('Trips').add(d);
    // });

    const coll = await firestore.collection('Trips').get();

    coll.forEach((doc) => {
      trips[doc.id] = { ...doc.data(), id: doc.id };
    });

    return trips;
  }
);

const sortMethods = {
  Data: {
    asc: (a, b) => compareDates(a.date, b.date),
    desc: (a, b) => compareDates(b.date, a.date)
  }
};

export const tripSlice = createSlice({
  name: 'trips',
  initialState: {
    status: 'idle',
    items: [],
    error: null,
    sortFunc: { name: 'Data', condition: 'desc' },
    sortCases: [
      {
        title: 'Data',
        items: [
          { label: 'od najnowszych', condition: 'desc' },
          { label: 'od najstarszych', condition: 'asc' }
        ]
      }
    ]
  },
  reducers: {
    setSortFunc: (state, action) => {
      console.log(action);
      const { payload } = action;
      const entry = Object.entries(payload)[0];

      state.sortFunc = { name: entry[0], condition: entry[1] };
    }
  },
  extraReducers: {
    [fetchTrips.pending]: (state, action) => {
      state.status = 'loading';
    },

    [fetchTrips.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.items = action.payload;
    },

    [fetchTrips.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    }
  }
});

const trips = (state) => state.trips;

export const selectTrips = createSelector(
  [trips, selectRecords],
  (trips, records) => {
    const { sortFunc } = trips;

    const items = [];
    Object.values(trips.items).forEach((trip) => {
      const name = trip.stops.map((t) => t.place).join(' - ');
      const record = records.items.find((r) => r.id === trip.record);
      const vehicle = record && record.vehicle && record.vehicle.name;
      const subname = `${trip.date} ${vehicle}`;
      items.push({
        ...trip,
        name,
        vehicle
      });
    });

    items.sort(sortMethods[sortFunc.name][sortFunc.condition]);

    return items;
  }
);

export const selectFilteredTrips = createSelector(
  [selectTrips, selectFilters],
  (trips, filters) => {
    const { tripFilter, carBrandFilter } = filters;

    const filtered = trips.items
      .filter((veh) =>
        tripFilter.enable ? veh.id === tripFilter.filter.value : veh
      )
      .filter((veh) =>
        carBrandFilter.enable ? veh.brand === carBrandFilter.filter.value : veh
      );

    return { ...trips, items: filtered };
  }
);

export const selectTripById = (state, tripId) => {
  return state.trips.items[tripId];
};

// export const selectTripById = (state, tripId) =>
//   state.trips.items.find((trip) => trip.id === tripId);

// export const selectTripDetails => tripId => createSelector(
//   [selectTrips, selectRecordDetails],
//   (trip, rec) =>{

//   }
// )

export const selectTripSort = (state) => state.trips.sortCases;

export const { setSortFunc } = tripSlice.actions;

export default tripSlice.reducer;
