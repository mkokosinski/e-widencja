import styled, { css } from 'styled-components';
import { Form, Field } from 'formik';
import { PanelBordered, device } from '../layout/LayoutStyles';
import { useSelector } from 'react-redux';
import { selectIsMobileKeyboard } from '../layout/layoutSlice';

// export const StyledForm = styled.form`
//     display:flex;
//     background:red;
//     flex-direction: column;
// `;
export const Container = styled(PanelBordered)`
  width: 96%;
  padding: 10px;
  align-self: center;

  @media screen and ${device.tablet} {
    margin: 20px 10px;
    padding: 32px 54px;
    
    width: 70%;
  }

  @media screen and ${device.laptop} {
    max-width: 500px;
    width: auto;
    margin: 20px auto;
  }

  @media screen and ${device.laptopL} {
    max-width: 500px;
    width: auto;
    margin: 60px auto;
    padding: 40px 60px;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2px 0;

   & > *{
     margin: 6px;
   }

  @media screen and ${device.tablet} {
    flex-direction: row;
    justify-content: space-between;
    margin: 4px 0;
  }

  @media screen and ${device.laptopL} {
    & > *{
     margin: 8px;
   }
  }
`;

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 100%;
  ${(props) =>
    props.theme.isMobileKeyboard &&
    css`
    `}
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Label = styled.label``;

const inputStyle = css`
  padding: 8px 10px;
  border: 1px solid rgba(54, 54, 54, 0.7);
  border-color: #dbdbdb;
  border-radius: 4px;
  box-sizing: content-box;
  color: #363636;
  cursor: pointer;
  font-size: 0.9rem;
  border-color: ${(props) => props.hasError && 'red'};

  div[class*='react-datepicker'] {
    height: 200px;
  }

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

export const StyledError = styled.div`
  color: red;
  font-size: 0.8rem;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 30px auto 0;

  & > div {
    height: 40px;
    width: 100px;
  }

  @media screen and ${device.tablet} {
    gap: 40px;

    & > div {
      height: 50px;
      width: 120px;
    }
  }

  @media screen and ${device.laptop} {
    padding: 20px;
    gap: 50px;

    & > div {
      height: 50px;
      width: 130px;
    }
  }
`;
