import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

const StyledDropdown = styled.div`
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  flex-direction: column;

  position: absolute;

  left: ${(props) => props.pos.left}px;
  right: ${(props) => props.pos.right}px;
  bottom: ${(props) => props.pos.bottom}px;
  top: ${(props) => props.pos.top}px;

  /* top: 0;
  left: 0;

  transform: ${(props) => `translate(${props.pos.left}, ${props.pos.top})`}; */

  width: calc(100% - 8px);
  z-index: 997;
  margin: 4px;

  background: white;

  box-shadow: 0 1px 4px -1px rgba(0, 0, 0, 0.5);

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
      //pos = {bottom, height, left, right, top, width, x, y}
      const pos = buttonRef.current.getBoundingClientRect();
      // const {
      //   offsetHeight: height,
      //   offsetWidth: width,
      //   offsetLeft,
      //   offsetTop
      // } = buttonRef.current;

      let top, bottom, left, right;

      const x = Math.floor(pos.x);
      const y = Math.floor(pos.y);

      //

      if (x + 400 > window.innerWidth) {
        right = window.innerWidth >= 768 ? '10' : undefined;
      } else {
        left = Math.floor(pos.x) - 200 + Math.floor(pos.width) / 2;
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
      <StyledDropdown pos={position} ref={dropdownRef} isOpen={isDropdownOpen}>
        {children}
      </StyledDropdown>,
      document.getElementById('root')
    );
  };

  return [DropdownList, setIsDropdownOpen, isDropdownOpen];
};
