import styled from 'styled-components';
import { device, PanelBordered } from '../layout/LayoutStyles';
import Logo from '../layout/Logo';

export const AuthContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100vw;
  min-height: 100vh;
  height: 100%;
  width: 100%;

  background: linear-gradient(
    120deg,
    ${({ theme }) => theme.main} 40%,
    ${({ theme }) => theme.mainSoft} 100%
  );
`;

export const FormContainer = styled(PanelBordered)`
  display: flex;
  flex-direction: column;
  height: 340px;
  max-width: 600px;
  width: 90%;
  margin: 0 auto;
  padding: 30px;

  box-shadow: 0 2px 20px -2px rgba(0, 0, 0, 0.7);

  @media screen and ${device.laptop} {
    height: 440px;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4em;
  color: ${({ theme }) => theme.main};
`;
