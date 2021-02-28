import React from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRecordVinyl } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as LogoIco } from '../../assets/ewidencjaLogo.svg';

import { device } from './LayoutStyles';

const StyledLogo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  h2,
  h4 {
    font-family: 'Aldrich', sans-serif;
    font-size: 1em;
    padding: 0;
  }

  h4 {
    display: none;
  }
  svg {
    margin: 0 10px;
    width: 1.6em;
  }

  @media screen and (${device.laptop}) {
    align-items: center;
    flex-direction: column;

    h2,
    h4 {
      font-size: 1.2em;
      display: block;
    }

    svg {
      margin-bottom: 10px;
      width: 2em;
    }
  }
`;

const Ico = styled.div`
  padding: 9px 10px;
`;

const Content = styled.div`
  display: flex;
  text-align: right;
  align-items: center;

  @media screen and (${device.laptop}) {
    display: block;
  }
`;

const Logo = () => {
  return (
    <StyledLogo>
      <LogoIco />
      <Content>
        <h2>E-widencja</h2>
        <h4>pojazdów</h4>
      </Content>
    </StyledLogo>
  );
};

export default Logo;
