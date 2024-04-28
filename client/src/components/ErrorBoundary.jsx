import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import BrokenIcon from '../assets/broken-icon.png'; 


//got base code from: https://legacy.reactjs.org/docs/error-boundaries.html

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container component="main" maxWidth="sm">
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img src={BrokenIcon} alt="Broken computer icon"/>
            <Typography component="h1" variant="h5" color="textPrimary" gutterBottom>
              Oops, something went wrong!
            </Typography>
            <Typography variant="body1" color="textSecondary">
              We're having some technical difficulties. Please try again later.
            </Typography>
          </Box>
        </Container>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
