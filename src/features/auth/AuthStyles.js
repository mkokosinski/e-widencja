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

  z-index: 1;

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

export const AnimatedBg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const AnimatedSquare = styled.div`
  width: 100px;
  height: 100px;
  background: rgba(255, 255, 255, 0.05);
  position: absolute;
  top: ${(props) => props.top || 0};
  left: ${(props) => props.left || 0};
  z-index: 0;

  animation: rotate-center ${(props) => props.duration} linear infinite both;

  @keyframes rotate-center {
    0% {
      transform: rotate(0) scale(1) translate(0, 0);
      opacity: 0;
    }
    50% {
      transform: rotate(180deg) scale(4) translate(200%, 0);
      opacity: 1;
    }
    100% {
      transform: rotate(360deg) scale(1) translate(0, 0);
      opacity: 0;
    }
  }
`;
