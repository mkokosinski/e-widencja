import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import styled from 'styled-components';

const StyledDropdown = styled.div`
  display: flex;
  flex-direction: column;

  position: absolute;

  /* left: ${(props) => props.pos.left}px; */
  /* right: ${(props) => props.pos.right}px; */
  bottom: ${(props) => props.pos.bottom};
  top: ${(props) => props.pos.top};

  width: 99%;
  z-index: 997;
  padding: 10px;
  margin: 5px 0;

  background: white;
  box-shadow: 0 12px 46px -2px rgba(0, 0, 0, 0.7);
  border-radius: 10px;
`;

const DropdownItem = styled.div`
  display: flex;
  align-items: center;

  width: 100%;

  cursor: pointer;
`;

export const useDropdown = (buttonRef, direction = 'bottom') => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const dropdownRef = useRef();

  const detectPosition = () => {
    if (buttonRef.current) {
      const {
        offsetTop,
        offsetLeft,
        offsetHeight,
        offsetWidth,
      } = buttonRef.current;

      let top, bottom, left, right;

      switch (direction) {
        case 'top':
          bottom = offsetHeight + 'px';
          break;
        case 'bottom':
          top = offsetTop + offsetHeight + 'px';
          break;
        default:
          break;
      }

      setPosition({ top, bottom, left, right });
    }
  };

  const detectExit = (e) => {
    if (
      !dropdownRef.current ||
      dropdownRef.current.contains(e.target) ||
      buttonRef.current.contains(e.target)
    ) {
      return;
    }

    setIsDropdownOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', detectExit);
    detectPosition();

    return () => {
      document.removeEventListener('mousedown', detectExit);
    };
  }, []);

  const DropdownList = ({ children }) => {
    return createPortal(
      isDropdownOpen && (
        <StyledDropdown pos={position} ref={dropdownRef}>
          {children}
        </StyledDropdown>
      ),
      document.getElementById('root')
    );
  };

  return [DropdownList, DropdownItem, setIsDropdownOpen, isDropdownOpen];
};
