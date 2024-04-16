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
import CheckInTable from '../components/CheckInTable';
import CheckInService from "../services/check-in-service";
import VenueDetails from '../components/VenueDetails';
import VenueService from '../services/venue-service';
import { useAppContext } from "../contexts/AppContext";

function ManageVenue() {
    const { setPageTitle } = useAppContext();
    const [venueDetails, setVenueDetails] = useState({});
    const [checkIns, setCheckIns] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [value, setValue] = useState('edit');
    const { name } = useParams();


    useEffect(() => {
        setPageTitle('Manage Venue');
        if (name && name.length > 0) {
            VenueService.get(name).then(response => {
                setVenueDetails(response.data, getCheckIns());
            }).catch(error => {
                console.log(error.message);
            });
        }
    }, [name]);

    const getCheckIns = () => {
        CheckInService.getByVenue(venueDetails._id).then(response => {
            setCheckIns(response.data);
        }).catch(error => {
            console.log(error)
        })
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Grid container spacing={3} mb={3}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h5">{venueDetails?.name ?? 'Loading'}</Typography>
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
                    <Grid item lg={12}>
                        <VenueForm />
                    </Grid>
                </Grid>
            )}
            {value === 'checkins' && (
                <Grid container spacing={3}>
                    <Grid item lg={12}>
                        <CheckInTable checkIns={checkIns} />
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
                        <CheckIn venue={venueDetails} isOpen={modalOpen} onClose={() => setModalOpen(false)} />
                    </Grid>
                </Grid>
            )}
        </>
    );
}

export default ManageVenue;
