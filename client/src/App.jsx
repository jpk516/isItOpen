import { Outlet } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react';
import AccountService from './services/account-service';
import TopNav from './components/TopNav';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Copyright from './components/Copyright';
import AppContextProvider from './contexts/AppContext';

function App() {
  // TODO: move to app context
  const getPreferredTheme = () => {
    console.log('getPreferredTheme');
    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    const prefersDarkMode = true;//useMediaQuery('(prefers-color-scheme: dark)');
    // Fall back to system preference if no saved theme
    if (prefersDarkMode) {
        return 'dark';
    } else {
        return 'light';
    } 
  };

  const makeTheme = (mode) => {
    return createTheme({
        palette: {
            mode: mode,
        },
    });
  }

const [userTheme, setMode] = useState(makeTheme(getPreferredTheme()));
const onThemeChange = (newMode) => {
    setMode(makeTheme(newMode));
}

  return (
    <AppContextProvider>
      <ThemeProvider theme={userTheme}>
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <TopNav onThemeChange={onThemeChange} />
            <Box
              sx={{
                  backgroundColor: (theme) =>
                  theme.palette.mode === 'light'
                      ? theme.palette.grey[100]
                      : theme.palette.grey[900],
                  flexGrow: 1,
                  height: '100vh',
                  overflow: 'auto',
              }}
            >
              <Toolbar />
              <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                <Outlet></Outlet>
              </Container>
              <Copyright sx={{ mt: 8, mb: 4 }} />
            </Box>
          </Box>
      </ThemeProvider>
    </AppContextProvider>
  );
}

export default App
