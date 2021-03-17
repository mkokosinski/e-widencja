import styled from 'styled-components';
import { FlexCenter, gapHorizontal } from '../../../AppStyles';

import { device, Button, H2 } from '../../layout/LayoutStyles';

export const Details = styled.div`
  align-content: flex-start;
  background-color: #f2f3f5;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  font-size: 1em;
  min-height: 100%;
  width: 100%;
  @media screen and (${device.mobileXL}) {
    background-color: #ffffff;
  }
`;

export const DetailsSection = styled.section`
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  box-shadow: 0px 1px 6px -3px rgba(0, 0, 0, 0.3);
  flex: 1 1 100%;
  font-size: 0.9em;
  margin: 8px;
  padding: 8px;

  @media screen and (${device.mobileXL}) {
    flex: 1 1 calc(50% - 16px);
  }
  @media screen and (${device.laptop}) {
    border: none;
    box-shadow: ${(props) => props.theme.shadows.shadow1};
  }
`;

export const SectionDesc = styled(DetailsSection)`
  grid-area: desc;
  display: grid;
  grid-template-areas:
    'toppanel toppanel'
    'info info'
    'info info';
`;

export const DetailsTopPanel = styled.div`
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px 10px 0 0;
  color: ${({ theme }) => theme.main};
  display: flex;
  ${gapHorizontal('10px')}
  font-size: 1.2em;
  grid-area: toppanel;
  margin: 0 0 10px;
  padding: 0 16px 8px;
  width: 100%;

  @media screen and (${device.laptop}) {
    border-radius: none;
    font-size: 1.3em;
    ${gapHorizontal('4px')}
    height: 60px;
  }
`;

export const DetailsGoBack = styled(Button)`
  height: 50%;
  flex-basis: 10%;
  @media screen and (${device.laptop}) {
    height: 40px;
  }
`;

export const DetailsTitle = styled(H2)`
  font-size: 1.1em;
  padding: 10px;
  flex-basis: 70%;

  @media screen and (${device.mobileL}) {
    margin: 0 10px;
    font-size: 1em;
  }
  @media screen and (${device.laptop}) {
    font-size: 1em;
  }
`;

export const DetailsButton = styled(Button)`
  height: 100%;
  flex-basis: 10%;
  display: flex;
  @media screen and (${device.laptop}) {
    font-size: 0.8em;
  }
`;

export const DetailsInfo = styled.div`
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  line-height: 1.2em;
  :nth-child(odd) {
    border-left: 1px solid rgba(0, 0, 0, 0.01);
  }
  :nth-child(2),
  :nth-child(3) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.01);
  }
`;

export const DetailsIco = styled.div`
  height: 50px;
  width: 50px;
  padding: 12px;
  border-radius: 50%;
  box-shadow: 0 1px 4px -2px rgba(0, 0, 0, 0.9);
  color: #444;
  transform: translateY(-6px);
`;

export const DetailsLabel = styled.div`
  font-size: 0.7em;
`;

export const DetailsData = styled.div`
  font-weight: 600;
`;

export const EmptyState = styled.div`
  ${FlexCenter};
  color: ${(props) => props.theme.grayLight};
  font-size: 1.2rem;
  min-height: 200px;
  width: 100%;

  @media screen and (${device.mobileXL}) {
    font-size: 1.6rem;
  }

  @media screen and (${device.laptop}) {
    font-size: 2rem;
  }
`;
