import styled from 'styled-components';

export const StopsLabel = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  span {
    &:not(:first-child) {
      &::before {
        content: ' -> ';
      }
    }
  }
`;
