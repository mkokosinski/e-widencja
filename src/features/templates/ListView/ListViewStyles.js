import styled from 'styled-components';
import { Link } from 'react-router-dom';

import SearchBar from '../../searchbar/SearchBar';

import {
  device,
  ButtonBorderedMain,
  screenSize,
} from '../../layout/LayoutStyles';

export const TopPanel = styled.div`
  display: ${(props) => (props.isMobileKeyboard ? `none` : `flex`)};
  flex-direction: column;
  justify-content: flex-end;
  margin: 10px auto 0;
  padding: 0px 8px;
  flex-direction: row;
  width: 100%;
`;

export const TopPanelButton = styled(ButtonBorderedMain)`
  color: ${(props) => props.theme.secondary};
  flex: 1 1 60px;
  height: 50px;
  justify-content: center;
  margin: 10px;
  padding: 10px 8px;

  @media screen and (${device.mobileXL}) {
    flex: 0 1 100px;
  }

  @media screen and (${device.tablet}) {
  }
`;

export const TopButtonIco = styled.i`
  font-size: 1em;
  margin: 0 4px;

  transition: transform 200ms ease-out;
  transform-origin: center;
`;

export const ShowFilterLabel = styled.span`
  font-size: 0.9em;
`;

export const ButtonAdd = styled(TopPanelButton)`
  background: ${(props) => props.theme.secondary};
  color: white;
  padding: 0;

  :hover {
    background-color: ${(props) => props.theme.secondarySoft};
  }

  :focus {
    background-color: ${(props) => props.theme.secondarySoft};
    border: 1px solid rgba(0, 0, 0, 0.2);
  }

  @media screen and (max-width: ${screenSize.mobileXL}px) {
    border-radius: 50%;
    box-shadow: 0 1px 4px -2px rgba(0, 0, 0, 0.5),
      0 4px 8px -2px rgba(0, 0, 0, 0.2);
    bottom: 70px;
    height: 60px;
    margin: 8px;
    position: fixed;
    right: 10px;
    width: 60px;
  }

  @media screen and (${device.mobileXL}) {
    margin-right: auto;
  }
`;

export const ModalContent = styled.div`
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 1px 12px -4px rgba(0, 0, 0, 0.5),
    0 4px 24px -4px rgba(0, 0, 0, 0.2);
  margin: 0 auto;
  max-width: 92%;
  padding: 26px;
`;

export const ModalContentSort = styled(ModalContent)`
  padding: 0;
`;

export const FilterButtonLabel = styled.div`
  font-size: 0.7em;
  margin-top: 2px;
`;

export const SelectContainer = styled.div`
  width: 100%;
  @media screen and (${device.laptop}) {
    width: 300px;
  }
`;

export const DatePickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

export const AddItem = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 12px;
  padding: 10px 12px;
  & > * {
    margin: 0px 3px;
  }

  span {
    display: none;
  }

  @media screen and (${device.mobileXL}) {
    span {
      display: block;
    }
  }
  @media screen and (${device.tablet}) {
    padding: 16px;
  }
`;

export const SearchInput = styled(SearchBar)`
  padding: 10px;
  background: red;
`;

export const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  max-width: 1300px;
  padding-bottom: 80px;
  width: 100%;

  @media screen and (${device.tablet}) {
    padding: 16px;
  }
`;

export const filterItemsStyles = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: '50%',
    height: '50px',
    width: '50px',
  }),
};
