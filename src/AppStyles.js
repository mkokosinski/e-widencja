import styled from 'styled-components';

export const StyledApp = styled.div`
  position: relative;
  min-width: ${({ theme }) => theme.currSiteSize.x}px;
  min-height: ${({ theme }) => theme.currSiteSize.y}px;
  height: 100%;
  width: 100%;
`;
