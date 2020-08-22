import styled from 'styled-components';

export const size = {
  mobileS: '320',
  mobileM: '375',
  mobileL: '425',
  mobileXL: '570',
  tablet: '768',
  laptop: '1024',
  laptopL: '1440',
  desktop: '2560',
};

export const device = {
  mobileS: `(min-width: ${size.mobileS}px)`,
  mobileM: `(min-width: ${size.mobileM}px)`,
  mobileL: `(min-width: ${size.mobileL}px)`,
  mobileXL: `(min-width: ${size.mobileL}px)`,
  tablet: `(min-width: ${size.tablet}px)`,
  laptop: `(min-width: ${size.laptop}px)`,
  laptopL: `(min-width: ${size.laptopL}px)`,
  desktop: `(min-width: ${size.desktop}px)`,
  desktopL: `(min-width: ${size.desktop}px)`,
};

export const StyledLayout = styled.div`
  * {
    box-sizing: content-box;
    font-family: ${({ theme }) => theme.font.family};
    font-size: 1rem;
  }

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
  padding: 10px;
  overflow-y: scroll;

  @media screen and ${device.laptop} {
    margin: 10px 10px 10px 0px;
    padding: 30px;

    font-size: ${({ theme }) => theme.font.size};
  }
`;

export const ProfileBar = styled.div`
  height: 60px;
  border: 1px solid black;
`;

export const PanelBordered = styled.div`
  background: #ffffff;
  border: 1px solid #5840bb;
  border-radius: 50px 10px;
  padding: 40px;
`;

export const Button = styled.div`
  align-items: center;
  border-radius: 20px 3px;
  display: flex;
  justify-content: center;
  padding: 5px;
  user-select: none;
  cursor: pointer;
  white-space: nowrap;
  transition: filter 150ms;

  :focus,
  :active {
    outline: none;
  }

  :disabled {
    cursor: not-allowed;
  }

  :hover {
    filter: brightness(1.2);
  }

  :active{
    filter: brightness(1);
    box-shadow: 0 0 4px -2px ${({theme})=> theme.mainSoft}
  }
`;

export const ButtonMain = styled(Button)`
  background: ${({ theme }) => theme.mainSoft};
  color: white;
`;

export const ButtonBorderedMain = styled(Button)`
  background: white;
  border: 1px solid ${({ theme }) => theme.mainSoft};
  color: ${({ theme }) => theme.mainSoft};
`;

export const ButtonBorderedSeconderySoft = styled(Button)`
  background: white;
  border: 1px solid ${({ theme }) => theme.seconderySoft};
  color: ${({ theme }) => theme.seconderySoft};
`;
