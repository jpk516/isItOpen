import React, { useState, useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext.jsx';
import AccountService from '../services/account-service.js';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Star from '@mui/icons-material/Star';
import StarOutline from '@mui/icons-material/StarOutline';

function FavoritesList() {
    const {toggleSnackbar  } = useAppContext();
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        AccountService.getFavorites().then(response => {
            setFavorites(response.data);
        }).catch(error => {
            toggleSnackbar('An error getting user favorites', 'error');
        });

    }, []);

    function handleFavoriteClick(favorite) {
        console.log(favorite);
        if (favorite.favorite) { //if star is marked if statement is started
            AccountService.deleteFavorite(favorite) //calls on service to delete the favorite
                .then(response => { // once favorite deleted the selected favorite from the list 
                    const updatedFavorites = favorites.filter(f => f._id !== favorite._id);
                    setFavorites(updatedFavorites); // Resets list without now gone favorite so list reloads
                    toggleSnackbar('Venue removed from favorites.', 'success'); //success message
                })
                .catch(error => {
                    //Message shown if favorite cannot be removed
                    toggleSnackbar('An error occurred while removing the venue from your favorites.', 'error');
                    console.error('Error removing favorite:', error);
                });
        }
    }
    

   
    return (
        <div>
            <h1>Favorites</h1>
            <List>
                {favorites.map((favorite, index) => (
                    <ListItem key={favorite._id || index} disablePadding>
                        <ListItemButton onClick={() => {/* logic to handle row click */}}>
                            <ListItemText
                                primary={
                                    <Typography variant="body1">
                                        {favorite.name}
                                    </Typography>
                                }
                            />
                        </ListItemButton>
                        <IconButton 
                            edge="end" 
                            aria-label={favorite.favorite ? "remove from favorites" : "add to favorites"}
                            onClick={() => handleFavoriteClick(favorite)}
                        >
                            {favorite.favorite ? <Star /> : <StarOutline />}
                        </IconButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );
}

export default FavoritesList;