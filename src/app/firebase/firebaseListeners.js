import { fetchRecords } from '../../features/records/recordsSlice';
import { fetchSettings } from '../../features/settings/settingsSlice';
import { fetchTrips } from '../../features/trips/tripsSlice';
import { fetchTripTemplates } from '../../features/tripTemplates/tripTemplatesSlice';
import { fetchUsers } from '../../features/users/usersSlice';
import { fetchCarBrands } from '../../features/vehicles/carBrandsSlice';
import { fetchVehicles } from '../../features/vehicles/vehiclesSlice';
import { firestore } from './firebase';

export const subscribeVehicles = async (dispatch) => {
  return await firestore.collection('Vehicles').onSnapshot(
    {
      includeMetadataChanges: true
    },
    function (doc) {
      dispatch(fetchVehicles());
    }
  );
};

export const subscribeUsers = async (dispatch) => {
  return await firestore.collection('Users').onSnapshot(
    {
      includeMetadataChanges: true
    },
    function (doc) {
      dispatch(fetchUsers());
    }
  );
};

export const subscribeCarBrands = async (dispatch) => {
  return await firestore.collection('CarBrands').onSnapshot(
    {
      includeMetadataChanges: true
    },
    function (doc) {
      dispatch(fetchCarBrands());
    }
  );
};

export const subscribeRecords = async (dispatch) => {
  return await firestore.collection('Records').onSnapshot(
    {
      includeMetadataChanges: true
    },
    function (doc) {
      dispatch(fetchRecords());
    }
  );
};

export const subscribeSettings = async (dispatch) => {
  return await firestore.collection('Settings').onSnapshot(
    {
      includeMetadataChanges: true
    },
    function (doc) {
      dispatch(fetchSettings());
    }
  );
};

export const subscribeTripTemplates = async (dispatch) => {
  return await firestore.collection('TripTemplates').onSnapshot(
    {
      includeMetadataChanges: true
    },
    function (doc) {
      dispatch(fetchTripTemplates());
    }
  );
};

export const subscribeTrips = async (dispatch) => {
  return await firestore.collection('Trips').onSnapshot(
    {
      includeMetadataChanges: true
    },
    function (doc) {
      dispatch(fetchTrips());
    }
  );
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
