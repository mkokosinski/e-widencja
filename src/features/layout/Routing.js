import Tours from '../tours/Tours';
import Settings from '../settings/Settings';
import Reports from '../reports/Reports';
import Records from '../records/Records';
import RecordForm from '../forms/record/recordForm';
import RecordDetails from '../records/RecordDetails';
import Users from '../users/Users';
import UserForm from '../forms/user/userForm';
import UserDetails from '../users/UserDetails';
import Dashboard from '../dashboard/Dashboard';
import Vehicles from '../vehicles/Vehicles';
import VehicleForm from '../forms/vehicle/vehicleForm';
import VehicleDetails from '../vehicles/VehicleDetails';

const Routing = {
  Tours: { Component: Tours, path: '/e-widencja/tours' },

  Settings: { Component: Settings, path: '/e-widencja/settings' },

  Reports: { Component: Reports, path: '/e-widencja/reports' },

  Records: { Component: Records, path: '/e-widencja/records' },
  RecordForm: { Component: RecordForm, path: '/e-widencja/records/addRecord' },
  RecordDetails: {
    Component: RecordDetails,
    action: '/e-widencja/records/details',
    get path() {
      return `${this.action}/:id`;
    },
  },

  Users: { Component: Users, path: '/e-widencja/users', label: 'Użytkownicy' },
  UserAdd: { Component: UserForm, path: '/e-widencja/users/add' },
  UserEdit: {
    Component: UserForm,
    action: '/e-widencja/users/edit',
    get path() {
      return `${this.action}/:id`;
    },
  },
  UserDetails: {
    Component: UserDetails,
    action: '/e-widencja/users/details',
    get path() {
      return `${this.action}/:id`;
    },
  },

  Dashboard: { Component: Dashboard, path: '/e-widencja/dashboard' },

  Vehicles: { Component: Vehicles, path: '/e-widencja/vehicles' },
  VehicleAdd: {
    Component: VehicleForm,
    path: '/e-widencja/vehicles/add',
  },
  VehicleEdit: {
    Component: VehicleForm,
    action: '/e-widencja/vehicles/edit',
    get path() {
      return `${this.action}/:id`;
    },
  },
  VehicleDetails: {
    Component: VehicleDetails,
    action: '/e-widencja/vehicles/details',
    get path() {
      return `${this.action}/:id`;
    },
  },
};

export default Routing;
