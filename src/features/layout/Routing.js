import Tours from '../tours/Tours';
import Settings from '../settings/Settings';
import Reports from '../reports/Reports';
import Records from '../records/Records';
import Drivers from '../drivers/Drivers';
import DriverDetails from '../drivers/DriverDetails';
import Dashboard from '../dashboard/Dashboard';
import Vehicles from '../vehicles/Vehicles';
import VehicleDetails from '../vehicles/VehicleDetails';

const Routing = {
  Tours: { Component: Tours, path: '/e-widencja/tours' },
  Settings: { Component: Settings, path: '/e-widencja/settings' },
  Reports: { Component: Reports, path: '/e-widencja/reports' },
  Records: { Component: Records, path: '/e-widencja/records' },
  Drivers: { Component: Drivers, path: '/e-widencja/drivers' },
  DriversDetails: { Component: DriverDetails, path: '/e-widencja/drivers/:id' },
  Dashboard: { Component: Dashboard, path: '/e-widencja/dashboard' },
  Vehicles: { Component: Vehicles, path: '/e-widencja/vehicles' },
  VehicleDetails: { Component: VehicleDetails, path: '/e-widencja/vehicles/:id' },
};

export default Routing;
