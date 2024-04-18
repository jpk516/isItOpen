import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import IconButton from '@mui/material/IconButton';
import Star from '@mui/icons-material/Star';
import StarOutline from '@mui/icons-material/StarOutline';
import Title from './Title';
import { useState, useEffect } from 'react';
import VenueService from '../services/venue-service';
import { useNavigate } from 'react-router-dom';

function VenueList({ name, venues }) {
    const navigate = useNavigate();
    const listName = name ? name : 'Venues';
    
    function handleRowClick(venue) {
        navigate(`/venues/${venue.name}`);
    }

    return (
        <>
        <Title>What's Open?</Title>
        <List>
            {venues?.map((venue, index) => (
                <ListItem key={index} disablePadding
                    secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <StarOutline />
                    </IconButton>
                  }
                >
                    <ListItemButton onClick={() => handleRowClick(venue)}>
                        {venue.name}
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
        </>
    );
}

export default VenueList;
