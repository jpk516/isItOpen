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
import Paper from '@mui/material/Paper'
import Title from '../components/Title';

import VenueForm from '../components/VenueForm';
import CheckIn from '../components/CheckIn';
import VenueDetails from '../components/VenueDetails';
import VenueService from '../services/venue-service';
import CheckInService from "../services/check-in-service";
import Achievement from '../components/Achievement';
import IIOMap from "../components/IIOMap";
import CheckInList from "../components/CheckInList";

function ViewVenue() {
    const [venueDetails, setVenueDetails] = useState({});
    const [checkIns, setCheckIns] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [value, setValue] = useState('edit');
    const { name } = useParams();

    const getCheckIns = (id) => {
        CheckInService.getByVenue(id).then(response => {
            setCheckIns(response.data);
        }).catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        if (name && name.length > 0) {
            VenueService.get(name).then(response => {
                setVenueDetails(response.data);
                getCheckIns(response.data._id);
            }).catch(error => {
                console.log(error.message);
            });
        }
    }, [name]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const replaceCheckIn = (checkIn) => {
        const updatedCheckIns = checkIns.map(c => {
            if (c._id === checkIn._id) {
                return {
                    ...c,
                    upvoteCount: checkIn.upvoteCount,
                    downvoteCount: checkIn.downvoteCount,
                    userVoteStatus: checkIn.userVoteStatus
                };
            }
            return c;
        });
        setCheckIns(updatedCheckIns);
    };

    return (
        <>
            {/* Venue Loaded */}
            {venueDetails?.name && (<>
                <Grid container spacing={3} mb={3}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4">{venueDetails.name}</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item lg={6}>
                        <Box display="flex" justifyContent="flex-end">
                            <Button variant="contained" onClick={() => setModalOpen(true)}>Update Us!</Button>
                            <CheckIn venue={venueDetails} isOpen={modalOpen} onClose={() => setModalOpen(false)} />
                        </Box>
                        <VenueDetails venue={venueDetails} />
                    </Grid>
                    <Grid item lg={6}>
                        <IIOMap venues={[venueDetails]} />
                    </Grid>
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <Title>What's Up?</Title>
                            <CheckInList checkIns={checkIns} isVenuePage={true} onVote={(updated) => replaceCheckIn(updated)} />
                        </Paper>
                    </Grid>
                </Grid>
            </>)
            }
            {/* Venue Loading */}
            {!venueDetails?.name && (<>
                <Typography variant="h4">Loading...</Typography>
            </>)
            }
        </>
    );
}

export default ViewVenue;
