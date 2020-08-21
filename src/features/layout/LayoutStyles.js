import styled from 'styled-components';

const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px',
};

export const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`,
};

export const StyledLayout = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 60px 1fr 80px;
  grid-template-areas:
    'logo'
    'body'
    'menu';
  flex-direction: column-reverse;
  height: 100vh;
  overflow: hidden;

  background: ${({ theme }) => theme.mainSoft};
  box-sizing: content-box;
  font-family: ${({ theme }) => theme.font.family};

  @media screen and ${device.laptop} {
    grid-template-columns: 20% 80%;
    grid-template-rows: 200px 1fr;
    grid-template-areas:
      'logo body'
      'menu body';

    overflow: auto;

    flex-direction: row;
    font-size: ${({ theme }) => theme.font.size};
  }
`;

export const Menu = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  grid-area: menu;

  @media screen and ${device.laptop} {
    font-size: ${({ theme }) => theme.font.size};
  }
`;

export const Body = styled.div`
  grid-area: body;
  background: white;
  margin: 10px 10px 0 10px;
  border-radius: 30px;

  @media screen and ${device.laptop} {
    margin: 10px 10px 10px 0px;

    font-size: ${({ theme }) => theme.font.size};
  }
`;
