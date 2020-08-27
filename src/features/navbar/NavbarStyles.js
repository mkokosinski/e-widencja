import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";
import { device } from "../layout/LayoutStyles";
import Decorator from "./itemDecorator.svg";

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
  position: relative;
  margin: 0;
  padding: 0px;
  list-style-type: none;

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
    width: 62px;
    height: 62px;
    z-index: 2;
    border-radius: 0;

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
      border-radius: 20px 0px 0 20px;
      padding: 10px 40px;
      flex-direction: row;
      justify-content: flex-start;
      width: 100%;

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
          content: "";
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

  @media screen and ${device.mobileL} {
    display: block;
  }

  @media screen and ${device.laptop} {
    font-size: 1rem;
    margin-left: 20px;

    display: block;
  }
`;
