import { fetchRecords } from '../../features/records/recordsSlice';
import { fetchSettings } from '../../features/settings/settingsSlice';
import { fetchTrips } from '../../features/trips/tripsSlice';
import { fetchTripTemplates } from '../../features/tripTemplates/tripTemplatesSlice';
import { fetchUsers } from '../../features/users/usersSlice';
import { fetchCarBrands } from '../../features/vehicles/carBrandsSlice';
import { fetchVehicles } from '../../features/vehicles/redux/vehicleThunk';
import { firestore } from './firebase';

export const subscribeVehicles = (dispatch) => {
  return firestore.collection('Vehicles').onSnapshot(function (doc) {
    if (!doc.metadata.hasPendingWrites) {
      dispatch(fetchVehicles());
    }
  });
};

export const subscribeUsers = (dispatch) => {
  return firestore.collection('Users').onSnapshot(function (doc) {
    if (!doc.metadata.hasPendingWrites) {
      dispatch(fetchUsers());
    }
  });
};

export const subscribeCarBrands = (dispatch) => {
  return firestore.collection('CarBrands').onSnapshot(function (doc) {
    if (!doc.metadata.hasPendingWrites) {
      dispatch(fetchCarBrands());
    }
  });
};

export const subscribeRecords = (dispatch) => {
  return firestore.collection('Records').onSnapshot(function (doc) {
    if (!doc.metadata.hasPendingWrites) {
      dispatch(fetchRecords());
    }
  });
};

export const subscribeSettings = (dispatch) => {
  return firestore.collection('Settings').onSnapshot(function (doc) {
    if (!doc.metadata.hasPendingWrites) {
      dispatch(fetchSettings());
    }
  });
};

export const subscribeTripTemplates = (dispatch) => {
  return firestore.collection('TripTemplates').onSnapshot(function (doc) {
    if (!doc.metadata.hasPendingWrites) {
      dispatch(fetchTripTemplates());
    }
  });
};

export const subscribeTrips = (dispatch) => {
  return firestore.collection('Trips').onSnapshot(function (doc) {
    if (!doc.metadata.hasPendingWrites) {
      dispatch(fetchTrips());
    }
  });
};

let VehiclesSubscription = () => {};
let UsersSubscription = () => {};
let CarBrandsSubscription = () => {};
let RecordsSubscription = () => {};
let SettingsSubscription = () => {};
let TripTemplatesSubscription = () => {};
let TripsSubscription = () => {};

export const subscribeAll = (dispatch) => {
  VehiclesSubscription = subscribeVehicles(dispatch);
  UsersSubscription = subscribeUsers(dispatch);
  CarBrandsSubscription = subscribeCarBrands(dispatch);
  RecordsSubscription = subscribeRecords(dispatch);
  SettingsSubscription = subscribeSettings(dispatch);
  TripTemplatesSubscription = subscribeTripTemplates(dispatch);
  TripsSubscription = subscribeTrips(dispatch);
};

export const unsubscribeAll = () => {
  VehiclesSubscription();
  UsersSubscription();
  CarBrandsSubscription();
  RecordsSubscription();
  SettingsSubscription();
  TripTemplatesSubscription();
  TripsSubscription();
};
