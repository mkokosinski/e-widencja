import React from 'react';
import PropTypes from 'prop-types';

const VehicleProblems = (props) => {
  return (
    <DashboardList>
      {checkups.sort().map(({ name, date, status, reamin, path }) => {
        return (
          <React.Fragment key={date + name}>
            <CheckupListItem status={status} to={path}>
              <div style={{ opacity: 0.9 }}>{name}</div>
              <div style={{ opacity: 0.7, fontSize: '.9em' }}>{date}</div>
              <CheckupRemain>{status !== 'default' && reamin}</CheckupRemain>
            </CheckupListItem>
          </React.Fragment>
        );
      })}
    </DashboardList>
  );
};

VehicleProblems.propTypes = {};

export default VehicleProblems;
