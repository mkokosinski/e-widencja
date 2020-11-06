import styled, { css } from 'styled-components';
import { Form, Field } from 'formik';
import { PanelBordered, device, Button } from '../layout/LayoutStyles';

// export const StyledForm = styled.form`
//     display:flex;
//     background:red;
//     flex-direction: column;
// `;
export const Container = styled(PanelBordered)`
  width: 96%;
  padding: 10px;
  align-self: center;
  margin-bottom: 20px;

  @media screen and (${device.tablet}) {
    margin: 20px 10px;
    padding: 32px 54px;

    width: 70%;
  }

  @media screen and (${device.laptop}) {
    max-width: 600px;
    width: auto;
    margin: 30px auto;
  }

  @media screen and (${device.laptopL}) {
    margin: 70px auto;
    max-width: 700px;
    width: auto;
    padding: 40px 60px;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 2px 0;

  & > * {
    padding: 6px;
  }

  @media screen and (${device.tablet}) {
    flex-direction: row;
    justify-content: space-between;
    margin: 4px 0;
  }

  @media screen and (${device.laptopL}) {
    & > * {
      padding: 8px;
    }
  }
`;

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 100%;
  ${(props) => props.theme.isMobileKeyboard && css``}
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const StyledCheckbox = styled(FormField)`
  align-items: center;
  flex-direction: row;

  & > * {
    padding: 0 3px;
  }
`;

export const Label = styled.label`
  padding: 2px 0;
`;

const inputStyle = css`
  padding: 8px 10px;
  width: 100%;
  border: 1px solid rgba(54, 54, 54, 0.7);
  border-color: #dbdbdb;
  border-radius: 4px;
  color: #363636;
  cursor: pointer;
  font-size: 0.9rem;
  border-color: ${(props) => props.haserror && 'red'};

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

export const Input = styled.input`
  ${inputStyle}
`;

export const DateRange = styled(Input)`
  width: 50%;
`;

export const StyledField = styled(Field)`
  ${inputStyle}
`;

export const StyledSelect = styled.div`
  div[class*='control'] {
    min-height: 0;
    ${inputStyle}
    padding: 4px 6px;
    * {
      padding: 0;
      font-size: 1em;
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
  margin: 30px auto 0;

  & > div {
    height: 42px;
    margin: 0 20px;
    width: 100px;
  }

  @media screen and (${device.tablet}) {
    & > div {
      height: 50px;
      width: 120px;
    }
  }

  @media screen and (${device.laptop}) {
    padding: 20px;

    & > div {
      height: 50px;
      width: 130px;

      margin: 0 20px;
    }
  }
`;

export const FieldsGroup = styled.div`
  display: grid;
  grid-template: 1fr/2fr 1fr auto;

  grid-gap: 10px;
  align-items: flex-end;

  @media screen and (${device.tablet}) {
    width: 100%;
  }
`;

export const ItemButton = styled(Button)`
  font-size: 0.8em;
  color: ${(props) => props.theme.mainSoft};
`;

export const AddItemButton = styled(ItemButton)`
  display: flex;
  align-items: center;
  width: 100%;
  span {
    margin-left: 4px;
  }
`;

export const RemoveItemButton = styled(ItemButton)`
  border: 1px solid ${(props) => props.theme.mainSoft};
  height: 32px;
  width: 32px;
`;

export const Group = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

export const GroupTitle = styled.div`
  background: ${(props) => props.theme.sort.title.bg};
  color: ${(props) => props.theme.sort.title.color};
  flex: 1 1 100%;
  font-size: 0.8em;
  padding: 20px 10px 6px;
`;

export const GroupItem = styled.div`
  background: ${(props) => props.theme.sort.item.bg};
  color: ${(props) => props.theme.sort.item.color};
  cursor: pointer;
  flex: 1 1 100%;
  padding: 0 26px;

  &:not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  &:hover {
    background-color: ${(props) => props.theme.sort.item.hover.bg};
  }
`;

export const RadioButton = styled.label`
  align-items: center;
  cursor: inherit;
  display: flex;
  justify-content: space-between;
  padding: 10px 0px;

  input {
    display: none;
  }
`;

export const RadioControl = styled.span`
  width: 24px;
  height: 24px;

  svg {
    fill: none;
    stroke: ${(props) => props.theme.mainSoft};
    stroke-width: 4px;

    pointer-events: none;
    transition: transform 0.1s ease-in;
    transform: scale(0);
    transform-origin: bottom left;
  }

  input:checked + & {
    svg {
      transform: scale(1);
    }
  }
`;
