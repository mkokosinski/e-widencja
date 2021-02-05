import Login from '../auth/AuthPage';
import SignIn from '../auth/SignInForm';
import SignUp from '../auth/SignUpForm';

import Trips from '../trips/Trips';
import AddTripForm from '../forms/trip/AddTripForm';
import EditTripForm from '../forms/trip/EditTripForm';
import TripDetails from '../trips/TripDetails';

import TripTemplates from '../tripTemplates/TripTemplates';
import AddTripTemplateForm from '../forms/tripTemplates/AddTripTemplateForm';
import EditTripTemplateForm from '../forms/tripTemplates/EditTripTemplateForm';
import TripTemplateDetails from '../tripTemplates/TripTemplateDetails';

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
  Login: { Component: Login, path: '/auth' },
  SignIn: { Component: SignIn, path: '/auth/signIn' },
  SignUp: { Component: SignUp, path: '/auth/signUp' },

  Trips: { Component: Trips, path: '/e-widencja/app/trips' },
  TripAdd: {
    Component: AddTripForm,
    action: '/e-widencja/app/trips/add',
    get path() {
      return `${this.action}/:recordId`;
    }
  },
  TripEdit: {
    Component: EditTripForm,
    action: '/e-widencja/app/trips/edit',
    get path() {
      return `${this.action}/:id`;
    }
  },
  TripDetails: {
    Component: TripDetails,
    action: '/e-widencja/app/trips/details',
    get path() {
      return `${this.action}/:id`;
    }
  },

  TripTemplates: {
    Component: TripTemplates,
    path: '/e-widencja/app/tripTemplates'
  },
  TripTemplateAdd: {
    Component: AddTripTemplateForm,
    path: '/e-widencja/app/tripTemplates/add'
  },
  TripTemplateEdit: {
    Component: EditTripTemplateForm,
    action: '/e-widencja/app/tripTemplates/edit',
    get path() {
      return `${this.action}/:id`;
    }
  },

  Settings: { Component: Settings, path: '/e-widencja/app/settings' },

  Reports: { Component: Reports, path: '/e-widencja/app/reports' },

  Records: { Component: Records, path: '/e-widencja/app/records' },
  RecordAdd: { Component: AddRecordForm, path: '/e-widencja/app/records/add' },
  RecordEdit: {
    Component: EditRecordForm,
    action: '/e-widencja/app/records/edit',
    get path() {
      return `${this.action}/:id`;
    }
  },
  RecordDetails: {
    Component: RecordDetails,
    action: '/e-widencja/app/records/details',
    get path() {
      return `${this.action}/:id`;
    }
  },

  Users: {
    Component: Users,
    path: '/e-widencja/app/users',
    label: 'Użytkownicy'
  },
  UserAdd: { Component: AddUserForm, path: '/e-widencja/app/users/add' },
  UserEdit: {
    Component: EditUserForm,
    action: '/e-widencja/app/users/edit',
    get path() {
      return `${this.action}/:id`;
    }
  },
  UserDetails: {
    Component: UserDetails,
    action: '/e-widencja/app/users/details',
    get path() {
      return `${this.action}/:id`;
    }
  },

  Dashboard: { Component: Dashboard, path: '/e-widencja/app/dashboard' },

  Vehicles: { Component: Vehicles, path: '/e-widencja/app/vehicles' },
  VehicleAdd: {
    Component: AddVehicleForm,
    path: '/e-widencja/app/vehicles/add'
  },
  VehicleEdit: {
    Component: EditVehicleForm,
    action: '/e-widencja/app/vehicles/edit',
    get path() {
      return `${this.action}/:id`;
    }
  },
  VehicleDetails: {
    Component: VehicleDetails,
    action: '/e-widencja/app/vehicles/details',
    get path() {
      return `${this.action}/:id`;
    }
  }
};

export default Routing;
