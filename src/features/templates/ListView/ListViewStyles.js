import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import SearchBar from '../../searchbar/SearchBar';

import {
  device,
  ButtonMain,
  size,
  ButtonBorderedMain
} from '../../layout/LayoutStyles';

export const TopPanel = styled.div`
  display: ${(props) => (props.isMobileKeyboard ? `none` : `flex`)};
  flex-direction: column-reverse;

  position: fixed;
  bottom: 60px;
  right: 16px;

  z-index: 2;

  @media screen and ${device.mobileXL} {
    position: static;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 30px;
    padding: 0px 8px;
    flex-direction: row;
    width: 100%;
  }
`;

const MobileButton = css`
  @media screen and (max-width: ${size.mobileXL}px) {
    height: 60px;
    width: 60px;
    border-radius: 50%;
    box-shadow: 0 1px 4px -2px rgba(0, 0, 0, 0.5),
      0 4px 8px -2px rgba(0, 0, 0, 0.2);
    margin-top: 8px;
  }
`;

export const ButtonAdd = styled(ButtonMain)`
  ${MobileButton}
  @media screen and (max-width: ${size.mobileXL}px) {
    background: ${(props) => props.theme.secondary};
    color: white;
  }
`;

export const ShowFilterButton = styled(ButtonBorderedMain)`
  ${MobileButton}
  display: flex;
  flex-direction: column;
  background: white;
  color: ${(props) => props.theme.secondary};
`;

export const ShowFilterIco = styled.i`
  font-size: 1.1em;

  transition: transform 200ms ease-out;
  transform-origin: center;
  transform: ${(props) => (props.showFilters ? `rotate(180deg)` : `rotate(0)`)};
`;

export const ShowFilterLabel = styled.span`
  font-size: 0.8em;
`;

export const FilterContainer = styled.div`
  background-color: white;
  border-radius: 6px;
  padding: 26px;
`;

export const FilterButton = styled(ButtonBorderedMain)`
  ${MobileButton}

  flex-direction: column;
  justify-content: center;
  height: 60px;
  width: 60px;

  border-radius: 50%;

  ${(props) =>
    props.active &&
    css`
      background: ${(props) => props.theme.secondary};
      color: white;

      :hover {
        background: ${(props) => props.theme.secondarySoft};
      }
    `}

  @media screen and ${device.mobileXL} {
    height: 50px;
    width: 50px;
    margin: 0 8px;
  }
`;

export const FilterButtonLabel = styled.div`
  font-size: 0.7em;
  margin-top: 2px;
`;

export const SelectContainer = styled.div`
  width: 100%;
  @media screen and ${device.laptop} {
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

  @media screen and ${device.mobileXL} {
    span {
      display: block;
    }
  }
  @media screen and ${device.tablet} {
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
  padding-bottom: 140px;
  width: 100%;

  @media screen and ${device.tablet} {
    padding: 16px;
  }
`;

export const filterItemsStyles = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: '50%',
    height: '50px',
    width: '50px'
  })
};
