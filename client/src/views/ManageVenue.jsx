import { NavLink } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import VenueForm from '../components/VenueForm';
import CheckIn from '../components/CheckIn';
import VenueDetails from '../components/VenueDetails';
import VenueService from '../services/venue-service';
import Achievement from '../components/Achievement';

function ManageVenue() {
    const [venueDetails, setVenueDetails] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const [value, setValue] = useState('edit');
    const { name } = useParams();

    useEffect(() => {
        if (name && name.length > 0) {
            VenueService.get(name).then(response => {
                setVenueDetails(response.data);
            }).catch(error => {
                console.log(error.message);
            });
        }
    }, [name]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Container>
            <Grid container spacing={3} mb={3}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h4">Manage Venue</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box display="flex" justifyContent="flex-end">
                        <Button component={NavLink} to="/admin/" variant="contained" color="primary">
                            Back
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            <Tabs value={value} onChange={handleChange} aria-label="venue management tabs" variant="fullWidth">
                <Tab value="edit" label="Edit" />
                <Tab value="checkins" label="Moderate Check-ins" />
                <Tab value="public" label="Public View" />
            </Tabs>
            {value === 'edit' && (
                <Grid container spacing={3}>
                    <Grid item lg={10}>
                        <VenueForm />
                    </Grid>
                </Grid>
            )}
            {value === 'public' && (
                <Grid container spacing={3}>
                    <Grid item lg={6}>
                        <VenueDetails venue={venueDetails} />
                    </Grid>
                    <Grid item lg={6}>
                        <Button variant="contained" onClick={() => setModalOpen(true)}>Check In</Button>
                        <CheckIn isOpen={modalOpen} onClose={() => setModalOpen(false)} />
                    </Grid>
                </Grid>
            )}
            {/* Additional content for other tabs can be added here */}
        </Container>
    );
}

export default ManageVenue;
