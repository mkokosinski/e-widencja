import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

const StyledDropdown = styled.div`
  display: flex;
  flex-direction: column;

  position: absolute;

  left: ${(props) => props.pos.left};
  right: ${(props) => props.pos.right};
  bottom: ${(props) => props.pos.bottom};
  top: ${(props) => props.pos.top};

  width: calc(100% - 8px);
  z-index: 997;
  margin: 4px;

  background: white;
  
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.5);

  border-radius: 10px;

  @media screen and (min-width: 768px) {
    height: fit-content;
    width: 400px;

  }
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

      right = window.innerWidth >= 768 ? '10px' : undefined;

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

    return () => {
      document.removeEventListener('mousedown', detectExit);
    };
  }, []);

  useEffect(() => {
    detectPosition();
  },[isDropdownOpen]);

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

  return [DropdownList, setIsDropdownOpen, isDropdownOpen];
};
