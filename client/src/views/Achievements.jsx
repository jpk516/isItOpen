import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Achievement from '../components/Achievement';
import { useAppContext } from '../contexts/AppContext';
import AchievementService from '../services/achievement-service';


function Achievements() {
    const { setPageTitle, toggleSnackbar } = useAppContext();
    const [achievements, setAchievements] = useState([]);


    useEffect(() => {
        setPageTitle('Achievements');

        AchievementService.getAll().then((response) => {
            setAchievements(response.data);
        }).catch((error) => {
            toggleSnackbar('error', 'Failed to load achievements');
        });
    }, [])

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h4" gutterBottom>
                        Your Achievements
                    </Typography>
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <Stack direction="row" spacing={3}>
                        {achievements.map((achievement) => (
                            <Achievement key={achievement._id} text={achievement.name} tooltipText={achievement.description} earned={achievement?.earned ?? false} />
                        ))}
                        {/* <Achievement text="Early Riser" tooltipText="Awarded for being one of the first 100 people to use IIO - 1/1/1965" earned={true} />
                        <Achievement text="x10 Checkins" tooltipText="Awarded for making 10 check-in updates. - 1/1/1965" earned={true} />
                        <Achievement text="x20 Checkins" tooltipText="Awarded for making 20 check-in updates. - 1/1/1965"/> */}
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    );  
}

export default Achievements;
