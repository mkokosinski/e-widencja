import Login from '../auth/AuthPage';
import SignIn from '../auth/SignInForm';
import SignUp from '../auth/SignUpForm';

import Trips from '../trips/Trips';
import AddTripForm from '../forms/trip/AddTripForm';
import TripRecordNotExists from '../trips/TripRecordNotExists';
import EditTripForm from '../forms/trip/EditTripForm';
import TripDetails from '../trips/TripDetails';

import TripTemplates from '../tripTemplates/TripTemplates';
import AddTripTemplateForm from '../forms/tripTemplates/AddTripTemplateForm';
import EditTripTemplateForm from '../forms/tripTemplates/EditTripTemplateForm';

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
import VehicleDetails from '../vehicles/VehicleDetails';
import AddVehicleForm from '../forms/vehicle/AddVehicleForm';
import EditVehicleForm from '../forms/vehicle/EditVehicleForm';
import AddVehicleNoticeForm from '../forms/vehicle/Notice/AddNoticeForm';
import EditVehicleNoticeForm from '../forms/vehicle/Notice/EditNoticeForm';

const Routing = {
  Login: { Component: Login, path: '/auth' },
  SignIn: { Component: SignIn, path: '/auth/signIn' },
  SignUp: { Component: SignUp, path: '/auth/signUp' },

  Trips: { Component: Trips, path: '/app/trips' },
  TripAdd: {
    Component: AddTripForm,
    action: '/app/trips/add',
    get path() {
      return `${this.action}/:recordId`;
    },
  },
  TripRecordNotExists: {
    Component: TripRecordNotExists,
    action: '/app/trips/add',
  },
  TripEdit: {
    Component: EditTripForm,
    action: '/app/trips/edit',
    get path() {
      return `${this.action}/:id?`;
    },
  },
  TripDetails: {
    Component: TripDetails,
    action: '/app/trips/details',
    get path() {
      return `${this.action}/:id`;
    },
  },

  TripTemplates: {
    Component: TripTemplates,
    path: '/app/tripTemplates',
  },
  TripTemplateAdd: {
    Component: AddTripTemplateForm,
    path: '/app/tripTemplates/add',
  },
  TripTemplateEdit: {
    Component: EditTripTemplateForm,
    action: '/app/tripTemplates/edit',
    get path() {
      return `${this.action}/:id`;
    },
  },

  Settings: { Component: Settings, path: '/app/settings' },

  Reports: { Component: Reports, path: '/app/reports' },

  Records: { Component: Records, path: '/app/records' },
  RecordAdd: {
    Component: AddRecordForm,
    action: '/app/records/add',
    get path() {
      return `${this.action}/:vehicleId?`;
    },
  },
  RecordEdit: {
    Component: EditRecordForm,
    action: '/app/records/edit',
    get path() {
      return `${this.action}/:id`;
    },
  },
  RecordDetails: {
    Component: RecordDetails,
    action: '/app/records/details',
    get path() {
      return `${this.action}/:id`;
    },
  },

  Users: {
    Component: Users,
    path: '/app/users',
    label: 'Użytkownicy',
  },
  UserAdd: { Component: AddUserForm, path: '/app/users/add' },
  UserEdit: {
    Component: EditUserForm,
    action: '/app/users/edit',
    get path() {
      return `${this.action}/:id`;
    },
  },
  UserDetails: {
    Component: UserDetails,
    action: '/app/users/details',
    get path() {
      return `${this.action}/:id`;
    },
  },

  Dashboard: { Component: Dashboard, path: '/app/dashboard' },

  Vehicles: { Component: Vehicles, path: '/app/vehicles' },
  VehicleAdd: {
    Component: AddVehicleForm,
    path: '/app/vehicles/add',
  },
  VehicleEdit: {
    Component: EditVehicleForm,
    action: '/app/vehicles/edit',
    get path() {
      return `${this.action}/:id`;
    },
  },
  VehicleDetails: {
    Component: VehicleDetails,
    action: '/app/vehicles/details',
    get path() {
      return `${this.action}/:id`;
    },
  },

  VehicleAddNotice: {
    Component: AddVehicleNoticeForm,
    action: '/app/vehicles/notice',
    get path() {
      return `${this.action}/:id`;
    },
  },
  VehicleEditNotice: {
    Component: EditVehicleNoticeForm,
    action: '/app/vehicles/notice',
    get path() {
      return `${this.action}/:id/:noticeId`;
    },
  },
};

export default Routing;
