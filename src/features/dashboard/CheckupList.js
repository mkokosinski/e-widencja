import React from 'react';
import PropTypes from 'prop-types';
import { differenceInDays } from 'date-fns';
import { useSelector } from 'react-redux';
import { compareDates, dateBetween } from '../../utils/dateUtils';
import { selectVehicles } from '../vehicles/vehiclesSlice';
import {
  CheckupRemain,
  DashboardList,
  DashboardListItem
} from './DashboardStyles';
import Routing from '../routing/RoutingPaths';

const getStatus = (date) => {
  const today = new Date();
  const withinMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate()
  );
  if (compareDates(date, today) === -1) {
    return 'error';
  }
  if (dateBetween(date, today, withinMonth)) {
    return 'warning';
  }
  return 'default';
};

const getRemainDays = (date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const checkupDate = new Date(date);
  console.log({
    checkupDate,
    today,
    diff: differenceInDays(checkupDate, today)
  });
  const diff = differenceInDays(checkupDate, today);
  const dayString = Math.abs(diff) === 1 ? 'dzień' : 'dni';

  const reaminText =
    diff === 0
      ? 'dziś'
      : diff === 1
      ? 'jutro'
      : diff < 0
      ? `${Math.abs(diff)} ${dayString} po terminie`
      : `za ${Math.abs(diff) + 1} ${dayString}`;

  return reaminText;
};

const CheckupList = () => {
  const { items: vehicles } = useSelector(selectVehicles);
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
            <DashboardListItem status={status} to={path}>
              <div style={{ opacity: 0.9 }}>{name}</div>
              <div style={{ opacity: 0.7, fontSize: '.9em' }}>{date}</div>
              <CheckupRemain>{status !== 'default' && reamin}</CheckupRemain>
            </DashboardListItem>
          </React.Fragment>
        );
      })}
    </DashboardList>
  );
};

export default CheckupList;
