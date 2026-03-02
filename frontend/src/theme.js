import { createTheme } from '@mui/material/styles';

// Low-Fidelity Mockup Theme - Graustufen für Wireframe-Look
const theme = createTheme({
  palette: {
    primary: {
      main: '#666666',
      light: '#999999',
      dark: '#333333',
    },
    secondary: {
      main: '#888888',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 300 },
    h2: { fontWeight: 300 },
    h3: { fontWeight: 400 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: '2px dashed #ccc',
          boxShadow: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          border: '1px solid #ddd',
        },
      },
    },
  },
});

export default theme;
