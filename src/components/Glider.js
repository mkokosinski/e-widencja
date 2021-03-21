import React, { useEffect, useRef } from 'react';
import GliderJS from 'glider-js';
import '../../node_modules/glider-js/glider.min.css';
import styled from 'styled-components';

const StyledGlider = styled.div`
  align-items: flex-end;
  display: flex;
  margin: 0;
  transform: translate(0, -10px);

  .glider-track {
    height: 90%;
  }
`;

const Glider = ({ children, itemWidth }) => {
  const gliderRef = useRef(null);

  useEffect(() => {
    if (gliderRef.current) {
      new GliderJS(gliderRef.current, {
        draggable: true,
        dragVelocity: 1.6,
        exactWidth: true,
        itemWidth: itemWidth,
        slidesToShow: 'auto',
        slidesToScroll: 1,
      });
    }
  }, [gliderRef, itemWidth]);

  return <StyledGlider ref={gliderRef}>{children}</StyledGlider>;
};

export default Glider;
