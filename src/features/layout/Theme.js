const font = {
  family: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
  size: '18px',
  nav: {
    default: {
      weight: '400'
    },
    active: {
      weight: 'bold'
    }
  }
};

export const darkTheme = {
  main: '#5555a5',
  mainSoft: '#5e48b6',
  secondary: '#a190c9',
  secondarySoft: '#acb6d3',
  light: '#C7F2FF',
  lightSoft: '#F3F6FF',
  textColor: '#333333',
  textColorLight: '#888888',
  textColorLighter: '#aaaaaa',
  linkColor: '#373cda',
  gray: '#8f8f8f',
  grayLight: '#f0f0f0',
  grayLighter: '#f7f7f7',
  nav: {
    default: {
      color: 'white',
      background: 'transparent'
    },
    active: {
      color: '#5555a5',
      background: 'white'
    },
    hover: '#614AC2'
  },
  body: {
    background: '#f9f9f9'
  },
  sort: {
    title: {
      color: 'white',
      bg: '#5e48b6'
    },
    item: {
      bg: 'white',
      color: '#2e2e2e',
      hover: {
        bg: '#e4e4e4'
      }
    }
  },
  hover: {
    main: '#616191',
    mainSoft: '#5a4fad',
    secondary: '#8686b3',
    seconderySoft: '#afb5c7',
    light: '#d9f6ff',
    lightSoft: '#fcfdff',
    shadow1: '0px 3px 14px -8px rgba(0, 0, 0, 0.7)',
    shadow2:
      '0px 0px 12px -6px rgba(0, 0, 0, 0.8), 0px 1px 16px -8px rgba(0, 0, 0, 0.6)'
  },
  disabled: {
    bg: '#eeeeee',
    color: '#d0d0d0'
  },
  status: {
    error: '#ff0000',
    warning: '#f0bb00',
    default: '#009938'
  },
  font,
  shadows: {
    shadow1: '0px 2px 10px -6px rgba(0, 0, 0, 0.5)',
    shadow2:
      '0px 1px 6px -2px rgba(0, 0, 0, 0.7), 0px 2px 10px -5px rgba(0, 0, 0, 0.4)'
  }
};
