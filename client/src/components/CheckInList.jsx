import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

function CheckInList({ checkIns }) {
    // Order the check-ins by date
    checkIns.sort((a, b) => new Date(b.created) - new Date(a.created));

    return (
        <Grid container spacing={4}>
            {checkIns.map((checkIn) => (
                <Grid item xs={12} md={4} key={checkIn._id}>
                    <Card variant="outlined">
                        <Box>
                            <CardContent>
                                <Typography variant="subtitle2" color="primary" gutterBottom>
                                    {checkIn.venue.type}
                                </Typography>
                                <Typography variant="h6" component="div">
                                    {checkIn.venue.name}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    {new Date(checkIn.created).toLocaleString()}
                                </Typography>
                                <div>
                                    {checkIn.tags.map((tag, index) => (
                                        <Chip label={tag} color="secondary" size="small" key={index} sx={{ m: .5 }} />
                                    ))}
                                </div>
                                {checkIn.comment && (
                                    <Typography variant="body2" mt={2}>
                                        {checkIn.comment}
                                    </Typography>
                                )}
                            </CardContent>
                            <Box p={2}>
                                <Typography variant="body2" color="primary" component="a" href="#">
                                    View
                                </Typography>
                            </Box>
                        </Box>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default CheckInList;
