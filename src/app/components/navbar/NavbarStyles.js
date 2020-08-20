import styled, { css } from "styled-components";
import { NavLink, Link } from "react-router-dom";

export const Menu = styled.nav`
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

export const Ul = styled.ul`
  list-style-type: none;
  margin: 0;
  overflow: hidden;
  padding: 0px;
`;

export const Li = styled.li`
  ${({ theme, active }) => css`
    background: ${active ? "white" : "transparent"};
    border-radius: 20px 0px 0 20px;
    color: ${active ? theme.menuTextActive : theme.menuText};
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    margin: 30px 0;
    padding: 20px 40px;

    :hover {
      background: ${!active && theme.menuHover};
    }
  `}
`;

export const A = styled(Link)`
  text-transform: capitalize;
  font-weight: bold;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  }
`;
