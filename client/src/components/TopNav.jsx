import React, { useState, useContext, useEffect } from 'react';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './ListItems';
import MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import AccountService from '../services/account-service';
import ThemeSwitcher from './ThemeSwitcher.jsx';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext.jsx';
import openLogo from '../assets/open.png';


const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);


function TopNav({ onThemeChange }) {
  const { auth, setAuth, pageTitle } = useAppContext();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
      setOpen(!open);
  };

   // right menu
   const [anchorEl, setAnchorEl] = useState(null);
   const handleMenu = (event) => {
    if (!auth || auth?.authenticated === false) {
      navigate('/login')
      return;
    }
    setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
     setAnchorEl(null);
   };

  useEffect(() => {
    AccountService.isAuthenticated().then(response => {
      setAuth(response.data)
    }).catch(error => {
        alert(`Error: ${error.data}`)
    })
  }, [])

  function logOut() {
    AccountService.logOut().then(response => {
      setAuth({authenticated: false, username: ''})
      setAnchorEl(null);
      navigate('/login');
    })
  }

  function goToProfile() {
    setAnchorEl(null);
    navigate('/profile');
  }

  return (
    <>
      <AppBar position="absolute" open={open}>
        <Toolbar
            sx={{
            pr: '24px', // keep right padding when drawer closed
            }}
        >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                  marginRight: '36px',
                  ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <img src={openLogo} alt="Is it open logo" width="64" />
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
            {pageTitle}
            </Typography>
            <ThemeSwitcher onChangeMode={onThemeChange}></ThemeSwitcher>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                key={'right'}
                id="right-menu-appbar"
              >
                {auth?.authenticated &&  <AccountCircle /> }
                {!auth?.authenticated &&  <LoginIcon /> }
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={goToProfile}>Profile</MenuItem>
                <MenuItem onClick={logOut}>Logout</MenuItem>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
          <Toolbar
              sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: [1],
              }}
          >
              <Typography sx={{ml:2}} component="h2" variant="h6" color="primary">
                Navigation
              </Typography>
              <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
              </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
              {mainListItems}
              {auth?.isAdmin &&
                <>
                  <Divider sx={{ my: 1 }} />
                  {secondaryListItems}
                </>
              }
          </List>
      </Drawer>
    </>
  );
}

export default TopNav;