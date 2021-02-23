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
    height: 'auto',
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    height: '0',
    transition: {
      duration: 0.5,
    },
    transitionEnd: {
      display: 'none',
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
      <StyledDropdownPanel>
        <DropdownPanelHeader layoutId='dropdownPanel' onClick={handleToggle}>
          <DropdownPanelTitle>{title}</DropdownPanelTitle>
          <DropdownPanelArrow isOpen={isOpen}>
            <FontAwesomeIcon icon={faAngleDown} />
          </DropdownPanelArrow>
        </DropdownPanelHeader>

        <DoropdownContent
<<<<<<< HEAD
          layoutId='dropdownPanel'
=======
          layout
>>>>>>> 4766d15213d10468caafce0ddc9aba1fe457ec9e
          animate={!isOpen ? 'enter' : 'exit'}
          variants={contentAnimation}
        >
          {children}
        </DoropdownContent>
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
