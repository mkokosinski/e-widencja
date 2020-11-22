import { AnimatePresence, motion } from 'framer-motion';
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { ModalAnimation } from '../../utils/animationUtils';
import useDetectOutsideClick from './useDetectOutsideClick';

export const ModalBackground = styled(motion.div)`
  align-items: center;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 999;
`;

export const ModalContent = styled(motion.div)`
  display: flex;
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
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const Modal = ({ children }) => {
    useDetectOutsideClick(contentRef, closeModal, true);

    // return ReactDOM.createPortal(
    return ReactDOM.createPortal(
      <AnimatePresence>
        {isOpen && (
          <ModalBackground
            {...ModalAnimation.bg}
            transition={{ duration: 0.2 }}
          >
            <ModalContent {...ModalAnimation.content} ref={contentRef}>
              {children}
            </ModalContent>
          </ModalBackground>
        )}
      </AnimatePresence>,
      document.getElementById('portals')
    );
  };

  return { Modal, openModal, closeModal };
};

export default useModal;
