import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import MuiLink from '@mui/material/Link';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AccountService from '../services/account-service';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import openLogo from '../assets/open.png';

export default function ForgotPasswordForm() {
    const { toggleSnackbar } = useAppContext();
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({email: ''});
    
    const handleSubmit = () => {
        AccountService.forgotPassword(userDetails.email).then(response => {
            if (response.data.success) {
                toggleSnackbar("Password reset email sent", "success");
                navigate('/login');
            } else {
                toggleSnackbar(response.data.message, "error");
            }
        }).catch(error => {
            toggleSnackbar("Failed to send password reset email", "error");
        });
    }
    
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img src={openLogo} alt="Is it open logo" width="200" />
        <Typography component="h1" variant="h5">
          Forgot your password?
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={e => setUserDetails({...userDetails, email: e.target.value})}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Send Reset Email
          </Button>
          {/* <Grid container>
            <Grid item xs>
              <MuiLink variant="body2">
                Forgot password?
              </MuiLink>
            </Grid>
            <Grid item>
              <MuiLink variant="body2" component={Link} to={"/register"}>
                {"Don't have an account? Sign Up"}
              </MuiLink>
            </Grid>
          </Grid> */}
        </Box>
      </Box>
    </Container>
  );
}
