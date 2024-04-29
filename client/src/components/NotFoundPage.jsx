import React from 'react';
import NotFoundIcon from '../assets/not-found-icon.png';
import { Box, Typography, Container } from '@mui/material';

const NotFoundPage = () => (
  <Container component="main" maxWidth="sm">
  <Box
    sx={{
      marginTop: 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    <img className="Image404" src={NotFoundIcon} alt="404 Not found"/>
    <Typography component="h1" variant="h5" color="textPrimary" gutterBottom>
      Oops, something went wrong!
    </Typography>
    <Typography variant="body1" color="textSecondary">
      We're cannot find your current page
    </Typography>
  </Box>
</Container>
);

export default NotFoundPage;
