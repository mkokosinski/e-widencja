import styled from 'styled-components';

import {
  device,
  H2,
  PanelOverlapLight,
  PanelLightSoft,
  ButtonLightSoft
} from '../../layout/LayoutStyles';

export const Container = styled(PanelOverlapLight)`
  cursor: default;
  height: 80px;
  margin: 10px auto;
  padding: 0;
  width: 97%;
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

  @media screen and (${device.mobileXL}) {
    grid-template-columns: 60px 2fr 1fr;
    grid-template-areas: 'ico name buttons';

    margin: 16px;
    padding: 10px 20px;

    & > * {
      margin: 0 5px;
    }
  }

  @media screen and (${device.tablet}) {
    grid-template-columns: 60px 1fr max-content 1fr;
    grid-template-areas: 'ico name journeys buttons';
    justify-content: space-between;
  }

  @media screen and (${device.laptop}) {
    font-size: 18px;
  }
  @media screen and (${device.desktopL}) {
    font-size: 22px;
  }
`;

export const Ico = styled(PanelLightSoft)`
  grid-area: ico;
  display: none;
  height: 50px;

  @media screen and (${device.mobileXL}) {
    display: flex;
  }
  @media screen and (${device.tablet}) {
  }
`;

export const Title = styled.div`
  grid-area: name;
  padding: 0 10px 0 20px;
  text-align: left;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: auto;
`;

export const Name = styled(H2)`
  font-size: 0.9em;
  overflow: hidden;
  text-overflow: ellipsis;

  @media screen and (${device.mobileXL}) {
    font-size: 1em;
  }
  @media screen and (${device.mobileXL}) {
  }
`;

export const Subname = styled.div`
  font-size: 0.8em;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Journeys = styled.div`
  grid-area: journeys;
  display: none;
  justify-content: space-around;

  @media screen and (${device.tablet}) {
    display: flex;
    font-size: 0.9em;
  }
`;
export const Journey = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10px;

  @media screen and (${device.mobileXL}) {
  }
`;

export const InfoMain = styled.div`
  font-size: 0.9em;
  font-weight: bold;
  @media screen and (${device.laptopL}) {
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

  height: 90%;

  & > * {
    margin: 0 6px;
  }

  @media screen and (${device.mobileXL}) {
    width: auto;
  }
`;

export const Button = styled(ButtonLightSoft)`
  width: 60px;

  :nth-child(3) {
    display: none;
  }

  @media screen and (${device.mobileL}) {
    :nth-child(3) {
      display: flex;
    }
  }
  @media screen and (${device.laptopL}) {
    width: 70px;
  }
`;

export const ButtonBody = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  font-size: 0.7em;
  padding: 5px;

  @media screen and (${device.laptop}) {
    font-size: 0.6em;
  }
`;

export const ButtonIco = styled.i`
  font-size: 1.4em;
`;
