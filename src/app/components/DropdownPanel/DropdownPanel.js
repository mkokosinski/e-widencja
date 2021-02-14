import React from 'react';
import PropTypes from 'prop-types';
import {
  StyledDropdownPanel,
  DoropdownContent,
  DropdownPanelTitle,
  DropdownPanelHeader,
  DropdownPanelArrow,
} from './DropdownPanelStyles';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDown,
  faArrowAltCircleRight,
} from '@fortawesome/free-solid-svg-icons';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';

const contentAnimation = {
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      opacity: {
        duration: 1,
      },
    },
  },
  exit: {
    opacity: 0,
    y: -100,
    transition: {
      duration: 0.1,
    },
  },
};

const DropdownPanel = ({ children, title, onOpen, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    onOpen();
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  const handleToggle = () => {
    isOpen ? handleClose() : handleOpen();
  };

  return (
    <AnimateSharedLayout type='crossfade'>
      <StyledDropdownPanel layout onClick={handleToggle}>
        <DropdownPanelHeader layout>
          <DropdownPanelTitle>{title}</DropdownPanelTitle>
          <DropdownPanelArrow isOpen={isOpen}>
            <FontAwesomeIcon icon={faAngleDown} />
          </DropdownPanelArrow>
        </DropdownPanelHeader>
        <AnimatePresence>
          {isOpen && (
            <DoropdownContent
              layout
              initial={contentAnimation.exit}
              animate={contentAnimation.enter}
              exit={contentAnimation.exit}
            >
              {children}
            </DoropdownContent>
          )}
        </AnimatePresence>
      </StyledDropdownPanel>
    </AnimateSharedLayout>
  );
};

DropdownPanel.defaultProps = {
  onOpen: () => {},
  onClose: () => {},
};

DropdownPanel.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  opOpen: PropTypes.func,
  onClose: PropTypes.func,
};

export default DropdownPanel;
