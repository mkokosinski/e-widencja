import styled, { css } from 'styled-components';
import { Form, Field } from 'formik';
import { PanelBordered } from '../layout/LayoutStyles';

// export const StyledForm = styled.form`
//     display:flex;
//     background:red;
//     flex-direction: column;
// `;
export const Container = styled(PanelBordered)`
  max-width: 600px;
  margin: 100px auto;
  padding: 100px;
`;

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;

const inputStyle = css`
  padding: 8px 10px;
  border: 1px solid rgba(54, 54, 54, 0.7);
  border-color: #dbdbdb;
  border-radius: 4px;
  box-sizing: content-box;
  color: #363636;
  cursor: pointer;
  font-size: 0.9rem;

  :focus,
  :active {
    outline: none;
  }
  :hover {
    border-color: #b5b5b5;
  }
  :focus {
    border-color: #3273dc;
    box-shadow: 0 0 0 0.125em rgba(50, 115, 220, 0.25);
  }

  ::placeholder {
    color: rgba(54, 54, 54, 0.3);
  }

  :disabled {
    background-color: whitesmoke;
    border-color: whitesmoke;
    box-shadow: none;
    color: #7a7a7a;
    cursor: not-allowed;
  }
`;

export const Input = styled(Field)`
  ${inputStyle}
`;

export const StyledSelect = styled.div`
  div[class*='control'] {
    min-height: 0;
    ${inputStyle}
    box-sizing: content-box;
    padding: 4px 6px;
    * {
      padding: 0;
      box-sizing: content-box;
      font-size: 1.05rem;
    }
  }
`;

export const Option = styled.option`
  padding: 10px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  padding:20px;
  width: 80%;

  & > div{
    height: 36px;
    width: 116px;
  }
`;
