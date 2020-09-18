import styled, { css } from 'styled-components';
import { device, Button } from '../layout/LayoutStyles';

const ButtonStyles = styled(Button)`
  position: relative;
  height: 40px;
  width: 40px;

  margin: 0 12px;

  background: ${(props) => (props.active ? 'white' : 'transparent')};
  color: ${(props) =>
    props.active ? props.theme.mainSoft : props.theme.lightSoft};
  font-size: 1.4em;

  @media screen and ${device.laptop} {
    height: 50px;
    width: 50px;

    margin: 0 4px;

    background: ${(props) => (props.active ? 'white' : props.theme.lightSoft)};
    box-shadow: ${(props) =>
      props.active ? '0 1px 2px -1px ' + props.theme.mainSoft : 'unset'};
    color: ${({ theme }) => theme.mainSoft};
    opacity: ${(props) => (props.active ? 0.9 : 1)};
  }
`;

export const ProfileButton = styled(ButtonStyles)``;

export const NotificationButton = styled(ButtonStyles)`
  ${(props) =>
    props.isNewNotification &&
    css`
      ::before {
        content: '';
        position: absolute;
        right: -2px;
        top: -2px;
        height: 12px;
        width: 12px;

        border-radius: 50%;
        background: red;
      }
    `}
`;

export const ListItem = styled.div`
  width: 100%;
  padding: 16px 20px;

  border-radius: 10px;
  color: ${(props) => props.theme.main};
  cursor: pointer;

  :hover {
    background: ${(props) => props.theme.lightSoft};
  }

  :active{
    background: ${(props) => props.theme.light};
  }
`;

export const ItemTitle = styled.h6``;

export const ItemDesc = styled.article`
  font-size: 0.9em;
  padding: 5px 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  @supports (-webkit-line-clamp: 2) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: initial;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

export const ListItemMenu = styled(ListItem)`
  display: grid;
  grid-template-columns: 42% 58%;
  grid-gap: 10px;
`;

export const ItemMenuIco = styled.span`
  display: flex;
  justify-content: flex-end;
`;

export const ItemMenuTitle = styled.span`
  display: flex;
  justify-content: flex-start;
`;
