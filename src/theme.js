import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#5EEAD4',
      light: '#99F6E4',
      dark: '#2DD4BF',
      contrastText: '#04110F',
    },
    secondary: {
      main: '#60A5FA',
      dark: '#3B82F6',
      contrastText: '#04110F',
    },
    background: {
      default: '#07080C',
      paper: '#12141C',
    },
    text: {
      primary: '#F2F4F8',
      secondary: '#8A93A6',
      disabled: '#4B5265',
    },
    divider: 'rgba(94, 234, 212, 0.12)',
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
