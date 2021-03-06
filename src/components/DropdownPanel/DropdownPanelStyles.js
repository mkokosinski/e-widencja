import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FlexCenter } from '../../AppStyles';
import { device } from '../../features/layout/LayoutStyles';

export const StyledDropdownPanel = styled(motion.div)`
  width: 98%;
  margin: 8px auto;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0px 1px 6px -3px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  font-size: 0.9em;
  overflow: hidden;

  @media screen and (${device.laptop}) {
    border: none;
    box-shadow: ${(props) => props.theme.shadows.shadow1};
  }
`;

export const DropdownPanelHeader = styled(motion.div)`
  align-items: center;
  background: #ffffff;
  border-bottom: 1px solid ${(props) => props.theme.grayLight};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  padding-right: 40px;
  position: relative;
  z-index: 1;

  &:hover {
    background: ${(props) => props.theme.grayLighter};
  }

  &:active {
    background: ${(props) => props.theme.grayLight};
  }
`;

export const DropdownPanelTitle = styled.h4``;

export const DropdownPanelArrow = styled.div`
  ${FlexCenter}
  transform: ${(props) => (props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 500ms;
`;

export const DoropdownContent = styled(motion.div)`
  display: flex;
  width: 100%;
  overflow: hidden;

  flex-direction: column;
`;
