import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link as RouterLink } from 'react-router-dom';
import { FaBuilding, FaPhone, FaEnvelope, FaGlobe, FaMusic, FaUtensils, FaGlassMartiniAlt, FaDoorOpen, FaDoorClosed} from 'react-icons/fa';
import CheckIfOpen from '../services/checkIfOpen';
import openIcon from '../assets/open-icon.png';
import closedIcon from '../assets/closed-icon.png';


const VenueView = ({ venue, checkIns}) => {
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
  
  const isOpen = CheckIfOpen(venue, checkIns)

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
          <ListItemText primary={<><strong>Website:</strong> <a href={venue.website} target="_blank">{venue.website}</a></>} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            {getVenueTypeIcon(venue.type)}
          </ListItemIcon>
          <ListItemText primary={<><strong>Type:</strong> {venue.type}</>} />
        </ListItem>
        <ListItem>
            <ListItemIcon>
              {isOpen ? <FaDoorOpen /> : <FaDoorClosed />} 
            </ListItemIcon>
            <ListItemText 
            primary={<><strong>Status:</strong> {isOpen ? "Open" : "Closed"}</>} />
            <img 
              src={isOpen ? openIcon : closedIcon} 
              alt={isOpen ? "Open" : "Closed"} 
              style={{ maxWidth: '100%', height: '100%'}}
            />
      </ListItem>
      </List>
    </Card>
  );
};

export default VenueView;
