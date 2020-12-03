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

  Trips: { Component: Trips, path: '/app/trips' },
  TripAdd: {
    Component: AddTripForm,
    action: '/app/trips/add',
    get path() {
      return `${this.action}/:recordId`;
    }
  },
  TripEdit: {
    Component: EditTripForm,
    action: '/app/trips/edit',
    get path() {
      return `${this.action}/:id`;
    }
  },
  TripDetails: {
    Component: TripDetails,
    action: '/app/trips/details',
    get path() {
      return `${this.action}/:id`;
    }
  },

  Settings: { Component: Settings, path: '/app/settings' },

  Reports: { Component: Reports, path: '/app/reports' },

  Records: { Component: Records, path: '/app/records' },
  RecordAdd: { Component: AddRecordForm, path: '/app/records/add' },
  RecordEdit: {
    Component: EditRecordForm,
    action: '/app/records/edit',
    get path() {
      return `${this.action}/:id`;
    }
  },
  RecordDetails: {
    Component: RecordDetails,
    action: '/app/records/details',
    get path() {
      return `${this.action}/:id`;
    }
  },

  Users: { Component: Users, path: '/app/users', label: 'Użytkownicy' },
  UserAdd: { Component: AddUserForm, path: '/app/users/add' },
  UserEdit: {
    Component: EditUserForm,
    action: '/app/users/edit',
    get path() {
      return `${this.action}/:id`;
    }
  },
  UserDetails: {
    Component: UserDetails,
    action: '/app/users/details',
    get path() {
      return `${this.action}/:id`;
    }
  },

  Dashboard: { Component: Dashboard, path: '/app/dashboard' },

  Vehicles: { Component: Vehicles, path: '/app/vehicles' },
  VehicleAdd: {
    Component: AddVehicleForm,
    path: '/app/vehicles/add'
  },
  VehicleEdit: {
    Component: EditVehicleForm,
    action: '/app/vehicles/edit',
    get path() {
      return `${this.action}/:id`;
    }
  },
  VehicleDetails: {
    Component: VehicleDetails,
    action: '/app/vehicles/details',
    get path() {
      return `${this.action}/:id`;
    }
  }
};

export default Routing;
