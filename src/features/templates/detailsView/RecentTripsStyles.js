import styled from 'styled-components';
import { H2, Button, device } from '../../layout/LayoutStyles';

export const StyledRecentList = styled.div`
  margin: 16px 0;
`;

export const TopPanel = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 6px 10px;
`;

export const Title = styled(H2)``;

export const ShowMore = styled(Button)`
  flex: 0 1;
  font-size: 0.8em;
  color: ${({ theme }) => theme.mainSoft};
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ListItem = styled.li`
  display: grid;
  grid-template-columns: 2fr 6fr 1fr 1fr;
  gap: 10px;
  justify-content: space-between;

  width: 100%;
  padding: 6px;

  cursor: pointer;
  font-size: 0.8em;

  :hover {
    background: ${({ theme }) => theme.lightSoft};
  }

  @media screen and (${device.mobileXL}) {
    grid-template-columns: 2fr 6fr 3fr 1fr;
  }
`;

export const FromTo = styled.span`
  display: flex;
  justify-content: center;

  span {
    text-align: center;
    text-overflow: ellipsis;
  }

  span:nth-child(1),
  span:nth-child(3) {
    width: 40%;
  }
  span:nth-child(2) {
    width: 20%;
  }
`;
export const Driver = styled.span`
  display: flex;
  justify-content: center;
`;
export const Distance = styled.span`
  display: flex;
  justify-content: center;
`;
