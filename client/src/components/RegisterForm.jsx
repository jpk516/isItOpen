import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';
import AccountService from '../services/account-service';
import { useNavigate } from "react-router-dom";

function RegisterForm({ authenticated, onAuthChange }) {
    const navigate = useNavigate();
    const [loginDetails, setLoginDetails] = useState({userName: '', password: ''});
    const [loginMessage, setLoginMessage] = useState('');

    const handleSubmit = () => {
        AccountService.register(loginDetails.userName, loginDetails.password)
            .then(response => {
                if (response.data.success) {
                    onAuthChange(true);
                    navigate("/");
                } else {
                    setLoginMessage(response.data.message)
                }
            })
            .catch(error => {
                setLoginMessage(error)
            })
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
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        autoComplete="given-name"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                        value={loginDetails.firstName}
                        onChange={e => setLoginDetails({...loginDetails, firstName: e.target.value})}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="family-name"
                        value={loginDetails.lastName}
                        onChange={e => setLoginDetails({...loginDetails, lastName: e.target.value})}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        id="username"
                        label="Username (visible in the app)"
                        name="username"
                        autoComplete="username"
                        value={loginDetails.userName}
                        onChange={e => setLoginDetails({...loginDetails, userName: e.target.value})}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={loginDetails.email}
                        onChange={e => setLoginDetails({...loginDetails, email: e.target.value})}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={loginDetails.password}
                        onChange={e => setLoginDetails({...loginDetails, password: e.target.value})}
                        />
                    </Grid>
                </Grid>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link href="#" variant="body2">
                        Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
      </Container>
    );
  }
  
  export default RegisterForm;