import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export const size = {
  mobileS: '320',
  mobileM: '375',
  mobileL: '410',
  mobileXL: '570',
  tablet: '768',
  laptop: '1024',
  laptopL: '1440',
  desktop: '2560',
};

export const device = {
  mobileS: `(min-width: ${size.mobileS}px)`,
  mobileM: `(min-width: ${size.mobileM}px)`,
  mobileL: `(min-width: ${size.mobileL}px)`,
  mobileXL: `(min-width: ${size.mobileXL}px)`,
  tablet: `(min-width: ${size.tablet}px)`,
  laptop: `(min-width: ${size.laptop}px)`,
  laptopL: `(min-width: ${size.laptopL}px)`,
  desktop: `(min-width: ${size.desktop}px)`,
  desktopL: `(min-width: ${size.desktop}px)`,
};

export const StyledLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 50px 1fr 50px;
  grid-template-areas:
    'logo profile'
    'body body'
    'menu menu';
  min-height: 100vh;
  flex-direction: column-reverse;
  background: ${({ theme }) => theme.mainSoft};
  box-sizing: content-box;
  @media screen and ${device.mobileM} {
    grid-template-rows: 60px 1fr 50px;
  }
  @media screen and ${device.laptop} {
    grid-template-columns: 18% 82%;
    grid-template-rows: 200px 1fr;
    grid-template-areas:
      'logo body'
      'menu body';
    overflow: auto;
    flex-direction: row;
    font-size: ${({ theme }) => theme.font.size};
  }
  @media screen and ${device.laptopL} {
    grid-template-columns: 14% 86%;
    grid-template-rows: 200px 1fr;
  }
`;

export const Menu = styled.div`
  grid-area: menu;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: ${({ theme }) => (theme.isMobileKeyboard ? '0px' : 'initial')};
  width: 100%;
  z-index: 998;
  background: inherit;
  @media screen and ${device.laptop} {
    position: relative;
    height: auto;
    width: auto;
    font-size: ${({ theme }) => theme.font.size};
  }
`;

export const StyledLogo = styled.div`
  display: flex;
  justify-content: center;
  color: white;
`;

export const Body = styled.div`
  grid-area: body;
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 0px;
  background: ${(props) => props.theme.body.background};
  @media screen and ${device.tablet} {
    padding: 6px;
    align-items: flex-start;
  }
  @media screen and ${device.laptop} {
    display: block;
    font-size: 0.9em;
    padding: 20px;
  }
  @media screen and ${device.laptopL} {
    font-size: 1em;
    padding: 30px;
  }
`;

export const H2 = styled.h2`
  font-size: 16px;
  line-height: 1.7rem;
  margin: 0;
  padding: 0;

  @media screen and ${device.tablet} {
    font-size: 18px;
  }
`;

export const A = styled(Link)`
  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Panel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;

  /* clip-path: polygon(0 16px, 20px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 22px) 100%, 0 100%); */
  /* border-radius: 40px 6px; */
`;

export const PanelBordered = styled(Panel)`
  background: #ffffff;
  border: none;

  @media screen and ${device.tablet} {
    border: 1px solid rgba(88, 64, 187, 0.1);
    box-shadow: 0 2px 12px -8px rgba(0, 0, 0, 0.5);
  }
`;

/* export const PanelMain = styled(Panel)`
  background: ${({ theme }) => theme.main};
  border-radius: 50px 10px;
  padding: 40px;
`;

export const PanelMainSoft = styled(Panel)`
  background: ${({ theme }) => theme.mainSoft};
  border-radius: 50px 10px;
  padding: 40px;
`;

export const PanelSeconderySoft = styled(Panel)`
  background: ${({ theme }) => theme.seconderySoft};
  border-radius: 50px 10px;
  padding: 40px;
`; */

export const PanelLight = styled(Panel)`
  background: ${({ theme }) => theme.light};
  color: ${({ theme }) => theme.main};
`;

export const PanelLightSoft = styled(Panel)`
  background: ${({ theme }) => theme.lightSoft};
  color: ${({ theme }) => theme.main};
`;

export const PanelOverlapLight = styled(Panel)`
  background: white;
  border-left: 10px solid ${({ theme }) => theme.secondary};
  box-shadow: 0 1px 3px -1px rgba(0, 0, 0, 0.4);
  color: rgba(0, 0, 0, 0.8);
`;

export const Button = styled.div`
  align-items: center;
  /* clip-path: polygon(0 8px, 10px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 10px) 100%, 0 100%); */
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 150ms;
  border-radius: 6px;

  :focus,
  :active {
    outline: none;
  }

  :disabled {
    cursor: not-allowed;
  }
`;

export const ButtonMain = styled(Button)`
  background: ${({ theme }) => theme.mainSoft};
  border: 1px solid rgba(0, 0, 0, 0.04);
  color: white;

  :hover {
    background: ${({ theme }) => theme.hover.mainSoft};
  }

  :active {
    box-shadow: 0 1px 2px -1px rgba(0, 0, 0, 0.5);
  }
`;

export const ButtonLightSoft = styled(Button)`
  background: ${({ theme }) => theme.lightSoft};
  border: 1px solid rgba(0, 0, 0, 0.04);
  color: ${({ theme }) => theme.main};

  :hover {
    background: ${({ theme }) => theme.hover.lightSoft};
  }
`;

export const ButtonBorderedMain = styled(Button)`
  background: white;
  border: 1px solid ${({ theme }) => theme.mainSoft};
  color: ${({ theme }) => theme.mainSoft};

  :hover {
    background: ${({ theme }) => theme.hover.lightSoft};
  }
`;

export const ButtonBorderedSeconderySoft = styled(Button)`
  background: white;
  border: 1px solid ${({ theme }) => theme.secondarySoft};
  color: ${({ theme }) => theme.secondarySoft};
  transition: opacity 150ms;

  :hover {
    opacity: 0.6;
  }
`;
