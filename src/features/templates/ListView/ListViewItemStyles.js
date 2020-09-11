import styled from 'styled-components';

import {
  device,
  H2,
  PanelLight,
  PanelLightSoft,
  ButtonLightSoft,
} from '../../layout/LayoutStyles';

export const Container = styled(PanelLight)`
  height: 80px;
  padding: 0;
  max-width: 1400px;
  margin: 8px auto;
  width: 98%;
`;

export const Body = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-areas: 'name  buttons';

  height: 100%;
  width: 100%;
  padding: 10px;
  align-items: center;
  overflow: hidden;

  @media screen and ${device.mobileXL} {
    grid-template-columns: 50px 2fr 1fr;
    grid-template-areas: 'ico name buttons';

    margin: 16px;
    padding: 10px 30px;

    & > * {
      margin: 0 5px;
    }
  }

  @media screen and ${device.tablet} {
    grid-template-columns: 60px 3fr 3fr 1fr;
    grid-template-areas: 'ico name journeys buttons';
    justify-content: space-between;
  }

  @media screen and ${device.laptop} {
    font-size: 18px;
  }
  @media screen and ${device.desktopL} {
    font-size: 22px;
  }
`;

export const Ico = styled(PanelLightSoft)`
  grid-area: ico;
  display: none;
  height: 40px;

  @media screen and ${device.mobileXL} {
    display: flex;
  }
  @media screen and ${device.tablet} {
    height: 50px;
  }
`;

export const Name = styled(H2)`
  grid-area: name;
  font-size: 0.9em;
  text-align: center;
  text-align: left;
  padding: 0 30px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  @media screen and ${device.mobileXL} {
    font-size: 1em;
    width: auto;
  }
  @media screen and ${device.mobileXL} {
    font-size: 1.1em;
  }
`;

export const Journeys = styled.div`
  grid-area: journeys;
  display: none;
  justify-content: space-around;

  @media screen and ${device.tablet} {
    display: flex;
  }
`;
export const Journey = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and ${device.mobileXL} {
  }
`;

export const InfoMain = styled.div`
  font-size: 0.9em;
  font-weight: bold;
  @media screen and ${device.laptopL} {
    font-size: 1em;
  }
`;

export const InfoSecondary = styled.div`
  font-size: 0.7em;
`;

export const Buttons = styled.div`
  grid-area: buttons;
  display: flex;
  justify-content: center;

  height: 70%;

  & > * {
    margin: 0 6px;
  }

  @media screen and ${device.mobileXL} {
    width: auto;
  }
  @media screen and ${device.laptop} {
    height: 90%;
  }
`;

export const Button = styled(ButtonLightSoft)`
  width: 60px;

  :nth-child(2) {
    display: none;
  }

  @media screen and ${device.mobileL} {
    :nth-child(2) {
      display: flex;
    }
  }
  @media screen and ${device.laptopL} {
    width: 80px;
  }
`;

export const ButtonBody = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  font-size: 0.7em;
  padding: 5px;

  @media screen and ${device.laptop} {
    padding: 5px 10px;
  }
`;
