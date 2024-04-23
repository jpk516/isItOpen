import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import IconButton from '@mui/material/IconButton';
import Star from '@mui/icons-material/Star';
import StarOutline from '@mui/icons-material/StarOutline';
import Title from './Title';
import { useState, useEffect } from 'react';
import VenueService from '../services/venue-service';
import AccountService from '../services/account-service';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';

function VenueList({ name, venues, onFavoriteChange }) {
    const { toggleSnackbar } = useAppContext();
    const navigate = useNavigate();
    const listName = name ? name : 'Venues';
    
    useEffect(() => {
        
    }, []);

    function handleRowClick(venue) {
        navigate(`/venues/${venue.name}`);
    }

    function handleFavoriteChange(venue) {
        if (onFavoriteChange) {
            onFavoriteChange(venue);
        }
    }

    function handleFavoriteClick(venue) {
        if (venue.favorite) {
            AccountService.deleteFavorite(venue).then(response => {
                venue.favorite = false;
                handleFavoriteChange(venue);
            }).catch(error => {
                toggleSnackbar('An error occurred while removing the venue from your favorites.', 'error')
            });
        } else {
            AccountService.addFavorite(venue).then(response => {
                venue.favorite = true;
                handleFavoriteChange(venue);
            }).catch(error => {
                toggleSnackbar('An error occurred while adding the venue to your favorites.', 'error')
            });
        }
    }

    return (
        <>
        <Title>What's Open?</Title>
        <List>
            {venues?.map((venue, index) => (
                <ListItem key={index} disablePadding
                    secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => handleFavoriteClick(venue)}>
                        {venue.favorite ? <Star /> : <StarOutline />}
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
