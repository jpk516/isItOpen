import React, { useState, useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext.jsx'; 
import AccountService from '../services/account-service.js';
import VenueService from '../services/venue-service.js';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

function FavoritesList() {
    const { auth } = useAppContext();
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 

    useEffect(() => {
        if (auth?.user) {
            AccountService.getFavorites(auth.user.id)
                .then(response => {
                    setFavorites(response.data); 
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error('Failed to fetch favorites:', error);
                    setIsLoading(false);
                });
        }
    }, [auth]); 

   
    return (
        <div>
            <h1>Favorites</h1>
            <List>
                {favorites.map((favorite, index) => (
                    <ListItem key={favorite._id || index}>
                        <ListItemText 
                            primary={
                                <Typography variant="body1">
                                    {favorite.venue}  {/* Display the venue name */}
                                </Typography>
                            }
                        />
                    </ListItem>
                ))}
            </List>
        </div>
    );
}

export default FavoritesList;
