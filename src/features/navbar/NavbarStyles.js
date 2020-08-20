import styled, { css } from 'styled-components';
import { NavLink, Link } from 'react-router-dom';

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
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  `}
`;

export const A = styled(NavLink)`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    margin: 30px 0;
    padding: 20px 40px;

    background: transparent;
    border-radius: 20px 0px 0 20px;
    cursor: pointer;

    color: ${theme.menuText};
    font-weight: bold;
    text-decoration: none;
    text-transform: capitalize;

    :hover {
      background: ${theme.menuHover};
    }

    &.active {
      background: white;
      color: ${theme.menuTextActive};
    }
  `}
`;
