import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import { A, Li } from "./NavbarStyles";

export const Item = ({ to, label, icon }) => {
  return (
    <>
      <Li>
        <A to={to}>
        <FontAwesomeIcon icon={icon} />
          <span>{label}</span>
        </A>
      </Li>
    </>
  );
};

export default Item;
