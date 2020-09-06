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
  mobileXL: `(min-width: ${size.mobileXL}px)`,
  tablet: `(min-width: ${size.tablet}px)`,
  laptop: `(min-width: ${size.laptop}px)`,
  laptopL: `(min-width: ${size.laptopL}px)`,
  desktop: `(min-width: ${size.desktop}px)`,
  desktopL: `(min-width: ${size.desktop}px)`,
};

export const StyledLayout = styled.div`
  * {
    box-sizing: border-box;
    font-family: ${({ theme }) => theme.font.family};
    font-size: 1em;
  }

  a,
  span {
    color: inherit;
    font-size: inherit;
    text-decoration: none;
  }

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 40px 1fr 50px;

  grid-template-areas:
    'logo profile'
    'body body'
    'menu menu';

  min-height: 100vh;
  flex-direction: column-reverse;

  background: ${({ theme }) => theme.mainSoft};
  box-sizing: content-box;

  @media screen and ${device.mobileM} {
    grid-template-rows: 60px 1fr 50px;
  }

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

  @media screen and ${device.laptopL} {
    grid-template-columns: 14% 86%;
    grid-template-rows: 200px 1fr;
  }
`;

export const Menu = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  grid-area: menu;
  z-index: 998;

  background: inherit;
  width: 100%;
  position: fixed;
  bottom: 0;

  @media screen and ${device.laptop} {
    font-size: ${({ theme }) => theme.font.size};
    position: relative;
    height: auto;
    width: auto;
  }
`;

export const Body = styled.div`
  grid-area: body;

  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 5px;

  background: white;

  @media screen and ${device.tablet} {
    padding: 6px;
    align-items: flex-start;
  }

  @media screen and ${device.laptop} {
    display: block;
    font-size: 0.9em;
    padding: 20px;
  }

  @media screen and ${device.laptopL} {
    font-size: 1em;
    padding: 30px;
  }
`;

export const ProfileBar = styled.div`
  display: none;
  grid-area: profile;
  height: 50px;
  border: 1px solid black;
`;

export const H2 = styled.h2`
  font-size: 16px;
  line-height: 1.7rem;
  margin: 0;
  padding: 0;

  @media screen and ${device.tablet} {
    font-size: 18px;
  }
`;

const Panel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* border-radius: 40px 6px; */
`;

export const PanelBordered = styled(Panel)`
  background: #ffffff;
  border: none;

  @media screen and ${device.tablet} {
    border: 1px solid #5840bb;
  }
`;

/* export const PanelMain = styled(Panel)`
  background: ${({ theme }) => theme.main};
  border-radius: 50px 10px;
  padding: 40px;
`;

export const PanelMainSoft = styled(Panel)`
  background: ${({ theme }) => theme.mainSoft};
  border-radius: 50px 10px;
  padding: 40px;
`;

export const PanelSeconderySoft = styled(Panel)`
  background: ${({ theme }) => theme.seconderySoft};
  border-radius: 50px 10px;
  padding: 40px;
`; */

export const PanelLight = styled(Panel)`
  background: ${({ theme }) => theme.light};
  color: ${({ theme }) => theme.main};
`;

export const PanelLightSoft = styled(Panel)`
  background: ${({ theme }) => theme.lightSoft};
  color: ${({ theme }) => theme.main};
`;

export const Button = styled.div`
  align-items: center;
  /* border-radius: 20px 3px; */
  display: flex;
  justify-content: center;
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

  :active {
    filter: brightness(1);
    box-shadow: 0 0 4px -2px ${({ theme }) => theme.mainSoft};
  }
`;

export const ButtonMain = styled(Button)`
  background: ${({ theme }) => theme.mainSoft};
  color: white;
`;

export const ButtonLightSoft = styled(Button)`
  background: ${({ theme }) => theme.lightSoft};
  color: ${({ theme }) => theme.main};
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

export const DetailsTopPanel = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;
export const DetailsGoBack = styled(Button)`
  width: 10%;
`;

export const DetailsTitle = styled(H2)`
  padding: 10px;
  width: 80%;
`;

export const DetailsEdit = styled(Button)`
  height: 100%;
  width: 10%;
`;

export const DetailsInfo = styled.div`
  border-bottom: 1px solid rgba(0, 0, 100, 0.2);
  color: #333;
  display: flex;
  font-size: 0.9em;
  margin: 6px 0;
  padding: 12px;
`;

export const DetailsIco = styled.div`
  color: #444;
  width: 10%;
`;

export const DetailsLabel = styled.div`
  width: 60%;
`;

export const DetailsData = styled.div`
  font-weight: 600;
  width: 30%;
`;
