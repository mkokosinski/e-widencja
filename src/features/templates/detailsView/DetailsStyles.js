import styled from 'styled-components';

import { device, Button, H2, A } from '../../layout/LayoutStyles';

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  background-color: #f2f3f5;
  font-size: 1em;

  @media screen and ${device.laptop} {
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
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0px 1px 6px -3px rgba(0, 0, 0, 0.3);
  border-radius: 10px;

  margin: 8px auto;
  padding: 2px;
  width: 98%;

  @media screen and ${device.laptop} {
    border: none;
    box-shadow: 0px 2px 10px -6px rgba(0, 0, 0, 0.3);
  }
`;

export const SectionDesc = styled(DetailsSection)`
  grid-area: desc;

  display: grid;
  grid-template: 60px 1fr 1fr/1fr 1fr;
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
  padding: 0 16px;

  background: ${({ theme }) => theme.mainSoft};
  border-radius: 10px 10px 0 0;
  color: white;
  font-size: 1.2em;

  @media screen and ${device.laptop} {
    border-radius: none;

    height: 60px;
    font-size: 1.2em;
  }
`;

export const DetailsGoBack = styled(Button)`
  height: 50%;
  width: 10%;
  @media screen and ${device.laptop} {
    height: 40px;
    width: 40px;
  }
`;

export const DetailsTitle = styled(H2)`
  font-size: 1.1em;
  margin: 0 10px;
  padding: 10px;
  width: 80%;
  @media screen and ${device.laptop} {
    font-size: 1em;
    width: auto;
  }
`;

export const DetailsEditButton = styled(A)``;

export const DetailsEdit = styled(Button)`
  height: 100%;
  width: 10%;
  @media screen and ${device.laptop} {
    width: 40px;
    font-size: 0.8em;
  }
`;

export const DetailsDelete = styled(Button)`
  height: 100%;
  width: 10%;
  color: rgba(220, 180, 180, 1);

  @media screen and ${device.laptop} {
    width: 40px;
    font-size: 0.8em;
  }
`;

export const DetailsInfo = styled.div`
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px;

  :nth-child(odd) {
    border-left: 1px solid rgba(0, 0, 0, 0.1);
  }

  :nth-child(2),
  :nth-child(3) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

export const DetailsIco = styled.div`
  color: #444;
  width: 10%;
`;

export const DetailsLabel = styled.div``;

export const DetailsData = styled.div`
  font-weight: 600;
`;

export const SectionChart = styled(DetailsSection)`
  grid-area: chart;
`;

export const SectionRecent = styled(DetailsSection)`
  grid-area: recent;
`;
