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
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { AnimateSharedLayout } from 'framer-motion';

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

const DropdownPanel = ({ children, startExpanded, title, onOpen, onClose }) => {
  const [isOpen, setIsOpen] = useState(startExpanded);

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
          layoutId='dropdownPanel'
          animate={isOpen ? 'enter' : 'exit'}
          variants={contentAnimation}
          initial={false}
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
  startExpanded: PropTypes.bool,
  title: PropTypes.string,
  opOpen: PropTypes.func,
  onClose: PropTypes.func,
};

export default DropdownPanel;
