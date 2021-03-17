import styled, { css } from 'styled-components';
import { FlexCenter, gap } from '../../AppStyles';
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
  background: ${(props) =>
    props.isGenerated ? props.theme.greenLight : props.theme.mainSoft};
  color: ${({ theme }) => theme.white};
  font-size: 22px;
  height: 50px;
  padding: 12px 24px;
  transition: opacity 200ms;

  ${(props) =>
    props.isDisabled &&
    css`
      cursor: not-allowed;
      background: ${({ theme }) => theme.grayLight};
      color: ${({ theme }) => theme.gray};
    `}

  span {
    font-size: 16px;
    margin-left: 6px;
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
