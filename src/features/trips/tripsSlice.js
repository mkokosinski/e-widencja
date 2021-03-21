import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
import { selectFilters } from '../templates/filterSlice';
import { firestore, firestoreFunctions } from '../../firebase/firebase';
import { selectRecords } from '../records/recordsSlice';
import { compareDates, getNowString } from '../../utils/dateUtils';
import { FETCH_STATUS } from '../../utils/constants';
import { toast } from 'react-toastify';
import { editVehicle } from '../vehicles/redux/vehicleThunk';
import { addTripTemplate } from '../tripTemplates/tripTemplatesSlice';
import { selectSortedVehicles } from '../vehicles/redux/vehiclesSlice';
import { selectDrivers } from '../users/usersSlice';

export const fetchTrips = createAsyncThunk(
  'trips/fetchTrips',
  async (arg = 1, thunkAPI) => {
    const trips = [];

    const user = await thunkAPI.getState().auth.user;

    if (user) {
      const coll = await firestore
        .collection('Trips')
        .where('companyId', '==', user.companyId)
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
  async (newTrip, thunkAPI) => {
    try {
      const currUser = thunkAPI.getState().auth.user;
      const maxVehicleMileage = thunkAPI
        .getState()
        .trips.items.filter((trip) => trip.vehicleId === newTrip.vehicle)
        .reduce((max, cur) => {
          const tripMileage = cur.stops[cur.stops.length - 1].mileage;
          return tripMileage > max ? tripMileage : max;
        }, 0);

      const formattedStops = [
        { ...newTrip.stops[0], distance: 0 },
        ...newTrip.stops.slice(1),
      ];

      const distance = formattedStops.reduce(
        (acc, cur) => acc + cur.distance,
        0,
      );

      const trip = {
        date: newTrip.date,
        distance,
        driverId: newTrip.driver,
        end: newTrip.stops[newTrip.stops.length - 1].place,
        purpose: newTrip.purpose,
        recordId: newTrip.record,
        start: newTrip.stops[0].place,
        stops: formattedStops,
        templateId: newTrip.template || '',
        vehicleId: newTrip.vehicle,

        active: true,
        companyId: currUser.companyId,
        updatedBy: currUser.id,
        updated: firestoreFunctions.FieldValue.serverTimestamp(),
      };

      const currentTripMileage =
        newTrip.stops[newTrip.stops.length - 1].mileage;
      const newMileage =
        currentTripMileage > maxVehicleMileage
          ? currentTripMileage
          : maxVehicleMileage;

      const doc = await firestore.collection('Trips').add(trip);

      thunkAPI.dispatch(
        editVehicle({
          id: newTrip.vehicle,
          mileage: newMileage,
        }),
      );

      if (newTrip.saveTemplate) {
        thunkAPI.dispatch(
          addTripTemplate({
            name: newTrip.templateName,
            purpose: newTrip.purpose,
            stops: trip.stops.map((stop) => ({
              place: stop.place,
              distance: stop.distance,
            })),
            companyId: currUser.companyId,
            createdBy: currUser.id,
            created: firestoreFunctions.FieldValue.serverTimestamp(),
            active: true,
          }),
        );
      }

      return { ...trip, id: doc.id, created: getNowString() };
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const editTrip = createAsyncThunk(
  'trips/editTrip',
  async (editedTrip, thunkAPI) => {
    try {
      const currUser = thunkAPI.getState().auth.user;
      const maxVehicleMileage = thunkAPI
        .getState()
        .trips.items.filter((trip) => trip.vehicleId === editedTrip.vehicle)
        .reduce((max, cur) => {
          const tripMileage = cur.stops[cur.stops.length - 1].mileage;
          return tripMileage > max ? tripMileage : max;
        }, 0);

      const distance = editedTrip.stops.reduce(
        (acc, cur) => acc + cur.distance,
        0,
      );

      const trip = {
        ...editedTrip,
        updatedBy: currUser.id,
        updated: firestoreFunctions.FieldValue.serverTimestamp(),
      };

      const currentTripMileage =
        editedTrip.stops[editedTrip.stops.length - 1].mileage;
      const newMileage =
        currentTripMileage > maxVehicleMileage
          ? currentTripMileage
          : maxVehicleMileage;

      firestore.collection('Trips').doc(editedTrip.id).update(trip);

      // thunkAPI.dispatch(
      //   editVehicle({
      //     id: editedTrip.vehicle,
      //     mileage: newMileage,
      //   }),
      // );

      // if (editedTrip.saveTemplate) {
      //   thunkAPI.dispatch(
      //     addTripTemplate({
      //       name: editedTrip.templateName,
      //       purpose: editedTrip.purpose,
      //       stops: editedTrip.stops,
      //       companyId: currUser.companyId,
      //       createdBy: currUser.id,
      //       created: firestoreFunctions.FieldValue.serverTimestamp(),
      //       active: true,
      //     }),
      //   );
      // }

      return { ...trip, id: editedTrip.id };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
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

    [addTrip.fulfilled]: (state, { payload }) => {
      state.status = FETCH_STATUS.SUCCESS;
      state.items.push(payload);
      toast.success('Poprawnie dodano nowy przejazd');
    },

    [addTrip.rejected]: (state, { payload }) => {
      state.status = FETCH_STATUS.ERROR;
      state.error = payload.message;
      toast.error('Nie udało się dodać przejazdu');
    },

    [editTrip.fulfilled]: (state, { payload }) => {
      state.status = FETCH_STATUS.SUCCESS;
      state.items = state.items.map((trip) =>
        trip.id === payload.id ? { ...trip, ...payload } : trip,
      );
      toast.success('Poprawnie edytowano przejazd');
    },

    [editTrip.rejected]: (state, { payload }) => {
      state.status = FETCH_STATUS.ERROR;
      state.error = payload.message;
      toast.error('Nie udało się edytować przejazdu');
    },
  },
});

const trips = (state) => state.trips;

export const selectTrips = (state) => ({
  ...state.trips,
  items: state.trips.items.filter((trip) => trip.active),
});

export const selectTripsFullData = createSelector(
  [selectTrips, selectRecords, selectSortedVehicles, selectDrivers],
  (trips, records, { items: vehicles }, drivers) => {
    const { sortFunc } = trips;
    const items = [];
    Object.values(trips.items).forEach((trip) => {
      const name = trip.stops.map((t) => t.place).join(' - ');
      const record = records.items.find((r) => r.id === trip.recordId);
      const vehicle = vehicles.find((veh) => veh.id === trip.vehicleId);
      const driver = drivers.find((driver) => driver.id === trip.driverId);
      const subname = `${trip.date} ${vehicle}`;
      items.push({
        ...trip,
        record,
        driver,
        name,
        vehicle,
      });
    });

    items.sort(sortMethods[sortFunc.name][sortFunc.condition]);

    return items;
  },
);

export const selectFilteredTrips = createSelector(
  [selectTripsFullData, selectFilters],
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
  return state.trips.items.find((trip) => trip.id === tripId);
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

export const selectFullTripsData = (state) => {
  const { vehicles, users, trips } = state;
  return trips.items.map((trip) => {
    const vehicle = vehicles.items.find((veh) => veh.id === trip.vehicleId);
    const driver = users.items.find((user) => user.id === trip.driverId);
    return { ...trip, vehicle, driver };
  });
};

export const selectTripSort = (state) => state.trips.sortCases;

export const { setSortFunc } = tripSlice.actions;

export default tripSlice.reducer;
