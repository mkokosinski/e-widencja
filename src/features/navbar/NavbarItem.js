import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { A, Li, Icon, Label } from './NavbarStyles';

export const Item = ({ to, label, icon }) => {
  return (
    <>
      <Li>
        <A to={to}>
          <Icon>
            <FontAwesomeIcon icon={icon} />
          </Icon>
          <Label>{label}</Label>
        </A>
      </Li>
    </>
  );
};

export default Item;
