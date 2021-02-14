import styled from 'styled-components';
import { FlexCenter, gap } from '../../AppStyles';

export const StyledReportGrid = styled.div`
  background: black;
  display: grid;
  grid-template-columns: ${(props) =>
    `repeat(${props.itemsCount}, minmax(min-content, 1fr))`};
  gap: 1px;
  padding: 1px;
  width: 100%;
`;

export const Cell = styled.div`
  ${FlexCenter}
  background: white;
  height: 100%;
  width: 100%;
`;

export const ReportLabel = styled.label``;

export const ReportVatContent = styled.div`
  display: flex;
  flex-direction: column;
  ${gap('10px')}
  padding: 20px;
`;
