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
  Tours: { Component: Tours, path: '/tours' },
  Settings: { Component: Settings, path: '/settings' },
  Reports: { Component: Reports, path: '/reports' },
  Records: { Component: Records, path: '/records' },
  Drivers: { Component: Drivers, path: '/drivers' },
  DriversDetails: { Component: DriverDetails, path: '/drivers/:id' },
  Dashboard: { Component: Dashboard, path: '/dashboard' },
  Vehicles: { Component: Vehicles, path: '/vehicles' },
  VehicleDetails: { Component: VehicleDetails, path: '/vehicles/:id' },
};

export default Routing;
