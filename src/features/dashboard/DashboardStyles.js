import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { DetailsSection } from '../templates/detailsView/DetailsStyles';
export const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(1, 1fr);
  gap: 8px;
  padding: 8px;
  height: 100%;
  width: 100%;
`;

export const DashboardSection = styled(DetailsSection)`
  margin: 0;
  padding: 1rem;
`;

export const DashboardHeader = styled(DashboardSection)``;

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
  box-shadow: 0 1px 10px -8px rgba(0, 0, 0, 0.5);
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
