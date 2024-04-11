import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link as RouterLink } from 'react-router-dom';
import { FaBuilding, FaPhone, FaEnvelope, FaGlobe, FaMusic, FaUtensils, FaGlassMartiniAlt } from 'react-icons/fa';

const VenueView = ({ venue }) => {
  const getVenueTypeIcon = (type) => {
    switch (type) {
      case 'Bar':
        return <FaGlassMartiniAlt />;
      case 'Restaurant':
        return <FaUtensils />;
      case 'Music Venue':
        return <FaMusic />;
      default:
        return null;
    }
  };

  return (
    <Card sx={{ mt: 2 }}>
      <List>
        <ListItem>
          <ListItemIcon>
            <FaBuilding />
          </ListItemIcon>
          <ListItemText primary={<><strong>Address:</strong> {`${venue.address}, ${venue.city}, ${venue.state} ${venue.zip}`}</>} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FaPhone />
          </ListItemIcon>
          <ListItemText primary={<><strong>Phone:</strong> {venue.phone}</>} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FaEnvelope />
          </ListItemIcon>
          <ListItemText primary={<><strong>Email:</strong> {venue.email}</>} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FaGlobe />
          </ListItemIcon>
          <ListItemText primary={<><strong>Website:</strong> <RouterLink to={{ pathname: venue.website }} target="_blank">{venue.website}</RouterLink></>} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            {getVenueTypeIcon(venue.type)}
          </ListItemIcon>
          <ListItemText primary={<><strong>Type:</strong> {venue.type}</>} />
        </ListItem>
      </List>
    </Card>
  );
};

export default VenueView;
