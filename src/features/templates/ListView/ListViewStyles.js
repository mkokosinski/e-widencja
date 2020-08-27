import styled from "styled-components";
import { Link } from "react-router-dom";

import SearchBar from "../../searchbar/SearchBar";

import { device, ButtonMain } from "../../layout/LayoutStyles";

export const TopPanel = styled.div`
  display: flex;
  width: 100%;
  margin: 8px 0px;

  & > * {
    margin: 4px 8px;
  }
`;

export const ButtonAdd = styled(ButtonMain)`
`

export const AddItem = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 12px;
  padding: 12px 16px;
  & > * {
    margin: 0px 3px;
  }

  span {
    display: none;
  }

  @media screen and ${device.mobileL} {
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
  width: 100%;
`;