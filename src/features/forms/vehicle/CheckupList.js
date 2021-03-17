import React from 'react';
import { useSelector } from 'react-redux';

import {
  compareDates,
  dateBetween,
  getRemainDays,
} from '../../../utils/dateUtils';
import { selectSortedVehicles } from '../../vehicles/redux/vehiclesSlice';
import Routing from '../../routing/Routing';

import {
  ListItemMinorInfo,
  DashboardList,
  BorderedListItem,
} from '../../dashboard/DashboardStyles';

const getStatus = (date) => {
  const today = new Date();
  const withinMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate(),
  );
  if (compareDates(date, today) === -1) {
    return 'error';
  }
  if (dateBetween(date, today, withinMonth)) {
    return 'warning';
  }
  return 'default';
};

const CheckupList = () => {
  const { items: vehicles } = useSelector(selectSortedVehicles);
  const checkups = vehicles
    .sort((v1, v2) => compareDates(v1.checkupDate, v2.checkupDate))
    .slice(0, 5)
    .map((veh) => {
      const status = getStatus(veh.checkupDate);
      const reamin = getRemainDays(veh.checkupDate);
      const path = `${Routing.VehicleDetails.action}/${veh.id}`;

      return { name: veh.name, date: veh.checkupDate, status, reamin, path };
    });

  return (
    <DashboardList>
      {checkups.sort().map(({ name, date, status, reamin, path }) => {
        return (
          <React.Fragment key={date + name}>
            <BorderedListItem status={status} to={path}>
              <div style={{ opacity: 0.9 }}>{name}</div>
              <div style={{ opacity: 0.7, fontSize: '.9em' }}>{date}</div>
              <ListItemMinorInfo>
                {status !== 'default' && reamin}
              </ListItemMinorInfo>
            </BorderedListItem>
          </React.Fragment>
        );
      })}
    </DashboardList>
  );
};

export default CheckupList;
