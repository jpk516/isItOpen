import { Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react';
import AccountService from './services/account-service';
import TopNav from './components/TopNav';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Copyright from './components/Copyright';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  const getPreferredTheme = () => {
    console.log('getPreferredTheme');
    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
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

  useEffect(() => {
    AccountService.isAuthenticated().then(response => {
        setIsAuthenticated(response.data.success)
        if (response.data.success) setUsername(response.data.user.username)
    }).catch(error => {
        alert(`Error: ${error.response.data}`)
    })
  })

  return (
    <ThemeProvider theme={userTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <TopNav authenticated={isAuthenticated} onAuthChange={setIsAuthenticated} username={username} onThemeChange={onThemeChange} />
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
          <Outlet></Outlet>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App
