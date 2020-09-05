import Tours from '../tours/Tours';
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
  Tours: { Component: Tours, path: '/e-widencja/tours' },

  Settings: { Component: Settings, path: '/e-widencja/settings' },

  Reports: { Component: Reports, path: '/e-widencja/reports' },

  Records: { Component: Records, path: '/e-widencja/records' },
  RecordAdd: { Component: AddRecordForm, path: '/e-widencja/records/add' },
  RecordEdit: {
    Component: EditRecordForm,
    action: '/e-widencja/records/edit',
    get path() {
      return `${this.action}/:id`;
    },
  },
  RecordDetails: {
    Component: RecordDetails,
    action: '/e-widencja/records/details',
    get path() {
      return `${this.action}/:id`;
    },
  },

  Users: { Component: Users, path: '/e-widencja/users', label: 'Użytkownicy' },
  UserAdd: { Component: AddUserForm, path: '/e-widencja/users/add' },
  UserEdit: {
    Component: EditUserForm,
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
    Component: AddVehicleForm,
    path: '/e-widencja/vehicles/add',
  },
  VehicleEdit: {
    Component: EditVehicleForm,
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
