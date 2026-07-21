import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4FC3F7',
      light: '#81D4FA',
      dark: '#0288D1',
      contrastText: '#04141F',
    },
    secondary: {
      main: '#7C4DFF',
      dark: '#5E35B1',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#07090F',
      paper: '#121826',
    },
    text: {
      primary: '#F2F4F8',
      secondary: '#8A93A6',
      disabled: '#4B5265',
    },
    divider: 'rgba(79, 195, 247, 0.14)',
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.125rem',
      fontWeight: 500,
    },
  },
  spacing: 8,
});

export default theme;
