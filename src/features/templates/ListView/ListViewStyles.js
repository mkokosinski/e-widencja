import styled from 'styled-components';
import { Link } from 'react-router-dom';

import SearchBar from '../../searchbar/SearchBar';

import { device, ButtonMain, size, Button, ButtonBorderedMain } from '../../layout/LayoutStyles';

export const TopPanel = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 8px 0px;
  padding: 4px;
  & > * {
    margin: 4px 0px;
  }

  @media screen and ${device.mobileXL} {
    flex-direction: row;
  }
`;

export const ButtonAdd = styled(ButtonMain)`
  @media screen and (max-width: ${size.mobileXL}px) {
    position: fixed;
    bottom: 60px;
    right: 16px;
    height: 60px;
    width: 60px;
    z-index: 2;
    background: ${(props) => props.theme.secondary};
    border-radius: 50%;
    box-shadow: 0 1px 12px -4px rgba(0, 0, 0, 0.7);
    color: white;
  }
`;

export const SelectContainer = styled.div`
  @media screen and ${device.mobileXL} {
  }
`;

export const DatePickerContainer = styled.div`
  display: flex;
  flex-direction:column;
  padding:10px;
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
  width: 100%;
`;

export const FilterButton = styled(ButtonBorderedMain)`
  border-radius: 50%;
  height: 50px;
  width: 50px;
`

export const filterItemsStyles = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: '50%',
    height: '50px',
    width: '50px'
  }),
} 