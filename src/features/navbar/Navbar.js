import React from 'react';

import * as Styled from './NavbarStyles';
import NavbarItem from './NavbarItem';
import Routing from '../layout/Routing';

const items = [
  { name: 'Dashboard', path: Routing.Dashboard.path },
  { name: 'Ewidencja', path: Routing.Records.path },
  { name: 'Pojazdy', path: Routing.Vehicles.path },
  { name: 'Kierowcy', path: Routing.Drivers.path },
  { name: 'Trasy', path: Routing.Tours.path },
  { name: 'Ustawienia', path: Routing.Settings.path },
  { name: 'Raporty', path: Routing.Reports.path },
];


const Navbar = () => {
  console.log(items);
  return (
    <Styled.Menu>
      <Styled.Ul>
        {items.map(item => (
          <NavbarItem>
            <Styled.A to={item.path}>
              <img src='https://dummyimage.com/30' alt='' />
              <span>{item.name}</span>
            </Styled.A>
          </NavbarItem>
        ))}
      </Styled.Ul>
    </Styled.Menu>
  );
};

export default Navbar;
