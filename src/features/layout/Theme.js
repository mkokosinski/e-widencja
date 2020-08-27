import styled from 'styled-components';

const font = {
  family: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
  size: '18px',
  nav: {
    default: {
      weight: '400',
    },
    active: {
      weight: 'bold',
    },
  },
};

export const darkTheme = {
  main: '#42427D',
  mainSoft: '#5840BB',
  secondary: '#7979B2',
  seconderySoft: '#A0AAC8',
  light: '#C7F2FF',
  lightSoft: '#F3F6FF',
  nav: {
    default: {
      color: 'white',
      background: 'transparent',
    },
    active: {
      color: '#42427D',
      background: 'white',
    },
    hover: '#614AC2',
  },
  font,
};
