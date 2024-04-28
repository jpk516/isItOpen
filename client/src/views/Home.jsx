import IIOMap from '../components/IIOMap';
import VenueList from '../components/VenueList';
import VenueService from '../services/venue-service';
import CheckInService from '../services/check-in-service';
import CheckInList from '../components/CheckInList';
import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Title from '../components/Title';
import { useAppContext } from '../contexts/AppContext';

function Home() {
    const { setPageTitle, toggleSnackbar } = useAppContext();
    const [venues, setVenues] = useState([]);
    const [checkIns, setCheckIns] = useState([]);
    const [allCheckIns, setAllCheckIns] = useState([]);
    
    useEffect(() => {
        setPageTitle('Home');
        getVenues();
        getCheckIns();
    }, [])

    const getVenues = () => {
        VenueService.getAll().then(response => {
            setVenues(response.data);
        }).catch(error => {
            toggleSnackbar('An error occured getting Venues', 'error');
        })
    }

    const onFavoriteChange = (venue) => {
        const updatedVenues = venues.map(v => {
            if (v._id === venue._id) {
                return {
                    ...v,
                    favorite: venue.favorite
                };
            }
            return v;
        });
        setVenues(updatedVenues);
    }

    const getCheckIns = () => {
        CheckInService.getRecent(10).then(response => {
            setCheckIns(response.data);
        }).catch(error => {
            toggleSnackbar('An error occured getting recent Check Ins', 'error');
        })
    }


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
                    <IIOMap venues={venues}></IIOMap>
                    </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={4} lg={3}>
                    <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        maxHeight: 500,
                        overflow: 'auto',
                        minHeight: 672
                    }}
                    >
                    <Title>What's Open?</Title>
                    <VenueList venues={venues} onFavoriteChange={(venue) => onFavoriteChange(venue)}/>
                    </Paper>
                </Grid>
                {/* Recent Orders */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <Title>What's Up? <small>10 latest updates</small></Title>
                        <CheckInList checkIns={checkIns} onVote={(update) => replaceCheckIn(update)} />
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
}

export default Home;