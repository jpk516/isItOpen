//navigation menu
import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Link } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to={"/"}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="What's Hot?"/>
    </ListItemButton>
    <ListItemButton component={Link} to={"/venues"}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Venues" />
    </ListItemButton>
    <ListItemButton component={Link} to={"/achievements"}>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Achievements" />
    </ListItemButton>
    <ListItemButton component={Link} to={"/fav"}>
      <ListItemIcon>
        <StarIcon />
      </ListItemIcon>
      <ListItemText primary="Favorites" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Administration
    </ListSubheader>
    <ListItemButton component={Link} to={"/admin"}>
      <ListItemIcon>
        <AdminPanelSettingsIcon />
      </ListItemIcon>
      <ListItemText primary="Admin Panel" />
    </ListItemButton>
    <ListItemButton component={Link} to={"https://server.whatstarted.com/api-docs/"} target='_blank'>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="API Documentation"/>
    </ListItemButton>
  </React.Fragment>
);