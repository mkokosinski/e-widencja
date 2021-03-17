import React from 'react';

import * as Styled from './NavbarStyles';
import NavbarItem from './NavbarItem';
import Routing from '../routing/Routing';

import {
  faChartLine,
  faClipboard,
  faCarAlt,
  faUserFriends,
  faRoute,
  faCog,
  faFileAlt,
} from '@fortawesome/free-solid-svg-icons';

const itemsDesktop = [
  { name: 'Dashboard', path: Routing.Dashboard.path, icon: faChartLine },
  { name: 'Ewidencja', path: Routing.Records.path, icon: faClipboard },
  { name: 'Pojazdy', path: Routing.Vehicles.path, icon: faCarAlt },
  {
    name: Routing.Users.label,
    path: Routing.Users.path,
    icon: faUserFriends,
  },
  { name: 'Szablony', path: Routing.TripTemplates.path, icon: faRoute },
  { name: 'Ustawienia', path: Routing.Settings.path, icon: faCog },
  { name: 'Raporty', path: Routing.Reports.path, icon: faFileAlt },
];

// const itemsMobile = [
//   { name: 'Ewidencja', path: Routing.Records.path, icon: faClipboard },
//   { name: 'Pojazdy', path: Routing.Vehicles.path, icon: faCarAlt },
//   { name: 'Szablony', path: Routing.TripTemplates.path, icon: faRoute },
//   { name: 'Raporty', path: Routing.Reports.path, icon: faFileAlt },
// ];

// const hiddenMobileItems = [
//   { name: 'Dashboard', path: Routing.Dashboard.path, icon: faChartLine },
//   {
//     name: Routing.Users.label,
//     path: Routing.Users.path,
//     icon: faUserFriends,
//   },
//   { name: 'Ustawienia', path: Routing.Settings.path, icon: faCog },
// ];

const Navbar = () => {
  // const isMobile = useSelector(selectIsMobile);
  const items = itemsDesktop;
  // const items = isMobile ? itemsMobile : itemsDesktop;
  return (
    <Styled.Menu>
      <Styled.Ul>
        {items.map((item, index) => (
          <NavbarItem
            key={index}
            to={item.path}
            label={item.name}
            icon={item.icon}
          />
        ))}
        {/* {isMobile && <ShowMore items={hiddenMobileItems} />} */}
      </Styled.Ul>
    </Styled.Menu>
  );
};

export default Navbar;
