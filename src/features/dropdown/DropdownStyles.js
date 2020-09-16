import styled from 'styled-components';

export const StyledDropdown = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  flex-direction: column;

  position: absolute;
  left: 0;
  top: 50px;
  width: 100%;

  padding: 10px;

  background: white;
  box-shadow: 0 12px 46px -2px rgba(0, 0, 0, 0.7);
  border-radius: 10px;
`;

export const DropdownItem = styled.div`
    display: flex;
    align-items: center;

    width:100%;

    cursor: pointer;
`
