import { AnimatePresence, motion } from 'framer-motion';
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { ModalAnimation } from '../../utils/animationUtils';
import useDetectOutsideClick from './useDetectOutsideClick';

export const ModalBackground = styled(motion.div)`
  align-items: center;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(20px);
  display: flex;
  justify-content: center;
  height: ${({ theme }) => theme.currSiteSize.y}px; /* Fallback for browsers that do not support Custom Properties */
  height: calc(var(--vh, 1vh) * 100);
  left: 0;
  position: fixed;
  top: 0;
  width: ${({ theme }) => theme.currSiteSize.x}px;
  z-index: 999;
`;

export const ModalContent = styled(motion.div)`
  display: flex;
`;

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  const openModal = (callback) => {
    console.log('openModal');
    setIsOpen(true);
  };

  const closeModal = () => {
    console.log('closeModal');

    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
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
