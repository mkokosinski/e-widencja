import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import useDetectOutsideClick from './useDetectOutsideClick';

export const ModalBackground = styled.div`
  align-items: center;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  transition: 2s;
  width: 100%;
  z-index: 999;

  animation: fade 150ms linear both;

  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const ModalContent = styled.div`
  display: flex;
  animation: content 150ms ease-out 100ms both;

  @keyframes content {
    from {
      opacity: 0;
      transform: translateY(50px);
    }
    to {
      opacity: 1;
      transform: translateY(0px);
    }
  }
`;

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  const openModal = (callback) => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };


  useEffect(() => {
    if (isOpen) {
      // document.body.style.overflow = 'hidden';
    } else {
      // document.body.style.overflow = '';
    }
  }, [isOpen]);

  const Modal = ({ children }) => {
    useDetectOutsideClick(contentRef, closeModal, true);

    return isOpen
      ? ReactDOM.createPortal(
          <ModalBackground isOpen={isOpen}>
            <ModalContent ref={contentRef}>{children}</ModalContent>
          </ModalBackground>,
          document.getElementById('portals')
        )
      : null;
  };

  return { Modal, openModal, closeModal };
};

export default useModal;
