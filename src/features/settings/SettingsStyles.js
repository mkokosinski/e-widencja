import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import { device } from '../layout/LayoutStyles';
import { DetailsSection } from '../templates/detailsView/DetailsStyles';

export const StyledSettings = styled(DetailsSection)``;

export const SettingsTitle = styled.h4``;

export const SettingItem = styled.div`
  border-bottom: 1px solid black;
  padding: 10px;

  &:last-child {
    border-bottom: none;
  }
`;

export const PurposesContainer = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  position: relative;
  width: 100%;

  @media screen and (${device.tablet}) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }

  @media screen and (${device.laptop}) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
`;

export const PurposeItemContainer = styled.div``;

export const StyledPurposeItem = styled(motion.div)`
  align-items: center;
  background: white;
  box-shadow: ${(props) => props.theme.shadows.shadow1};
  display: flex;
  justify-content: space-between;
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

export const ExpandedPurposeItem = styled(motion.div)`
  align-items: center;
  display: flex;
  justify-content: center;
  z-index: 2;
  top: calc(50vh - 100px);
  left: calc(50vw - 200px);
  position: fixed;
`;

export const ExpandedPurposeItemContent = styled(motion.div)`
  align-items: center;
  box-shadow: ${(props) => props.theme.shadows.shadow1};
  background: white;
  display: flex;
  justify-content: center;
  padding: 10px;
  height: 200px;
  width: 400px;
`;

export const ExpandedPurposeItemInput = styled(motion.div)``;

export const PurposeTitle = styled(motion.div)`
  overflow: hidden;
  font-size: 14px;
  text-overflow: ellipsis;
  opacity: 1;
`;

export const PurposeButtonsContainer = styled(motion.div)`
  display: flex;
`;

export const PurposeButton = styled.div`
  margin: 0 5px;
  opacity: 0.2;
  transition: 200ms;
  &:hover {
    opacity: 0.5;
  }
`;
