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

  margin: 4px;
  padding: 2px;

  @media screen and ${device.laptop} {
    margin: 10px;
    padding: 10px;

    border: none;
    box-shadow: 0px 2px 10px -6px rgba(0, 0, 0, 0.3);
  }
`;

export const SectionDesc = styled(DetailsSection)`
  grid-area: desc;
`;

export const DetailsTopPanel = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;

  color: ${({ theme }) => theme.main};
  font-size: 1.2em;

  @media screen and ${device.laptop} {
    height: 60px;
    margin-left: 30px;
    font-size: 1.2em;
  }
`;
export const DetailsGoBack = styled(Button)`
  height: 100%;
  width: 10%;
  @media screen and ${device.laptop} {
    height: 40px;
    width: 40px;
  }
`;

export const DetailsTitle = styled(H2)`
  font-size: 1.1em;
  padding: 10px;
  width: 80%;
  @media screen and ${device.laptop} {
    font-size: 1em;
    margin: 0 10px;
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
  color: rgba(220, 80, 80, 1);

  @media screen and ${device.laptop} {
    width: 40px;
    font-size: 0.8em;
  }
`;

export const DetailsInfo = styled.div`
  border-bottom: 1px solid rgba(0, 0, 100, 0.2);
  color: #333;
  display: flex;
  margin: 6px 0;
  padding: 12px;

  :last-child {
    border: none;
  }
`;

export const DetailsIco = styled.div`
  color: #444;
  width: 10%;
`;

export const DetailsLabel = styled.div`
  width: 60%;
`;

export const DetailsData = styled.div`
  font-weight: 600;
  width: 30%;
`;

export const SectionChart = styled(DetailsSection)`
  grid-area: chart;
`;

export const SectionRecent = styled(DetailsSection)`
  grid-area: recent;
`;
