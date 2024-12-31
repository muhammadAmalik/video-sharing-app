import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8e24aa', // Pinkish purple
    },
    secondary: {
      main: '#ff4081', // Pink
    },
    background: {
      default: '#f3e5f5', // very light purple
    },
  },
  typography: {
    fontFamily: ['Poppins', 'Roboto', 'Arial', 'sans-serif'].join(','),
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(90deg, #8e24aa 0%, #d81b60 100%)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '999px',
          textTransform: 'none',
          fontWeight: 600,
          padding: '8px 24px',
        },
      },
    },
  },
});

export default theme;
