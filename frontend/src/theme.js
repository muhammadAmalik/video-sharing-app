import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#673ab7', // Deep Purple
    },
    secondary: {
      main: '#ff5722', // Deep Orange
    },
  },
  typography: {
    fontFamily: ['Poppins', 'Roboto', 'Arial', 'sans-serif'].join(','),
  },
  components: {
    // Example of customizing MUI components
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '1rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

export default theme;
