import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';
import { device } from '../layout/LayoutStyles';
import Decorator from './itemDecorator.svg';

export const Menu = styled.nav`
  display: flex;
  width: 84%;

  @media screen and ${device.laptop} {
    align-items: flex-end;
    width: 100%;
  }
`;

export const Ul = styled.ul`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin: 0;
  padding: 0px;

  @media screen and ${device.laptop} {
    align-items: flex-end;
    justify-content: center;
    flex-direction: column;
  }
`;

export const Li = styled.li`
  ${({ theme, active }) => css`
    display: flex;
    align-items: center;

    position: relative;

    color: white;

    @media screen and ${device.tablet} {
    }

    @media screen and ${device.laptop} {
      margin: 2px 0;

      width: 180px;
    }
    @media screen and ${device.laptopL} {
      margin: 6px 0;

      width: 220px;
    }
  `}
`;

export const A = styled(NavLink)`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    width: 50px;
    height: 50px;
    z-index: 2;

    border-radius: 4px;
    background: transparent;
    cursor: pointer;

    color: ${theme.nav.default.color};
    font-weight: ${theme.font.nav.default.weight};
    text-decoration: none;
    text-transform: capitalize;
    overflow: hidden;

    &.active {
      border: 1px solid ${theme.mainSoft};
      background: ${theme.nav.active.background};
      color: ${theme.nav.active.color};
      font-weight: ${theme.font.nav.active.weight};
    }

    :focus {
      outline: none;
    }

    @media screen and ${device.laptop} {
      flex-direction: row;
      justify-content: flex-start;

      width: 100%;
      padding: 12px 30px;

      border-radius: 20px 0px 0 20px;

      :hover {
        background: linear-gradient(90deg, ${theme.nav.hover}, transparent);
      }

      &.active {
        border: none;
        :hover {
          background: ${theme.nav.active.background};
        }

        ::before,
        ::after {
          content: '';
          background: url(${Decorator}) no-repeat right;
          position: absolute;
          pointer-events: none;
          width: 30px;
          height: 30px;
          transform: rotateZ(0deg);
          left: auto;
          top: auto;
          right: auto;
          bottom: auto;
        }

        ::before {
          top: -29px;
          right: -2px;
        }
        ::after {
          bottom: -29px;
          right: -2px;
          transform: rotateZ(0deg) scale(1, -1);
        }
      }
    }
    @media screen and ${device.laptopL} {
      height: 70px;
      padding: 20px 40px;
    }
  `}
`;

export const ShowMore = styled(Li)`
  display: flex;
  color: white;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Icon = styled.div``;

export const Label = styled.div`
  display: none;

  @media screen and ${device.laptop} {
    display: block;
    font-size: 1rem;
    margin-left: 20px;

    display: block;
  }
`;
