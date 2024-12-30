import { createTheme } from '@mui/material/styles';

// Example color palette: Purple + Pink
const theme = createTheme({
  palette: {
    primary: {
      main: '#9c27b0', // Purple
    },
    secondary: {
      main: '#e91e63', // Pink
    },
  },
  typography: {
    fontFamily: ['"Poppins"', 'Roboto', 'Arial', 'sans-serif'].join(','),
  },
});

export default theme;
