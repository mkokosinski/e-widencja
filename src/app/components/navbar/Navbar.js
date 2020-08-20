import React from "react";

import * as Styled from "./NavbarStyles";
import NavbarItem from "./NavbarItem";

const Navbar = () => {
  return (
    <Styled.Menu>
      <Styled.Ul>
        <NavbarItem >
          <Styled.A to="/About">
            <img src="https://dummyimage.com/30" alt="" />
            <span>label</span>
          </Styled.A>
        </NavbarItem>
        <NavbarItem>
          <Styled.A to="/About">
            <img src="https://dummyimage.com/30" alt="" />
            <span>label</span>
          </Styled.A>
        </NavbarItem>
        <NavbarItem>
          <Styled.A>
            <img src="https://dummyimage.com/30" alt="" />
            <span>label</span>
          </Styled.A>
        </NavbarItem>
        <NavbarItem>
          <Styled.A>
            <img src="https://dummyimage.com/30" alt="" />
            <span>label</span>
          </Styled.A>
        </NavbarItem>
        <NavbarItem>
          <Styled.A>
            <img src="https://dummyimage.com/30" alt="" />
            <span>label</span>
          </Styled.A>
        </NavbarItem>
        <NavbarItem>
          <Styled.A>
            <img src="https://dummyimage.com/30" alt="" />
            <span>label</span>
          </Styled.A>
        </NavbarItem>
        <NavbarItem>
          <Styled.A>
            <img src="https://dummyimage.com/30" alt="" />
            <span>label</span>
          </Styled.A>
        </NavbarItem>
      </Styled.Ul>
    </Styled.Menu>
  );
};

export default Navbar;
