import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { device } from '../layout/LayoutStyles';
import { DetailsSection } from '../templates/detailsView/DetailsStyles';

export const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(3, min-content);
  gap: 8px;
  padding: 8px;
  height: 100%;
  width: 100%;

  @media screen and (${device.laptop}) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, min-content);

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
  border-radius: 3px;
  cursor: pointer;
  display: flex;
  gap: 3px;
  flex-direction: column;
  font-size: 0.8rem;
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

  @media screen and (${device.mobileXL}) {
    font-size: 0.9rem;
  }
`;

export const BorderedListItem = styled(DashboardListItem)`
  border-left: 3px solid ${({ status, theme }) => theme.status[status]};
`;

export const ListItemMinorInfo = styled.div`
  font-size: 0.7rem;
  opacity: 0.4;
  position: absolute;
  right: 1rem;
`;

export const DashboardHeader = styled.div`
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  max-width: 1250px;
  min-height: 50px;
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
  background-color: ${(props) => props.theme.mainSoft};
  border-radius: 10px;
  box-shadow: ${(props) => props.theme.shadows.shadow1};
  color: white;
  cursor: pointer;
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
  font-size: 0.9rem;
  gap: 10px;
  line-height: 1.5rem;
  margin: 50px 10px 20px;
  opacity: 0.9;
  padding: 10px;
  position: relative;

  &:hover {
    box-shadow: ${(props) => props.theme.hover.shadow1};
    opacity: 0.95;
    transform: translateY(-2px);
    transition: box-shadow 250ms, opacity 250ms;
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
  margin-bottom: -50px;
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

  svg {
    margin-right: 5px;
  }
`;

export const RecentUsersSectionName = styled.div`
  font-size: 1rem;
`;
export const RecentUsersSectionDesc = styled.div`
  opacity: 0.8;
`;
export const RecentUsersSectionInfo = styled.div`
  opacity: 0.8;
`;
export const RecentUsersSectionIco = styled.div`
  background: ${(props) => props.theme.secondary};
  border-radius: 5px;
  bottom: -8px;
  padding: 6px 4px;
  position: absolute;
  right: -8px;
  transform: rotate(-14deg);
`;

export const RecentUsersSectionMoreButton = styled.div`
  position: absolute;
  top: 12px;
  right: 16px;
`;
