import styled from 'styled-components';
import { Button, H2 } from '../layout/LayoutStyles';

export const StyledChart = styled.div`
  padding: 10px;
  margin: 16px 0;
`;

export const Title = styled(H2)`
  color: rgba(0, 0, 0, 0.8);

`;

export const Buttons = styled.div`
  display: flex;
  justify-content: space-around;

  color: rgba(0, 0, 0, 0.7);

  margin: 0 auto;
  width: 90%;
`;

export const ButtonPagintation = styled(Button)`
  height: 40px;
  width: 100px;
`;

export const Canvas = styled.canvas`
    width: 100%;
`
