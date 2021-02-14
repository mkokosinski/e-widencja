import styled from 'styled-components';
import { FlexCenter, gap, gapHorizontal } from '../../AppStyles';
import { Button } from '../layout/LayoutStyles';

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

export const ReportDownloadButton = styled(Button)`
  background: ${({ theme }) => theme.greenLight};
  color: ${({ theme }) => theme.white};
  ${gapHorizontal('6px')}
  font-size: 22px;
  padding: 12px 24px;
  transition: opacity 200ms;
  span {
    font-size: 16px;
  }
  &:hover {
    opacity: 0.8;
  }
`;

export const ReportVatContent = styled.div`
  display: flex;
  flex-direction: column;
  ${gap('10px')}
  padding: 20px;
`;
