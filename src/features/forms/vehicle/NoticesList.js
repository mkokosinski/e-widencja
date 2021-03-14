import React from 'react';
import PropTypes from 'prop-types';
import { EmptyState } from '../../templates/detailsView/DetailsStyles';
import Routing from '../../routing/RoutingPaths';
import { getRemainDays } from '../../../utils/dateUtils';
import {
  BorderedListItem,
  ListItemMinorInfo,
  DashboardList,
} from '../../dashboard/DashboardStyles';

const NoticesList = (props) => {
  const { vehicles } = props;
  const notices = vehicles.flatMap(
    (veh) => veh.notices?.map((notice) => ({ ...notice, vehicle: veh })) || [],
  );

  if (!notices.length || notices.length === 0) {
    return <EmptyState>Brak zgłoszonych uwag</EmptyState>;
  }
  return (
    <DashboardList>
      {notices.sort().map(({ date, id, name, type, vehicle }) => {
        const path = `${Routing.VehicleEditNotice.action}/${vehicle.id}/${id}`;
        const daysAgo = getRemainDays(date, 'temu');
        const title = `${vehicle.brand} ${vehicle.model} (${vehicle.registrationNumber})`;

        return (
          <React.Fragment key={date + name}>
            <BorderedListItem status={type.status} to={path}>
              <div style={{ opacity: 0.9 }}>{name}</div>
              <div style={{ opacity: 0.7 }}>{title}</div>

              <ListItemMinorInfo>{daysAgo}</ListItemMinorInfo>
            </BorderedListItem>
          </React.Fragment>
        );
      })}
    </DashboardList>
  );
};

NoticesList.propTypes = {
  vehicles: PropTypes.arrayOf(
    PropTypes.shape({
      notices: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          date: PropTypes.string,
          description: PropTypes.string,
          type: PropTypes.string,
        }),
      ),
    }),
  ),
};

export default NoticesList;
