import React from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRecordVinyl } from '@fortawesome/free-solid-svg-icons';
import { device } from './LayoutStyles';

const Container = styled.div`
  grid-area: logo;

  align-items: center;
  justify-content: center;
  display: flex;
`;

const StyledLogo = styled.div`
  display: flex;
  color: white;

  h2,
  h4 {
    margin: 0;
    padding: 0;
  }

  h4 {
    display: none;

    @media screen and ${device.tablet} {
      display: block;
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
  
  @media screen and ${device.tablet} {
    display: block;
  }
`;

const Logo = () => {
  return (
    <Container>
      <StyledLogo>
        <Ico>
          <FontAwesomeIcon icon={faRecordVinyl} />
        </Ico>
        <Content>
          <h2>E-widencja</h2>
          <h4>pojazdów</h4>
        </Content>
      </StyledLogo>
    </Container>
  );
};

export default Logo;
