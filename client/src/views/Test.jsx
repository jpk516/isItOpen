import React, { useState, useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Button } from '@mui/material';
import VenueService from '../services/venue-service';
import VenueList from '../components/VenueList';

function Test() {
    const {auth, setAuth, toggleSnackbar } = useAppContext();
    const [venues, setVenues] = useState([]);

    useEffect(() => {
        VenueService.getAll().then(response => {
            setVenues(response.data);
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
    </>
    );
}

export default Test;
