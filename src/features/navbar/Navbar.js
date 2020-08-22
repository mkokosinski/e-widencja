import React from 'react';

import * as Styled from './NavbarStyles';
import NavbarItem from './NavbarItem';
import Routing from '../layout/Routing';

import {
  faChartLine,
  faClipboard,
  faCarAlt,
  faUserFriends,
  faRoute,
  faCog,
  faFileAlt,
} from '@fortawesome/free-solid-svg-icons';
import ShowMore from './ShowMore';
import { useSelector } from 'react-redux';
import { selectIsMobile } from '../layout/layoutSlice';

const itemsDesktop = [
  { name: 'Dashboard', path: Routing.Dashboard.path, icon: faChartLine },
  { name: 'Ewidencja', path: Routing.Records.path, icon: faClipboard },
  { name: 'Pojazdy', path: Routing.Vehicles.path, icon: faCarAlt },
  { name: 'Kierowcy', path: Routing.Drivers.path, icon: faUserFriends },
  { name: 'Trasy', path: Routing.Tours.path, icon: faRoute },
  { name: 'Ustawienia', path: Routing.Settings.path, icon: faCog },
  { name: 'Raporty', path: Routing.Reports.path, icon: faFileAlt },
];

const itemsMobile = [
  { name: 'Ewidencja', path: Routing.Records.path, icon: faClipboard },
  { name: 'Pojazdy', path: Routing.Vehicles.path, icon: faCarAlt },
  { name: 'Trasy', path: Routing.Tours.path, icon: faRoute },
  { name: 'Raporty', path: Routing.Reports.path, icon: faFileAlt },
];

const Navbar = () => {
  const isMobile = useSelector(selectIsMobile);
  const items = isMobile ? itemsMobile : itemsDesktop;
  return (
    <Styled.Menu>
      <Styled.Ul>
        {items.map((item) => (
          <NavbarItem to={item.path} label={item.name} icon={item.icon} />
        ))}
        {isMobile && <ShowMore />}
      </Styled.Ul>
    </Styled.Menu>
  );
};

export default Navbar;
