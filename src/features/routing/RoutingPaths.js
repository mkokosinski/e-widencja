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

  Trips: { Component: Trips, path: '/e-widencja/app/e-widencjatrips' },
  TripAdd: {
    Component: AddTripForm,
    action: '/e-widencja/app/e-widencjatrips/add',
    get path() {
      return `${this.action}/:recordId`;
    }
  },
  TripEdit: {
    Component: EditTripForm,
    action: '/e-widencja/app/e-widencjatrips/edit',
    get path() {
      return `${this.action}/:id`;
    }
  },
  TripDetails: {
    Component: TripDetails,
    action: '/e-widencja/app/e-widencjatrips/details',
    get path() {
      return `${this.action}/:id`;
    }
  },

  Settings: { Component: Settings, path: '/e-widencja/app/e-widencjasettings' },

  Reports: { Component: Reports, path: '/e-widencja/app/e-widencjareports' },

  Records: { Component: Records, path: '/e-widencja/app/e-widencjarecords' },
  RecordAdd: { Component: AddRecordForm, path: '/e-widencja/app/e-widencjarecords/add' },
  RecordEdit: {
    Component: EditRecordForm,
    action: '/e-widencja/app/e-widencjarecords/edit',
    get path() {
      return `${this.action}/:id`;
    }
  },
  RecordDetails: {
    Component: RecordDetails,
    action: '/e-widencja/app/e-widencjarecords/details',
    get path() {
      return `${this.action}/:id`;
    }
  },

  Users: { Component: Users, path: '/e-widencja/app/e-widencjausers', label: 'Użytkownicy' },
  UserAdd: { Component: AddUserForm, path: '/e-widencja/app/e-widencjausers/add' },
  UserEdit: {
    Component: EditUserForm,
    action: '/e-widencja/app/e-widencjausers/edit',
    get path() {
      return `${this.action}/:id`;
    }
  },
  UserDetails: {
    Component: UserDetails,
    action: '/e-widencja/app/e-widencjausers/details',
    get path() {
      return `${this.action}/:id`;
    }
  },

  Dashboard: { Component: Dashboard, path: '/e-widencja/app/e-widencjadashboard' },

  Vehicles: { Component: Vehicles, path: '/e-widencja/app/e-widencjavehicles' },
  VehicleAdd: {
    Component: AddVehicleForm,
    path: '/e-widencja/app/e-widencjavehicles/add'
  },
  VehicleEdit: {
    Component: EditVehicleForm,
    action: '/e-widencja/app/e-widencjavehicles/edit',
    get path() {
      return `${this.action}/:id`;
    }
  },
  VehicleDetails: {
    Component: VehicleDetails,
    action: '/e-widencja/app/e-widencjavehicles/details',
    get path() {
      return `${this.action}/:id`;
    }
  }
};

export default Routing;
