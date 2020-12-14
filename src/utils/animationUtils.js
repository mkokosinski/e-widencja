import React from 'react';
import { motion } from 'framer-motion';
import { Redirect } from 'react-router';

export const ModalAnimation = {
  bg: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.1 }
  },
  content: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
    transition: { duration: 0.3 }
  }
};

export const authFormAnimations = {
  initial: {
    opacity: 0.2,
    x: '-50%'
  },
  animate: {
    opacity: 1,
    x: '0%'
  },
  exit: {
    opacity: 0.2,
    x: '50%'
  },
  transition: {
    duration: 0.2,
    ease: [0.43, 0.13, 0.23, 0.96]
  }
};



export const MotionRedirect = ({ children, ...props }) => (
  <motion.div exit='undefined'>
    <Redirect {...props} />
  </motion.div>
);
