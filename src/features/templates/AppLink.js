import React from 'react';
import PropTypes from 'prop-types';
import { A } from '../layout/LayoutStyles';

const AppLink = ({ to, disabled, children }) => {
  return (
    <A
      to={to}
      disabled={disabled}
      {...(disabled && { onClick: (e) => e.preventDefault(), tabIndex: -1 })}
    >
      {children}
    </A>
  );
};

AppLink.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  to: PropTypes.string,
};

export default AppLink;
