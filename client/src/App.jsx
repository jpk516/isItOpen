// import './App.css';
import MessageToast from './components/MessageToast';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './views/Home';
import MuiHome from './views/MuiHome';
import Login from './views/Login';
import Register from './views/Register';
import Venues from './views/Venues';
import Admin from './views/Admin';
import ManageVenue from './views/ManageVenue';
import Achievements from './views/Achievements';
import BRList from './views/BRList';
import Settings from './views/Settings';
import AccountService from './services/account-service';
import { useEffect, useState } from 'react';
import Fav from './views/Favorites';
import TopNav from './components/TopNav';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
          component="main"
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
          <Router>
            <Routes>
              <Route exact path="" element={<MuiHome />}></Route>
              <Route exact path="/login" element={<Login authenticated={isAuthenticated} onAuthChange={setIsAuthenticated} />}></Route>
              <Route exact path="/register" element={<Register authenticated={isAuthenticated} onAuthChange={setIsAuthenticated} />}></Route>
              <Route exact path="/venues" element={<Venues />}></Route>
              <Route exact path="/venues/manage/:name?" element={<ManageVenue />}></Route>
              <Route exact path="/brlist" element={<BRList />}></Route>
              <Route exact path="/settings" element={<Settings />}></Route>
              <Route exact path="/fav" element={<Fav />}></Route>
              <Route exact path="/admin" element={<Admin />}></Route>
              <Route exact path="/achievements" element={<Achievements />}></Route>
            </Routes>
          </Router>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App
