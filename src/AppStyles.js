import styled, { css } from 'styled-components';

export const StyledApp = styled.div`
  position: relative;
  min-width: ${({ theme }) => theme.currSiteSize.x}px;
  min-height: ${({ theme }) => theme.currSiteSize.y}px;
  height: 100%;
  width: 100%;
`;

export const gapHorizontal = (gap) => css`
  & > * {
    margin-right: ${gap};
    margin-left: ${gap};

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }
`;

export const gapVertical = (gap) => css`
  & > * {
    margin-top: ${gap};
    margin-bottom: ${gap};

    &:first-child {
      margin-bottom: 0;
    }

    &:last-child {
      margin-top: 0;
    }
  }
`;

export const gap = (gap) => css`
  & > * {
    margin: ${gap};
    margin: ${gap};

    &:first-child {
      margin: 0 ${gap} ${gap} 0;
    }

    &:last-child {
      margin: ${gap} 0 0 ${gap};
    }
  }
`;
