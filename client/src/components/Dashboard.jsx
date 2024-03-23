import * as React from 'react';
import { useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Box from '@mui/material/Box';

import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './ListItems';
// import Chart from './Chart';
// import Deposits from './Deposits';
import Orders from './Orders';
import MuiThemeSwitcher from './MuiThemeSwitcher';
import IIOMap from './IIOMap';
import TopNav from './TopNav';

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




  
export default function Dashboard() {
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

    

  return (
    <ThemeProvider theme={userTheme}>
        <CssBaseline />
        <TopNav />
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            
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
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12} md={8} lg={9}>
                    <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        
                    }}
                    >
                    <IIOMap></IIOMap>
                    </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={4} lg={3}>
                    <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 240,
                    }}
                    >
                    {/* <Deposits /> */}
                    </Paper>
                </Grid>
                {/* Recent Orders */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Orders />
                    </Paper>
                </Grid>
                </Grid>
                <Copyright sx={{ pt: 4 }} />
            </Container>
            </Box>
        </Box>
    </ThemeProvider>
  );
}