import styled from 'styled-components';

import { device, Button, H2, A } from '../../layout/LayoutStyles';

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #f2f3f5;
  font-size: 1em;
  @media screen and ${device.mobileXL} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    grid-template-areas:
      'desc recent'
      'chart chart';
    background-color: #ffffff;
    font-size: 1em;
  }
`;

export const DetailsSection = styled.section`
  width: 98%;
  margin: 8px auto;
  padding: 8px;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0px 1px 6px -3px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  font-size: 0.9em;
  @media screen and ${device.laptop} {
    border: none;
    box-shadow: 0px 2px 10px -6px rgba(0, 0, 0, 0.3);
  }
`;

export const SectionDesc = styled(DetailsSection)`
  grid-area: desc;
  display: grid;
  grid-template: fit-content 1fr 1fr/1fr 1fr;
  grid-template-areas:
    'toppanel toppanel'
    'info info'
    'info info';
`;

export const DetailsTopPanel = styled.div`
  grid-area: toppanel;
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0 0 10px;
  padding: 0 16px 8px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px 10px 0 0;
  color: ${({ theme }) => theme.main};
  font-size: 1.2em;

  @media screen and ${device.laptop} {
    border-radius: none;
    font-size: 1.3em;
    height: 60px;
  }
`;

export const DetailsGoBack = styled(Button)`
  height: 50%;
  flex-basis: 10%;
  @media screen and ${device.laptop} {
    height: 40px;
  }
`;

export const DetailsTitle = styled(H2)`
  font-size: 1.1em;
  margin: 0 10px;
  padding: 10px;
  flex-basis: 70%;
  @media screen and ${device.laptop} {
    font-size: 1em;
  }
`;

export const DetailsEditButton = styled(A)``;

export const DetailsEdit = styled(Button)`
  height: 100%;
  margin-right: 10px;
  flex-basis: 10%;
  @media screen and ${device.laptop} {
    font-size: 0.8em;
  }
`;

export const DetailsDelete = styled(Button)`
  height: 100%;
  flex-basis: 10%;
  @media screen and ${device.laptop} {
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

export const SectionChart = styled(DetailsSection)`
  grid-area: chart;
`;

export const SectionRecent = styled(DetailsSection)`
  grid-area: recent;
`;
