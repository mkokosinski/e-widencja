import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
import { selectFilters } from '../templates/filterSlice';
import { firestore, firestoreFunctions } from '../../app/firebase/firebase';
import { selectRecordById, selectRecords } from '../records/recordsSlice';
import { compareDates } from '../../utils/dateUtils';
import { FETCH_STATUS } from '../../utils/constants';
import { toast } from 'react-toastify';

export const fetchTrips = createAsyncThunk(
  'trips/fetchTrips',
  async (arg = 1, thunkAPI) => {
    const trips = [];

    const user = await thunkAPI.getState().auth.user;

    if (user) {
      const coll = await firestore
        .collection('Trips')
        .where('companyId', '==', user.companyId)
        .where('active', '==', true)
        .get();

      coll.forEach((doc) => {
        const data = doc.data();
        if (data.created) {
          data.created = data.created.toDate().toString();
        }

        if (data.updated) {
          data.updated = data.updated.toDate().toString();
        }

        if (data.deleted) {
          data.deleted = data.deleted.toDate().toString();
        }

        trips.push({ ...data, id: doc.id });
      });

      return trips;
    }
  },
);

export const addTrip = createAsyncThunk(
  'trips/addTrip',
  async (arg, thunkAPI) => {
    const currUser = thunkAPI.getState().auth.user;

    const distance = arg.stops.reduce((acc, cur) => acc + cur.distance, 0);

    const trip = {
      date: arg.date,
      distance,
      driverId: arg.driver,
      end: arg.stops[arg.stops.length - 1].place,
      isOneWay: arg.isOneWay,
      purpose: arg.purpose,
      recordId: arg.record,
      start: arg.stops[0].place,
      stops: arg.stops,
      templateId: arg.template,
      vehicleId: arg.vehicle,

      active: true,
      companyId: currUser.companyId,
      createdBy: currUser.id,
      created: firestoreFunctions.FieldValue.serverTimestamp(),
    };

    console.log(trip);

    firestore
      .collection('Trips')
      .add(trip)
      .catch((err) => {
        console.error(err);
        return thunkAPI.rejectWithValue(err.toString());
      });
  },
);

const sortMethods = {
  Data: {
    asc: (a, b) => compareDates(a.date, b.date),
    desc: (a, b) => compareDates(b.date, a.date),
  },
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
          { label: 'od najstarszych', condition: 'asc' },
        ],
      },
    ],
  },
  reducers: {
    setSortFunc: (state, action) => {
      console.error(action);
      const { payload } = action;
      const entry = Object.entries(payload)[0];

      state.sortFunc = { name: entry[0], condition: entry[1] };
    },
  },
  extraReducers: {
    [fetchTrips.pending]: (state, action) => {
      state.status = FETCH_STATUS.LOADING;
    },
    [fetchTrips.fulfilled]: (state, action) => {
      state.status = FETCH_STATUS.SUCCESS;
      state.items = action.payload;
    },
    [fetchTrips.rejected]: (state, action) => {
      state.status = FETCH_STATUS.ERROR;
      state.error = action.error.message;
    },

    [addTrip.fulfilled]: (state, action) => {
      state.status = FETCH_STATUS.SUCCESS;
      toast.success('Poprawnie dodano nową ewidencję');
    },

    [addTrip.rejected]: (state, action) => {
      state.status = FETCH_STATUS.ERROR;
      state.error = action.error.message;
      toast.error(action.payload);
    },
  },
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
        vehicle,
      });
    });

    items.sort(sortMethods[sortFunc.name][sortFunc.condition]);

    return items;
  },
);

export const selectFilteredTrips = createSelector(
  [selectTrips, selectFilters],
  (trips, filters) => {
    const { tripFilter, carBrandFilter } = filters;

    const filtered = trips.items
      .filter((veh) =>
        tripFilter.enable ? veh.id === tripFilter.filter.value : veh,
      )
      .filter((veh) =>
        carBrandFilter.enable ? veh.brand === carBrandFilter.filter.value : veh,
      );

    return { ...trips, items: filtered };
  },
);

export const selectTripById = (state, tripId) => {
  return state.trips.items[tripId];
};

export const selectTripsForRecord = (state, recordId) =>
  state.trips.items
    .filter((trip) => trip.recordId === recordId)
    .map((trip) => {
      const driver = state.users.items.find((u) => u.id === trip.driverId);
      return { ...trip, driver: driver };
    });

export const selectTripsForVehicle = (state, vehicleId) =>
  state.trips.items
    .filter((trip) => trip.vehicleId === vehicleId)
    .map((trip) => {
      const driver = state.users.items.find((u) => u.id === trip.driverId);
      return { ...trip, driver: driver };
    });

export const selectTripsForDriver = (state, driverId) =>
  state.trips.items
    .filter((trip) => trip.driverId === driverId)
    .map((trip) => {
      const driver = state.users.items.find((u) => u.id === trip.driverId);
      return { ...trip, driver: driver };
    });

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
