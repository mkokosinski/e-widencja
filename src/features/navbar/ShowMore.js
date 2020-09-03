import React from 'react';
import { ShowMore as StyledShowMore } from './NavbarStyles';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ShowMore = () => {
  return (
    <StyledShowMore>
      <FontAwesomeIcon icon={faEllipsisV} />
      wincyj
    </StyledShowMore>
  );
};

export default ShowMore;
