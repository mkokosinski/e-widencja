
import React, { useRef } from 'react';
import { ShowMore as StyledShowMore } from './NavbarStyles';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDropdown } from '../hooks/useDropdown';
import {
  ItemMenuIco,
  ItemMenuTitle,
  ListItemMenu,
} from '../profile/ProfilebarStyles';
import { A } from '../layout/LayoutStyles';

const ShowMore = ({ items }) => {
  const button = useRef(null);
  const {List, isOpen} = useDropdown(
    button,
    'top'
  );

  return (
    <>
      <StyledShowMore
        active={isOpen}
        ref={button}
      >
        <FontAwesomeIcon icon={faEllipsisV} />
      </StyledShowMore>

      <List>
        {items.map((item) => (
          <A to={item.path} key={item.name}>
            <ListItemMenu>
              <ItemMenuIco>
                <FontAwesomeIcon icon={item.icon} />
              </ItemMenuIco>
              <ItemMenuTitle>{item.name}</ItemMenuTitle>
            </ListItemMenu>
          </A>
        ))}
      </List>
    </>
  );
};

export default ShowMore;
