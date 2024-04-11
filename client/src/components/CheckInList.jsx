import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { useNavigate } from 'react-router-dom';
import MuiLink from '@mui/material/Link';
import { Link } from 'react-router-dom';

function CheckInList({ checkIns, isVenuePage = false }) {
    const navigate = useNavigate();

    const handleButtonClick = (name) => {
        navigate(`/venues/${name}`);
    };

    if (!checkIns) return null;
    checkIns.sort((a, b) => new Date(b.created) - new Date(a.created));

    // Placeholder functions for voting
    const handleUpvote = (checkInId) => {
        console.log('Upvoting', checkInId);
        // Here you would have logic or a call to handle the upvote action
    };

    const handleDownvote = (checkInId) => {
        console.log('Downvoting', checkInId);
        // Here you would have logic or a call to handle the downvote action
    };

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
                            <Box p={2} display="flex" justifyContent="space-between" alignItems="center">
                                { !isVenuePage &&   
                                <MuiLink component={Link} to={`/venues/${checkIn.venue.name}`} color="primary">
                                    View Venue
                                </MuiLink>
                                }
                                <Typography variant="body2" color="text.secondary">
                                    {checkIn.votes.length} votes
                                </Typography>
                                <Box>
                                    <IconButton onClick={() => handleUpvote(checkIn._id)} color="primary">
                                        <ThumbUpAltIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDownvote(checkIn._id)} color="secondary">
                                        <ThumbDownAltIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                        </Box>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default CheckInList;
