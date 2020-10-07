import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

const StyledDropdown = styled.div`
  display: flex;
  flex-direction: column;

  position: absolute;

  /* left: ${(props) => props.pos.left};
  right: ${(props) => props.pos.right};
  bottom: ${(props) => props.pos.bottom};
  top: ${(props) => props.pos.top}; */

  top: 0;
  left: 0;

  transform: ${(props) => `translate(${props.pos.left}, ${props.pos.top})`};

  width: calc(100% - 8px);
  z-index: 997;
  margin: 4px;

  background: white;

  box-shadow: 0 1px 4px -1px rgba(0, 0, 0, 0.5);

  border-radius: 10px;

  @media screen and (min-width: 768px) {
    height: fit-content;
    width: ${(props) => props.width};
  }
`;

export const useDropdown = (buttonRef, direction = 'bottom', width = 400) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, width });

  const dropdownRef = useRef();

  const detectPosition = () => {
    if (buttonRef.current) {
      const pos = buttonRef.current.getBoundingClientRect();
      
      let top, bottom, left, right;

      const x = Math.floor(pos.x);
      const y = Math.floor(pos.y)

      // right = window.innerWidth >= 768 ? '10px' : undefined;

      if (x + width > window.innerWidth) {
        console.log('over');
      }

      left = Math.floor(pos.x) + 'px';

      switch (direction) {
        case 'top':
          bottom = 1 + 'px';
          break;
        case 'bottom':
          top = 1 + 1 + 'px';
          break;
        default:
          break;
      }

      console.log(top, bottom, left, right);

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
  }, [isDropdownOpen]);

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
