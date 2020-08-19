import styled, { css } from 'styled-components';

const style = 

export const Menu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Ul = styled.ul`
  list-style-type: none;
  margin: 0;
  overflow: hidden;
  padding: 0px;
`;

export const Li = styled.li`
  ${({ theme, active }) => css`

    background: ${active ? 'white' : 'transparent'};
    color: ${active ? theme.menuTextActive : theme.menuText};
    cursor: pointer;

    :hover {
      background: ${!active && theme.menuHover};
    }
  `}

`;

export const A = styled.a`
  text-transform: uppercase;
  font-weight: bold;
  text-decoration: none;
`;
