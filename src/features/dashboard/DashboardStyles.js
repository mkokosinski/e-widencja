import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { device } from '../layout/LayoutStyles';
import { DetailsSection } from '../templates/detailsView/DetailsStyles';

export const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 8px;
  padding: 8px;
  height: 100%;
  width: 100%;

  @media screen and (${device.laptop}) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: max-content 1fr;

    & > *:first-child {
      grid-column: 1/3;
    }
  }
`;

export const DashboardSection = styled(DetailsSection)`
  margin: 0;
  padding: 1rem;
`;

export const DashboardTitle = styled.h5``;

export const DashboardLink = styled(Link)`
  display: flex;
  height: 100%;
  width: 100%;
`;

export const Tile = styled(DashboardSection)`
  align-items: center;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const TileIco = styled.div`
  font-size: 4em;
`;

export const TileTitle = styled.h2`
  font-size: 1.5em;
  text-align: center;
`;

export const DashboardList = styled.div``;

export const DashboardListItem = styled(Link)`
  box-shadow: 0 1px 6px -5px rgba(0, 0, 0, 0.5);
  border-left: 3px solid ${({ status, theme }) => theme.status[status]};
  border-radius: 3px;
  cursor: pointer;
  display: flex;
  gap: 3px;
  flex-direction: column;
  font-size: 1rem;
  justify-content: center;
  margin: 8px 0;
  margin-left: 3px;
  padding: 1rem;
  padding-left: 12px;
  position: relative;

  &:hover,
  &:visited {
    box-shadow: 0 1px 8px -6px #000000cc;
    transition: box-shadow 200ms;
  }
`;

export const CheckupRemain = styled.div`
  font-size: 0.8rem;
  opacity: 0.4;
  position: absolute;
  right: 1rem;
`;

export const DashboardHeader = styled.div`
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  max-width: 1000px;
  width: 100%;
  & > * {
    margin: 10px;
  }

  /* &::before {
    background: linear-gradient(
      90deg,
      ${(props) => props.theme.body.background} 40%,
      rgba(0, 0, 0, 0) 80%
    );
    content: '';
    position: absolute;
    display: block;
    height: 100%;
    width: 20px;
    left: -5px;
    top: 0;
    z-index: 1;
  } */
`;

export const RecentUsersSectionStyled = styled.div`
  background-color: ${(props) => props.theme.secondarySoft};
  border-radius: 10px;
  box-shadow: ${(props) => props.theme.shadows.shadow1};
  color: white;
  cursor: pointer;
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
  font-size: 0.9rem;
  gap: 10px;
  margin: 50px 10px 20px;
  padding: 10px;
  width: 200px;

  &:hover {
    box-shadow: ${(props) => props.theme.hover.shadow1};
    transform: scale(1.02);
    transition: box-shadow 150ms, transform 180ms ;
  }
`;

const photoWidth = 60;
const photoScale = 1.5;
const photoHeight = photoWidth * photoScale;

export const RecentUsersSectionPhotoWrapper = styled.div`
  border-radius: ${photoWidth / 2}px;
  display: flex;
  align-items: flex-end;
  height: ${photoHeight}px;
  margin-bottom: -40px;
  overflow: hidden;
  position: relative;
  transform: translate(10px, -50px);
  width: ${photoWidth}px;
`;

export const RecentUsersSectionPhoto = styled.div`
  align-items: center;
  border-radius: ${photoWidth / 2}px;
  color: ${(props) => props.theme.main};
  background: ${(props) => props.theme.lightSoft};
  box-shadow: ${(props) => props.theme.shadows.shadow1};
  display: flex;
  justify-content: center;
  height: ${photoWidth}px;
  width: ${photoWidth}px;

  & > * {
    height: ${photoWidth - 5}px;
    position: relative;
    transform: translate(5px, -5px) scale(${photoScale});
    width: ${photoWidth - 5}px;
  }
`;

export const RecentUsersSectionInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const RecentUsersSectionInfo = styled.div`

`

export const ProfileSectionButtons = styled.div``;
