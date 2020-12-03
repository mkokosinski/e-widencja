import Login from '../auth/AuthPage';

import Trips from '../trips/Trips';
import AddTripForm from '../forms/trip/AddTripForm';
import EditTripForm from '../forms/trip/EditTripForm';
import TripDetails from '../trips/TripDetails';

import Settings from '../settings/Settings';
import Reports from '../reports/Reports';

import Records from '../records/Records';
import AddRecordForm from '../forms/record/AddRecordForm';
import EditRecordForm from '../forms/record/EditRecordForm';
import RecordDetails from '../records/RecordDetails';

import Users from '../users/Users';
import AddUserForm from '../forms/user/AddUserForm';
import EditUserForm from '../forms/user/EditUserForm';
import UserDetails from '../users/UserDetails';

import Dashboard from '../dashboard/Dashboard';

import Vehicles from '../vehicles/Vehicles';
import AddVehicleForm from '../forms/vehicle/AddVehicleForm';
import EditVehicleForm from '../forms/vehicle/EditVehicleForm';
import VehicleDetails from '../vehicles/VehicleDetails';

const Routing = {
  Login: { Component: Login, path: '/login' },

  Trips: { Component: Trips, path: '/app/e-widencjatrips' },
  TripAdd: {
    Component: AddTripForm,
    action: '/app/e-widencjatrips/add',
    get path() {
      return `${this.action}/:recordId`;
    }
  },
  TripEdit: {
    Component: EditTripForm,
    action: '/app/e-widencjatrips/edit',
    get path() {
      return `${this.action}/:id`;
    }
  },
  TripDetails: {
    Component: TripDetails,
    action: '/app/e-widencjatrips/details',
    get path() {
      return `${this.action}/:id`;
    }
  },

  Settings: { Component: Settings, path: '/app/e-widencjasettings' },

  Reports: { Component: Reports, path: '/app/e-widencjareports' },

  Records: { Component: Records, path: '/app/e-widencjarecords' },
  RecordAdd: { Component: AddRecordForm, path: '/app/e-widencjarecords/add' },
  RecordEdit: {
    Component: EditRecordForm,
    action: '/app/e-widencjarecords/edit',
    get path() {
      return `${this.action}/:id`;
    }
  },
  RecordDetails: {
    Component: RecordDetails,
    action: '/app/e-widencjarecords/details',
    get path() {
      return `${this.action}/:id`;
    }
  },

  Users: { Component: Users, path: '/app/e-widencjausers', label: 'Użytkownicy' },
  UserAdd: { Component: AddUserForm, path: '/app/e-widencjausers/add' },
  UserEdit: {
    Component: EditUserForm,
    action: '/app/e-widencjausers/edit',
    get path() {
      return `${this.action}/:id`;
    }
  },
  UserDetails: {
    Component: UserDetails,
    action: '/app/e-widencjausers/details',
    get path() {
      return `${this.action}/:id`;
    }
  },

  Dashboard: { Component: Dashboard, path: '/app/e-widencjadashboard' },

  Vehicles: { Component: Vehicles, path: '/app/e-widencjavehicles' },
  VehicleAdd: {
    Component: AddVehicleForm,
    path: '/app/e-widencjavehicles/add'
  },
  VehicleEdit: {
    Component: EditVehicleForm,
    action: '/app/e-widencjavehicles/edit',
    get path() {
      return `${this.action}/:id`;
    }
  },
  VehicleDetails: {
    Component: VehicleDetails,
    action: '/app/e-widencjavehicles/details',
    get path() {
      return `${this.action}/:id`;
    }
  }
};

export default Routing;
