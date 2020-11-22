import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { useCallback } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import useDetectOutsideClick from './useDetectOutsideClick';

const root = document.getElementById('root');

const StyledDropdown = styled(motion.div)`
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  flex-direction: column;

  position: absolute;

  bottom: ${(props) => props.pos.bottom}px;
  top: ${(props) => props.pos.top}px;

  /* top: 0;
  left: 0;

  transform: ${(props) => `translate(${props.pos.left}, ${props.pos.top})`}; */

  width: calc(100% - 10px);
  z-index: 997;
  margin: 4px;

  background: white;

  box-shadow: 0 1px 4px -1px rgba(0, 0, 0, 0.6),
    0 1px 100px 50px rgba(0, 0, 0, 0.07), 0 1px 300px 70px rgba(0, 0, 0, 0.05);

  border-radius: 10px;

  @media screen and (min-width: 768px) {
    left: ${(props) => props.pos.left}px;
    right: ${(props) => props.pos.right}px;
    height: fit-content;
    width: fit-content;
  }
`;

const animation = {
  initial: {
    opacity: 0,
    y: 10
  },
  animate: {
    opacity: 1,
    y: 0
  },
  transition: { duration: 0.2 },
  exit: { opacity: 0 }
};

export const useDropdown = (buttonRef, direction = 'bottom') => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const dropdownRef = useRef();

  const detectPosition = useCallback(() => {
    if (buttonRef.current) {
      const pos = buttonRef.current.getBoundingClientRect();
      const { offsetWidth: dropdownWidth } = dropdownRef.current;

      let top, bottom, left, right;

      const x = Math.floor(pos.x);
      const y = Math.floor(pos.y);

      if (x + dropdownWidth > window.innerWidth) {
        right = window.innerWidth >= 768 ? '10' : undefined;
      } else {
        left =
          Math.floor(pos.x) - dropdownWidth / 2 + Math.floor(pos.width) / 2;
      }

      switch (direction) {
        case 'top':
          bottom = 60;
          break;
        case 'bottom':
          top = y + pos.height;
          break;
        default:
          break;
      }

      setPosition({ top, bottom, left, right });
    }
  }, [buttonRef, direction]);

  const openDropdown = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    buttonRef.current.addEventListener('mousedown', openDropdown);

    // return () => {
    //   buttonRef.current.removeEventListener('mousedown', openDropdown);

    // };
  }, [buttonRef]);

  useEffect(() => {
    detectPosition();
  }, [detectPosition, isOpen]);

  const List = ({ children }) => {
    useDetectOutsideClick(dropdownRef, () => setIsOpen(false));

    return createPortal(
      <AnimatePresence>
        <StyledDropdown
          pos={position}
          ref={dropdownRef}
          isOpen={isOpen}
          // {...animation}
        >
          {children}
        </StyledDropdown>
      </AnimatePresence>,
      root
    );
  };

  return { List, setIsOpen, isOpen };
};
