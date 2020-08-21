import styled from "styled-components";

export const StyledLayout = styled.div`
  background: ${({ theme }) => theme.mainSoft};
  display: flex;
  min-height: 100vh;
  box-sizing: content-box;

  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ theme }) => theme.font.size};
`;

export const Menu = styled.div`
  display: flex;
  width: 20%;
  flex-direction: column;
`;

export const Body = styled.div`
  background: white;
  margin: 10px 10px 10px 0px;
  border-radius: 30px;
  width: 80%;
`;
