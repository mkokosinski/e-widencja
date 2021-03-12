import styled, { css } from 'styled-components';
import { Button, H2 } from '../layout/LayoutStyles';

export const StyledChart = styled.div`
  padding: 10px;
  margin: 16px 0;
  width: 100%;
`;

export const Title = styled(H2)`
  color: rgba(0, 0, 0, 0.8);
`;

export const Pagination = styled.div`
  align-items: center;
  color: rgba(0, 0, 0, 0.7);
  display: flex;
  font-weight: bold;
  justify-content: space-around;
  margin: 0 auto;
  width: max-content;
`;

export const ButtonPagintation = styled(Button)`
  font-size: 1.2rem;
  height: 30px;
  width: 30px;
  margin: 10px;

  ${(props) =>
    props.disabled &&
    css`
      cursor: not-allowed;
      background-color: ${({ theme }) => theme.grayLighter};
      color: ${({ theme }) => theme.grayLight};
    `}
`;

export const Canvas = styled.canvas`
  width: 100% !important;
`;
