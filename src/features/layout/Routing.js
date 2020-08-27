import Tours from '../tours/Tours';
import Settings from '../settings/Settings';
import Reports from '../reports/Reports';
import Records from '../records/Records';
import RecordDetails from '../records/RecordDetails';
import Drivers from '../drivers/Drivers';
import DriverForm from '../forms/driver/driverForm';
import DriverDetails from '../drivers/DriverDetails';
import Dashboard from '../dashboard/Dashboard';
import Vehicles from '../vehicles/Vehicles';
import VehicleForm from '../forms/vehicle/vehicleForm';
import VehicleDetails from '../vehicles/VehicleDetails';

const Routing = {
  Tours: { Component: Tours, path: '/e-widencja/tours' },
  Settings: { Component: Settings, path: '/e-widencja/settings' },
  Reports: { Component: Reports, path: '/e-widencja/reports' },
  Records: { Component: Records, path: '/e-widencja/records' },
  RecordDetails: { Component: RecordDetails, path: '/e-widencja/records/details/:id' },
  Drivers: { Component: Drivers, path: '/e-widencja/drivers' },
  DriverForm: { Component: DriverForm, path: '/e-widencja/drivers/addDriver' },
  DriversDetails: { Component: DriverDetails, path: '/e-widencja/drivers/details/:id' },
  Dashboard: { Component: Dashboard, path: '/e-widencja/dashboard' },
  Vehicles: { Component: Vehicles, path: '/e-widencja/vehicles' },
  VehicleForm: { Component: VehicleForm, path: '/e-widencja/vehicles/addVehicle' },
  VehicleDetails: { Component: VehicleDetails, path: '/e-widencja/vehicles/details/:id' },
};

export default Routing;
