import React, { useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './ListItems';
import MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import AccountService from '../services/account-service';
// import { Link, useNavigate } from "react-router-dom";
import MuiThemeSwitcher from './MuiThemeSwitcher';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

function TopNav({ authenticated, onAuthChange, onThemeChange, username }) {
  // const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
      setOpen(!open);
  };

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

  function logOut() {
    AccountService.logOut().then(response => {
      onAuthChange(false)
      //navigate('/login')
    })
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
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
            Dashboard
            </Typography>
            <MuiThemeSwitcher onChangeMode={onThemeChange}></MuiThemeSwitcher>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon />
              </Badge>
            </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
          <Toolbar
              sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
              }}
          >
              <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
              </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
              {mainListItems}
              <Divider sx={{ my: 1 }} />
              {secondaryListItems}
          </List>
      </Drawer>
    </>
    // <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
    //   <Container>
    //     <Navbar.Brand>
    //       <span style={{marginLeft:"5px"}}>Is It Open?</span>
    //     </Navbar.Brand>
    //     <Navbar.Toggle />
    //     <Navbar.Collapse id="basic-navbar-nav">
    //       <Nav className="me-auto">
    //         <LinkContainer end="true" to="/">
    //           <Nav.Link>Home</Nav.Link>
    //         </LinkContainer>
    //         <LinkContainer end="true" to="/brlist">
    //           <Nav.Link>Lists</Nav.Link>
    //         </LinkContainer>
    //         <LinkContainer end="true" to="/fav">
    //           <Nav.Link>Favorites</Nav.Link>
    //         </LinkContainer>
    //       </Nav>
    //       <Nav>
    //         {authenticated ?
    //         <NavDropdown title={username} id="basic-nav-dropdown">
    //           <NavDropdown.Item as={Link} to="/settings">
    //             Settings
    //           </NavDropdown.Item>
    //           <NavDropdown.Item as={Link} to="/achievements">
    //             Achievements
    //           </NavDropdown.Item>
    //           <NavDropdown.Item as={Link} to="/admin">
    //             Admin Panel
    //           </NavDropdown.Item>
    //           <NavDropdown.Divider />
    //           <NavDropdown.Item onClick={logOut}>
    //             Logout
    //           </NavDropdown.Item>
    //         </NavDropdown>
    //           :
    //           <LinkContainer to="/login">
    //             <Nav.Link>Login</Nav.Link>
    //           </LinkContainer>
    //         }
            
    //         <ThemeSwitcher />
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>
  );
}

export default TopNav;