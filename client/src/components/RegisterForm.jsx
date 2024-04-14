import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MuiLink from '@mui/material/Link';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';
import AccountService from '../services/account-service';
import { useNavigate } from "react-router-dom";
import { useAppContext } from '../contexts/AppContext';

function RegisterForm() {
    const {auth, setAuth} = useAppContext();
    const navigate = useNavigate();
    const [loginDetails, setLoginDetails] = useState({username: '', password: '', firstName: '', lastName: '', email: ''});
    const [loginMessage, setLoginMessage] = useState('');

    const getIsAuthenticated = () => {
        AccountService.isAuthenticated().then(response => {
            if (response.data.authenticated) {
                setAuth(response.data)
                navigate("/");
            }
        }).catch(error => {
            console.log(error);
        })
    }

    const handleSubmit = () => {
        AccountService.register(loginDetails)
            .then(response => {
                console.log(response)
                if (response.data.success) {
                    getIsAuthenticated();
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
            <Box component="form" noValidate sx={{ mt: 3 }}>
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
                        value={loginDetails.username}
                        onChange={e => setLoginDetails({...loginDetails, username: e.target.value})}
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
                onClick={handleSubmit}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <MuiLink href="#" variant="body2" component={Link} to={"/login"}>
                        Already have an account? Sign in
                        </MuiLink>
                    </Grid>
                </Grid>
            </Box>
        </Box>
      </Container>
    );
  }
  
  export default RegisterForm;