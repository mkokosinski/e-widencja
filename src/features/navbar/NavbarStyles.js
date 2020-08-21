import styled, { css } from "styled-components";
import { NavLink, Link } from "react-router-dom";
import Decorator from "./itemDecorator.svg";

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
  padding: 0px;
  position: relative;
`;

export const Li = styled.li`
  ${({ theme, active }) => css`
    display: flex;
    align-items: center;
    position: relative;
    width: 220px;
  `}
`;

export const A = styled(NavLink)`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    margin: 10px 0;
    padding: 20px 40px;
    z-index: 2;

    background: transparent;
    border-radius: 20px 0px 0 20px;
    cursor: pointer;

    color: ${theme.nav.default.color};
    font-weight: ${theme.font.nav.default.weight};
    text-decoration: none;
    text-transform: capitalize;
    overflow: hidden;

    :hover {
      background: ${theme.nav.hover};
    }

    &.active {
      background: ${theme.nav.active.background};
      color: ${theme.nav.active.color};
      font-weight: ${theme.font.nav.active.weight};

      ::before,
      ::after {
        content: "";
        width: 100%;
        height: 20px;
        background: url(${Decorator}) no-repeat right;
        position: absolute;
      }

      ::before {
        top: -10px;
        right: -2px;
      }
      ::after {
        bottom: -10px;
        right: -2px;
        transform: scale(1,-1);
      }
    }

    span {
      margin-left: 16px;
    }
  `}
`;
