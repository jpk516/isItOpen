
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
    const { setPageTitle } = useAppContext();
    const [venues, setVenues] = useState([]);
    const [checkIns, setCheckIns] = useState([]);
    
    useEffect(() => {
        setPageTitle('Home');
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
        <Container>
            <Row className="mb-3">
                <Col>
                    <h2>What's Hot?</h2>
                </Col>
                <hr />
            </Row>
            <Row>
                <Col>
                    <IIOMap venues={venues} checkIns={checkIns}/>
                </Col>
                <Col lg={4}>
                    <VenueList />
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