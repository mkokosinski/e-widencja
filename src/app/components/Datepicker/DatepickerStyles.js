import styled, { css } from 'styled-components';

const Button = styled.button`
  align-items: center;
  align-items: center;
  background: none;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  transition: background-color 100ms;
  user-select: none;
  white-space: nowrap;

  :focus,
  :active {
    outline: none;
  }

  :disabled {
    cursor: not-allowed;
  }
`;

export const DatepickerPortal = styled.div`
  display: contents;
  position: relative;
`;

export const DatepickerContent = styled.div`
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 1px 12px -4px rgba(0, 0, 0, 0.5),
    0 4px 24px -4px rgba(0, 0, 0, 0.2);
  padding: 10px;
  min-width: 250px;
  max-width: 90%;
  position: absolute;

  animation: show 200ms linear both;
  @keyframes show {
    from {
      opacity: 0;
      transform: scale(0.9) translate(-10%, -10%);
    }
    to {
      opacity: 1;
      transform: scale(1) translate(0, 0);
    }
  }
`;

export const DatepickerContainer = styled.div`
  ${(props) => {
    return (
      props.isOpen &&
      css`
        top: 0;
        left: 0;

        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100vh;
        position: fixed;
        z-index: 9999;

        ${DatepickerContent} {
          top: 32vh;
        }
      `
    );
  }}
`;

export const DatepickerHeader = styled.div`
  display: grid;
  grid-template-columns: 10% 1fr 10%;
  justify-content: center;
  padding: 5px 0 10px;
`;

export const DetepickerActiveMonth = styled.div`
  font-size: 1em;
  font-weight: bold;
  text-align: center;
`;

export const DatepickerButton = styled(Button)``;
export const DatepickerPrevious = styled(DatepickerButton)``;

export const DatepickerNext = styled(DatepickerButton)``;

export const DatepickerDaysNamesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
`;

export const DatepickerDaysContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding: 6px 0;
  gap: 3px;
`;

export const DatepickerDay = styled(Button)`
  border-radius: 0;
  flex: 1 1;
  padding: 3px 6px;
  transition: none;
  text-align: center;

  &:hover {
    background-color: ${(props) => props.theme.hover.mainSoft};
    color: white;
  }

  &:active {
    background-color: unset;
  }

  ${(props) =>
    props.isRanged &&
    css`
      background-color: ${(props) => props.theme.mainSoft}aa;
      color: white;
    `}

  ${(props) =>
    props.isSelected &&
    css`
      background-color: ${(props) => props.theme.mainSoft};
      color: white;
    `}

  ${(props) =>
    props.isOtherMonth &&
    css`
      color: #999;
    `}

    ${(props) =>
    props.isDisabled &&
    css`
      background-color: ${(props) => props.theme.disabled.bg};
      color: ${(props) => props.theme.disabled.color};
      cursor: not-allowed;

      &:hover {
        background-color: ${(props) => props.theme.disabled.bg};
        color: ${(props) => props.theme.disabled.color};
      }
    `}
`;

export const MonthpickerMonthsContainer = styled(DatepickerDaysContainer)`
  grid-template-columns: repeat(3, 1fr);
`;

export const MonthpickerMonth = styled(DatepickerDay)`
  height: 30px;
`;
