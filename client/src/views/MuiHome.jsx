
import IIOMap from '../components/IIOMap';
import VenueList from '../components/VenueList';
import VenueService from '../services/venue-service';
import CheckInService from '../services/check-in-service';
import CheckInList from '../components/CheckInList';
import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Orders from '../components/Orders';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Title from '../components/Title';

function MuiHome() {
    const [venues, setVenues] = useState([]);
    const [checkIns, setCheckIns] = useState([]);
    
    useEffect(() => {
        getVenues();
        getCheckIns();
    }, [])

    const getVenues = () => {
        VenueService.getAll().then(response => {
            setVenues(response.data);
        }).catch(error => {
            console.log(error)
        })
    }

    const getCheckIns = () => {
        CheckInService.getRecent(10).then(response => {
            setCheckIns(response.data);
        }).catch(error => {
            console.log(error)
        })
    }


    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
            {/* Chart */}
                <Grid item xs={12} md={8} lg={9}>
                    <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        
                    }}
                    >
                    <Title>What's Hot?</Title>
                    <IIOMap></IIOMap>
                    </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={4} lg={3}>
                    <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                    >
                    <VenueList />
                    </Paper>
                </Grid>
                {/* Recent Orders */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Orders />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}

export default MuiHome;