import { ThemeOptions } from '@material-ui/core';

export const darkTheme: ThemeOptions = {
  palette: {
    type: 'dark',
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#000000',
    },
    background: {
      default: '#000000',
      paper: '#0d0d0d'
    },
    divider: '#333333',
  },
};

export const lightTheme: ThemeOptions = {
  palette: {
    type: 'light',
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: '#f5f5f5'
    },
    divider: '#eaeaea'
  }
};
