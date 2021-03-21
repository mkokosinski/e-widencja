import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { useCallback } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import useDetectOutsideClick from './useDetectOutsideClick';

const root = document.getElementById('root');

const StyledDropdown = styled(motion.div)`
  flex-direction: column;

  position: absolute;

  bottom: ${(props) => props.pos.bottom}px;
  top: ${(props) => props.pos.top}px;

  width: calc(100% - 10px);
  z-index: 997;
  margin: 4px;

  background: white;

  border-radius: 10px;
  box-shadow: 0 1px 4px -1px rgba(0, 0, 0, 0.6),
    0 1px 100px 50px rgba(0, 0, 0, 0.07), 0 1px 300px 70px rgba(0, 0, 0, 0.05);

  @media screen and (min-width: 768px) {
    box-shadow: 0 1px 4px -1px rgba(0, 0, 0, 0.6);
    left: ${(props) => props.pos.left}px;
    right: ${(props) => props.pos.right}px;
    height: fit-content;
    width: fit-content;
  }
`;

const animation = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  transition: { duration: 0.2 },
  exit: { opacity: 0 },
};

export const useDropdown = (buttonRef, direction = 'bottom') => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const dropdownRef = useRef();

  const detectPosition = useCallback(() => {
    if (buttonRef?.current && dropdownRef?.current) {
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
  }, [buttonRef, dropdownRef, direction]);

  const openDropdown = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    const currentButton = buttonRef.current;
    if (currentButton) {
      currentButton.addEventListener('mousedown', openDropdown);
    }

    return () => {
      currentButton.removeEventListener('mousedown', openDropdown);
    };
  }, [buttonRef]);

  useEffect(() => {
    detectPosition();
  }, [detectPosition]);

  const List = ({ children }) => {
    useDetectOutsideClick(dropdownRef, () => setIsOpen(false));

    return createPortal(
      isOpen && (
        <StyledDropdown {...animation} pos={position} ref={dropdownRef}>
          {children}
        </StyledDropdown>
      ),
      root,
    );
  };

  return { List, setIsOpen, isOpen };
};
