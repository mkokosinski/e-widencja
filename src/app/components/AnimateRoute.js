import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';

const pageVariants = {
  initial: {
    opacity: 0,
    x: '-${({ theme }) => theme.currSiteSize.y}px'
  },
  in: {
    opacity: 1,
    x: 0
  },
  out: {
    opacity: 0,
    x: '${({ theme }) => theme.currSiteSize.y}px',
    scale: 1.2
  }
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.2
};

const AnimateContainer = styled(motion.div)`
  display: flex;
  height: 100%;
  width: 100%;
`;

const AnimateRoute = ({ children }) => {
  return (
    <AnimateContainer
      initial='initial'
      animate='in'
      exit='out'
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </AnimateContainer>
  );
};

export default AnimateRoute;
