import { device } from '../layout/LayoutStyles';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

export const StyledSettings = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const SettingsSection = styled.div`
  padding: 20px 60px 40px;
`;

export const SettingsTitle = styled.h4``;

export const SettingItem = styled.div`
  border-bottom: 1px solid black;
  padding: 10px;

  &:last-child {
    border-bottom: none;
  }
`;

export const FeatureItemsContainer = styled.div`
  background: ${(props) => props.theme.grayLighter};
  /* border: 1px dashed ${(props) => props.theme.gray}; */
  box-shadow: 0 0 4px -2px rgba(0, 0, 0, 0.4) inset;
  display: grid;
  gap: 10px;
  margin: 10px;
  padding: 20px;
  position: relative;

  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;

export const FeatureItemContainer = styled.div``;

export const StyledFeatureItem = styled(motion.div)`
  align-items: center;
  background: white;
  box-shadow: ${(props) => props.theme.shadows.shadow1};
  display: flex;
  justify-content: space-between;
  height: 50px;
  overflow: hidden;
  padding: 10px 20px;
  white-space: nowrap;
  width: 100%;

  &:hover {
    box-shadow: ${(props) => props.theme.hover.shadow1};
  }

  @media screen and (${device.laptop}) {
    cursor: pointer;
  }
`;

export const FeatureItemsTitle = styled(motion.div)`
  flex: 1 1 90%;
  overflow: hidden;
  font-size: 14px;
  text-overflow: ellipsis;
  opacity: 1;
`;

export const FeatureItemButtonsContainer = styled(motion.div)`
  display: flex;
  flex: 1 1 10%;
`;

export const FeatureItemButton = styled.div`
  align-items: center;

  display: flex;
  justify-content: center;
  margin: 0 5px;
  opacity: 0.3;

  &:hover {
    opacity: 0.5;
    transition: opacity 200ms;
  }
  @media screen and (${device.tablet}) {
    cursor: pointer;
  }

  ${(props) =>
    props.color &&
    css`
      svg {
        color: ${(props) => props.theme[props.color]};
      }
    `}
`;

export const ExpandedFeatureItem = styled(motion.div)`
  align-items: center;
  display: flex;
  justify-content: center;
  height: 75px;
  left: -20px;
  position: absolute;
  top: 10%;
  width: calc(100% + 40px);
  z-index: 2;

  @media screen and (${device.tablet}) {
    width: 380px;
    left: calc(50vw - 230px);
  }
  @media screen and (${device.laptop}) {
    width: 380px;
    left: calc(50vw - 370px);
  }

  ${FeatureItemButton} {
    font-size: 20px;
    height: 30px;
    margin: 0;
    width: 30px;
  }
`;

export const ExpandedItemOverlay = styled(motion.div)`
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(5px);
  width: 100%;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  z-index: 1;
`;

export const ExpandedItemContent = styled(motion.div)`
  align-items: center;
  box-shadow: ${(props) => props.theme.shadows.shadow1};
  background: white;
  display: flex;
  height: 75px;
  padding: 10px;
  width: 100%;
`;

export const FeatureItemInputContainer = styled.div`
  flex: 1 1 90%;
  margin: 0 8px;
`;

export const FeatureItemInput = styled.input`
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.main};
  padding: 5px;
  transition: 300ms;
  width: 100%;
  &:focus,
  &:active {
    outline: none;
  }
  &:hover {
    border-color: #b5b5b5;
  }
  &:focus {
    border-bottom: 1px solid ${(props) => props.theme.mainSoft};
  }

  &::placeholder {
    color: rgba(54, 54, 54, 0.3);
  }

  &:disabled {
    background-color: whitesmoke;
    border-color: whitesmoke;
    box-shadow: none;
    color: #7a7a7a;
    cursor: not-allowed;
  }
`;
