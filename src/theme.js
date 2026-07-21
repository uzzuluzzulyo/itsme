import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4FD8B0',
      light: '#8FEDD1',
      dark: '#2BB88E',
      contrastText: '#042A20',
    },
    secondary: {
      main: '#7C4DFF',
      dark: '#5E35B1',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#080F0D',
      paper: '#111C19',
    },
    text: {
      primary: '#F2F4F8',
      secondary: '#8A93A6',
      disabled: '#4B5265',
    },
    divider: 'rgba(79, 216, 176, 0.14)',
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
