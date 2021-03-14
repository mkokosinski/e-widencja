import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { device, PanelBordered } from '../layout/LayoutStyles';
import Wave from '../../assets/wave.svg';
import Squares from '../../assets/chessBoard.svg';
import { StyledForm } from '../forms/FormsStyles';
import { motion } from 'framer-motion';

export const AuthContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr max-content;
  min-height: 100vh;
  width: 100vw;
  /* height: ${({ theme }) => theme.currSiteSize.height}px; */

  @media screen and (${device.tablet}) {
    align-items: stretch;
    display: grid;
    grid-template-columns: minmax(300px, 580px) 3fr;
    justify-content: stretch;
    @media screen and (${device.laptop}) {
    }
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  margin: 0 auto;
  overflow: hidden;

  @media screen and (${device.tablet}) {
    display: grid;
    grid-template-rows: 200px 1fr;
    max-width: 600px;
    padding: 0 26px;
    max-width: 500px;
  }
`;

export const AuthForm = styled(StyledForm)`
  display: grid;
  grid-template-rows: 34% 3fr;
  justify-content: space-around;
  height: 100%;

  @media screen and (${device.mobileM}) {
  }

  @media screen and (${device.tablet}) {
    grid-template-rows: max-content 3fr;
    height: auto;
  }
`;

export const LogoContainer = styled.div`
  align-items: center;
  background: ${({ theme }) => theme.mainSoft};
  color: white;
  display: flex;
  font-size: 1.2rem;
  margin: 10px 5px 0;
  stroke: white;

  @media screen and (${device.mobileM}) {
    background: unset;
    font-size: 1.4rem;
  }

  @media screen and (${device.tablet}) {
    background: unset;
    font-size: 1.6rem;
    justify-content: center;
    color: ${({ theme }) => theme.main};
    stroke: ${({ theme }) => theme.main};
  }

  @media screen and (${device.desktop}) {
    font-size: 2rem;
  }
`;

export const AuthFormHeader = styled.div`
  display: flex;
  color: white;
  flex-direction: column;
  justify-content: center;
  padding: 16px;
  position: relative;

  h2 {
    font-size: 1.8rem;
    font-weight: 700;
    opacity: 0.9;
  }

  h4 {
    font-size: 1rem;
    font-weight: 300;
    line-height: 1.4rem;
    margin: 0.6rem 0;
    opacity: 0.6;
  }

  @media screen and (${device.tablet}) {
    color: ${(props) => props.theme.textColor};
  }
`;

export const AuthFormBody = styled(motion.div)`
  padding: 10px 16px 0px;
`;

export const AuthFormFooter = styled.div`
  font-size: 0.8rem;
  line-height: 1.4rem;
  padding-bottom: 16px;
  text-align: center;
`;

export const AuthLink = styled(Link)`
  color: ${(props) => props.theme.linkColor};
`;

export const AuthButtonsWrapper = styled.div`
  display: flex;
  height: 40px;
  margin: 20px 0;
`;

export const AuthBackgroundMobile = styled(motion.div)`
  @media screen and (${device.max.tablet}) {
    background: white;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    pointer-events: none;

    &::before {
      content: '';
      height: 35%;
      width: 100%;
      background-color: ${({ theme }) => theme.mainSoft};
      position: absolute;
      top: 0;
      left: 0;
    }

    &::after {
      content: '';
      height: 50px;
      width: 100%;
      background: url(${Wave});
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-color: white;
      position: absolute;
      top: 35%;
      left: 0;
    }

    @media screen and (${device.mobileM}) {
      &::before {
        height: 32%;
      }

      &::after {
        top: 32%;
      }
    }

    @media screen and (${device.laptop}) {
    }
  }
`;

export const AuthBackground = styled.div`
  background: ${({ theme }) => theme.mainSoft};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  z-index: -1;

  @media screen and (${device.laptop}) {
  }
`;

export const AuthBackgroundImg = styled.div`
  display: flex;
  justify-content: center;
  height: 70%;
  position: relative;

  & > * {
    &:nth-child(1) {
      height: 320px;
      width: 320px;
      top: 160px;
      position: absolute;
    }

    &:nth-child(2) {
      top: 320px;
      height: 220px;
      width: 220px;
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

export const AuthBackgroundSquares = styled.div`
  background: url(${Squares}) no-repeat;
  width: 200px;
  height: 200px;
  opacity: 0.01;
  position: absolute;
  z-index: -1;
  animation: squares 6000ms linear infinite both;

  &:nth-child(3) {
    transform: translate(100px, 120px) scale(1.2);
  }
  &:nth-child(4) {
    transform: translate(-120px, 360px);
  }

  @keyframes squares {
    0% {
      opacity: 0.01;
    }

    50% {
      opacity: 0.05;
    }

    100% {
      opacity: 0.01;
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
  margin: 16px auto;
  max-width: 500px;
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
