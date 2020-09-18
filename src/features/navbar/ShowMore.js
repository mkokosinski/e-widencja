import React, { useRef } from 'react';
import { ShowMore as StyledShowMore } from './NavbarStyles';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDropdown } from '../hooks/useDropdown';
import {
  ItemMenuIco,
  ItemMenuTitle,
  ListItem,
  ListItemMenu,
} from '../profile/ProfileStyles';
import { A } from '../layout/LayoutStyles';

const ShowMore = ({ items }) => {
  const button = useRef(null);
  const [DropdownList, setIsDropdownOpen, isDropdownOpen] = useDropdown(
    button,
    'top'
  );

  return (
    <>
      <StyledShowMore
        active={isDropdownOpen}
        ref={button}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <FontAwesomeIcon icon={faEllipsisV} />
      </StyledShowMore>

      <DropdownList>
        {items.map((item) => (
          <A to={item.path}>
            <ListItemMenu key={item.name}>
              <ItemMenuIco>
                <FontAwesomeIcon icon={item.icon} />
              </ItemMenuIco>
              <ItemMenuTitle>{item.name}</ItemMenuTitle>
            </ListItemMenu>
          </A>
        ))}
      </DropdownList>
    </>
  );
};

export default ShowMore;
