import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { NavLink } from "react-router-dom";
import Title from '../components/Title';
import VenueTable from '../components/VenueTable';
import VenueService from '../services/venue-service';
import { useState, useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';

function Venues() {
    const [venues, setVenues] = useState([]);
    const { setPageTitle, toggleSnackbar } = useAppContext();

    useEffect(() => {
        setPageTitle('Venues');
        VenueService.getAll().then(response => {
            setVenues(response.data);
        }).catch(error => {
            toggleSnackbar('An error occured getting venues', 'error');
        });
    }, []);


    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Title>Venue List</Title>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <VenueTable venues={venues} />
                </Grid>
            </Grid>
        </>
    );
}

export default Venues;
