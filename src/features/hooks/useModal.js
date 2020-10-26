import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export const ModalBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top:0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index:999;
  background: rgba(0, 0, 0, 0.5);

  visibility: ${(props) => (props.isOpen ? 'visible' : 'hidden')};
`;

export const ModalContent = styled.div``;

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () =>{
      setIsOpen(true)
  }

  const closeModal = () =>{
    setIsOpen(false)
}

  const Modal = ({ children }) => {
    return (
      <ModalBackground isOpen={isOpen}>
        {children}
      </ModalBackground>
    );
  };

  return { Modal, openModal };
};

export default useModal;
