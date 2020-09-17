import React, { useRef } from 'react';
import { ShowMore as StyledShowMore } from './NavbarStyles';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDropdown } from '../hooks/useDropdown';

const ShowMore = () => {
  const button = useRef(null);
  const [DropdownList, DropdownItem, setIsDropdownOpen, isDropdownOpen] = useDropdown(button, 'top');

  return (
    <>
      <StyledShowMore active={isDropdownOpen} ref={button} onClick={() => setIsDropdownOpen(true)}>
        <FontAwesomeIcon icon={faEllipsisV} />
      </StyledShowMore>

      <DropdownList>
        <DropdownItem>showmore</DropdownItem>
        <DropdownItem>showmore</DropdownItem>
        <DropdownItem>showmore</DropdownItem>
        <DropdownItem>showmore</DropdownItem>
        <DropdownItem>showmore</DropdownItem>
      </DropdownList>
    </>
  );
};

export default ShowMore;
