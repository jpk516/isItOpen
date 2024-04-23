import React, { useState, useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Button } from '@mui/material';
import VenueService from '../services/venue-service';
import VenueList from '../components/VenueList';
import AccountService from '../services/account-service';

function Test() {
    const {auth, setAuth, toggleSnackbar } = useAppContext();
    const [favoriteVenues, setFavoriteVenues] = useState([]);
    const [venues, setVenues] = useState([]);

    useEffect(() => {
        VenueService.getAll().then(response => {
            setVenues(response.data);
        }).catch(error => {
            console.log(error);
        });
        
        AccountService.getFavorites().then(response => {
            setFavoriteVenues(response.data);
        }).catch(error => {
            console.log(error);
        });

    }, []);

    const toggleMessage = () => {
        toggleSnackbar('This is a test message', 'info');
    }
    
    return (
    <>
        <div>
            user: {auth?.user?.username}
        </div>
        <div>
            <Button variant="contained" color="primary" onClick={() => toggleMessage()}>Toggle Message</Button>
        </div>
        <div>
            <VenueList venues={venues} />
        </div>
        <div>
            <h2>Favorites</h2>
            <VenueList venues={favoriteVenues} />
        </div>
    </>
    );
}

export default Test;
