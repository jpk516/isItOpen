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
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AccountService from '../services/account-service';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';

export default function LoginForm() {
    const {auth, setAuth} = useAppContext();
    const navigate = useNavigate();
    const [loginDetails, setLoginDetails] = useState({userName: '', password: ''});
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
        AccountService.authenticate(loginDetails.userName, loginDetails.password)
            .then(response => {
                if (response.data.success) {
                    try {
                      getIsAuthenticated();
                    } catch (error) {
                      console.log(error);
                    }
                    
                } else {
                    setLoginMessage(response.data.message)
                }
            })
            .catch(error => {
                setLoginMessage(error);
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
          Sign in
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={e => setLoginDetails({...loginDetails, userName: e.target.value})}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={e => setLoginDetails({...loginDetails, password: e.target.value})}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <Grid container>
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
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}