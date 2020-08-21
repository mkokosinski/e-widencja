import React from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRecordVinyl } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  width: 100%;
`;

const StyledLogo = styled.div`
  display: flex;
  color: white;

  h2,
  h4 {
    margin: 0;
    padding: 0;
  }
`;

const Ico = styled.div`
  padding:9px 10px;
`;

const Content = styled.div`
  text-align: right;
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
