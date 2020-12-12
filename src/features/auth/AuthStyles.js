import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { device, PanelBordered } from '../layout/LayoutStyles';

export const AuthContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;

  @media screen and (${device.tablet}) {
    display: grid;
    grid-template-columns: 2fr 3fr;
    align-items: stretch;
    justify-content: stretch;
  }
`;

export const FormContainer = styled.div`
  background-color: white;
  display: grid;
  grid-template-rows: 140px 1fr;
  overflow: hidden;
  padding: 0 16px;

  @media screen and (${device.laptop}) {
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.4em;
  color: ${({ theme }) => theme.main};
`;

export const AuthFormHeader = styled.h2`
  color: ${(props) => props.theme.textColor};
  font-size: 1.8rem;
  font-weight: 700;
`;

export const AuthFormSubHeader = styled.h4`
  color: ${(props) => props.theme.textColorLighter};
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.4rem;
  margin: 0.6rem 0 1.6rem;
`;

export const AuthLink = styled(Link)`
  color: ${(props) => props.theme.linkColor};
`;

export const AuthButtonsWrapper = styled.div`
  display: flex;
  height: 40px;
  margin: 20px 0;
`;

export const AuthFormFooter = styled.div`
  font-size: 0.8rem;
  line-height: 1.4rem;
  text-align: center;
`;

export const AuthBackground = styled.div`
  background: linear-gradient(
    120deg,
    ${({ theme }) => theme.main} 40%,
    ${({ theme }) => theme.mainSoft} 100%
  );
  display: flex;
  flex-direction: column;
  padding: 20%;
  overflow: hidden;
  z-index: -1;
`;

export const AuthBackgroundImg = styled.div`
  position: relative;
  flex: 1 1;

  & > * {
    &:nth-child(1) {
      height: 100%;
      width: 100%;
      top: -20px;
      position: absolute;
    }

    &:nth-child(2) {
      bottom: 10px;
      height: 60%;
      width: 60%;
      position: absolute;

      animation: rotate-center 2000ms linear infinite both;

      @keyframes rotate-center {
        0% {
          transform: translateY(0);
        }

        50% {
          transform: translateY(6px);
        }

        100% {
          transform: translateY(0);
        }
      }
    }
  }
`;

export const AuthBackgroundTitle = styled.h5`
  color: white;
  font-size: 1.6rem;
  font-weight: 600;
  text-align: center;
`;

export const AuthBackgroundText = styled.div`
  color: white;
  font-size: 0.9rem;
  font-weight: 300;
  margin: 16px 0;
  opacity: 0.5;
  text-align: center;
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
