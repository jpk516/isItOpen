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
        <div>
            <h2>Test if these venues are open:</h2>
            <ul>
                {venues?.map(venue => (
                    <li key={venue._id}>
                        {venue.name}
                        <Button variant="contained" color="primary" onClick={() => VenueService.isOpen(venue._id).then(response => {
                            console.log(response.data);
                            toggleSnackbar(`${venue.name} is ${response.data ? 'open' : 'closed'}`, 'info');
                        }).catch(error => {
                            console.log(error);
                        })}>Open?</Button>
                    </li>
                ))}
            </ul>
        </div>
    </>
    );
}

export default Test;
