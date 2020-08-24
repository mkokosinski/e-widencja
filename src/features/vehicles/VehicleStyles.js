import styled from 'styled-components';
import { Link } from 'react-router-dom';

import SearchBar from '../searchbar/SearchBar';

import { device, H2, PanelLight, PanelLightSoft } from '../layout/LayoutStyles';

export const TopPanel = styled.div`
  display: flex;
  height: 46px;
  margin-top: 10px;
  width: 100%;
  gap: 16px;
`;

export const AddVehicle = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 12px;
  padding: 10px 16px;
  gap: 6px;

  span {
    display: none;
  }

  @media screen and ${device.mobileL} {
    span {
      display: block;
    }
  }
`;

export const SearchVehicle = styled(SearchBar)`
  padding: 10px;
  background: red;
`;

export const VehicleList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Container = styled(PanelLight)`
  height: 80px;
  padding: 0;
  width: 100%;
  max-width: 1400px;
  margin: 8px auto;
`;

export const Body = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: ' name  buttons';

  height: 100%;
  width: 100%;
  padding: 10px;
  align-items: center;

  @media screen and ${device.mobileXL} {
    grid-template-columns: 50px 1fr 2fr 1fr;
    grid-template-areas: 'ico name journeys buttons';
    grid-gap: 10px;
    margin: 16px;
    justify-content: space-between;
    padding: 10px 30px;
  }

  @media screen and ${device.tablet} {
    grid-template-columns: 50px 1fr 1fr 1fr;
  }

  @media screen and ${device.laptop} {
    grid-template-columns: 100px 1fr 2fr 2fr;
    font-size: 18px;
  }
  @media screen and ${device.desktopL} {
    font-size: 22px;
  }
`;

export const Ico = styled(PanelLightSoft)`
  grid-area: ico;
  height: 40px;

  @media screen and ${device.laptop} {
    height: 60px;
    width: 80px;
  }
`;

export const Name = styled(H2)`
  grid-area: name;
  font-size: 1em;
  text-align: center;
  text-align: left;
  padding: 0 30px;

  @media screen and ${device.mobileXL} {
    font-size: 1.2em;

    width: auto;
  }
`;

export const Journeys = styled.div`
  grid-area: journeys;
  display: flex;
  justify-content: space-around;

  @media screen and ${device.mobileXL} {
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

export const ButtonBody = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  font-size: 0.8em;
  padding: 5px;

  @media screen and ${device.laptop} {
    padding: 6px 16px;
  }
`;
