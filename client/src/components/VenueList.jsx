import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
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
                <ListItem key={index} disablePadding>
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
