import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const screenSize = {
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
  mobileS: `min-width: ${screenSize.mobileS}px`,
  mobileM: `min-width: ${screenSize.mobileM}px`,
  mobileL: `min-width: ${screenSize.mobileL}px`,
  mobileXL: `min-width: ${screenSize.mobileXL}px`,
  tablet: `min-width: ${screenSize.tablet}px`,
  laptop: `min-width: ${screenSize.laptop}px`,
  laptopL: `min-width: ${screenSize.laptopL}px`,
  desktop: `min-width: ${screenSize.desktop}px`,
  desktopL: `min-width: ${screenSize.desktop}px`,
  max: {
    tablet: `max-width: ${screenSize.tablet}px`,
  },
};

export const StyledLayout = styled.div`
  box-sizing: content-box;
  display: grid;
  flex-direction: column-reverse;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 50px 1fr 50px;
  grid-template-areas:
    'logo profile'
    'body body'
    'menu menu';
  min-height: ${({ theme }) => theme.currSiteSize.height}px;
  @media screen and (${device.laptop}) {
    background-color: ${(props) => props.theme.mainSoft};
    grid-template-columns: 18% 82%;
    grid-template-rows: 200px 1fr;
    grid-template-areas:
      'logo body'
      'menu body';
    overflow: auto;
    flex-direction: row;
    font-size: ${({ theme }) => theme.font.size};
  }
  @media screen and (${device.laptopL}) {
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
  @media screen and (${device.laptop}) {
    font-size: ${({ theme }) => theme.font.size};
    height: auto;
    position: relative;
    width: auto;
  }
`;

export const StyledLogo = styled.div`
  display: flex;
  color: white;
  position: relative;
  stroke: white;
  z-index: 1;

  @media screen and (${device.laptop}) {
    justify-content: center;
  }
`;

export const Body = styled.div`
  grid-area: body;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 0px;
  background: ${(props) => props.theme.body.background};
  @media screen and (${device.tablet}) {
    align-items: flex-start;
  }
  @media screen and (${device.laptop}) {
    font-size: 0.9em;
    padding: 30px;
    background: linear-gradient(
      90deg,
      white 5%,
      ${(props) => props.theme.body.background} 20%,
      ${(props) => props.theme.body.background} 80%,
      white 95%
    );
  }
  @media screen and (${device.laptopL}) {
    font-size: 1em;
    padding: 40px;
  }
`;

export const H2 = styled.h2`
  font-size: 16px;
  line-height: 1.7rem;
  margin: 0;
  padding: 0;

  @media screen and (${device.tablet}) {
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
  box-shadow: 0 2px 8px -4px rgba(0, 0, 0, 0.5);

  @media screen and (${device.tablet}) {
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

export const PanelBoxShadow = styled(Panel)`
  background: white;
  box-shadow: 0 1px 3px -1px rgba(0, 0, 0, 0.4);
  color: rgba(0, 0, 0, 0.8);
`;

export const PanelOverlapLight = styled(PanelBoxShadow)`
  border-left: 6px solid ${({ theme }) => theme.secondary};
`;

export const Button = styled.div`
  align-items: center;
  cursor: pointer;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  flex: 1 1;
  transition: background-color 100ms;
  white-space: nowrap;
  user-select: none;

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
  background-color: ${({ theme }) => theme.lightSoft};
  border: 1px solid rgba(0, 0, 0, 0.04);
  color: ${({ theme }) => theme.main};

  :hover {
    background-color: ${({ theme }) => theme.hover.lightSoft};
    color: ${({ theme }) => theme.hover.main};
  }
`;

export const ButtonBorderedMain = styled(Button)`
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  color: ${({ theme }) => theme.mainSoft};

  :hover {
    background: ${({ theme }) => theme.hover.lightSoft};
    box-shadow: none;
  }

  :active,
  :focus {
    background: white;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
`;

export const ButtonBordered = styled(Button)`
  background: white;
  border: 1px solid ${({ theme, color }) => color || theme.secondarySoft};
  color: ${({ theme, color }) => color || theme.secondarySoft};
  transition: opacity 150ms;

  :hover {
    opacity: 0.6;
  }
`;
