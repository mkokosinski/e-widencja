import styled from 'styled-components';
import { device, PanelBordered } from '../layout/LayoutStyles';

export const AuthContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;
export const FormContainer = styled(PanelBordered)`
  margin-top: 60px;
  padding: 30px;
  width: 90%;
  max-width: 600px;
`;
