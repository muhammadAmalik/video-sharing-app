// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7b1fa2', // Purple
    },
    secondary: {
      main: '#f50057', // Pinkish
    },
    background: {
      default: '#fafafa', // Light gray background
    },
  },
  typography: {
    fontFamily: ['Poppins', 'Roboto', 'Arial', 'sans-serif'].join(','),
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '999px', // Pill shape
          textTransform: 'none',
          fontWeight: 'bold',
        },
      },
    },
  },
});

export default theme;
