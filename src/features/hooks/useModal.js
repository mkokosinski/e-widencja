import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import useDetectOutsideClick from './useDetectOutsideClick';

export const ModalBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 999;
  background: rgba(0, 0, 0, 0.5);

  visibility: ${(props) => (props.isOpen ? 'visible' : 'hidden')};
`;

export const ModalContent = styled.div`
  display: flex;
`;

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const Modal = ({ children }) => {
    useDetectOutsideClick(contentRef, closeModal);

    return ReactDOM.createPortal(
      <ModalBackground isOpen={isOpen}>
        <ModalContent ref={contentRef}>{children}</ModalContent>
      </ModalBackground>,
      document.getElementById('root')
    );
  };

  return { Modal, openModal, closeModal };
};

export default useModal;
