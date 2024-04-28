import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import AccountService from '../services/account-service';
import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';

export default function ResetPasswordForm() {
    const { email, token } = useParams();
    const { toggleSnackbar } = useAppContext();
    const navigate = useNavigate();
    const [passwordDetails, setPasswordDetails] = useState({ password: '', confirmPassword: '' });
    
    const handleSubmit = () => {
        if (!passwordDetails.password || !passwordDetails.confirmPassword) {
            toggleSnackbar("Please fill in all fields", "error");
            return;
        }

        if (passwordDetails.password !== passwordDetails.confirmPassword) {
            toggleSnackbar("Passwords do not match", "error");
            return;
        }

        AccountService.resetPassword(email, token, passwordDetails.password).then(response => {
            if (response.data.success) {
                toggleSnackbar("Password has been reset successfully", "success");
                navigate('/login');
            } else {
                toggleSnackbar(response.data.message, "error");
            }
        }).catch(error => {
            toggleSnackbar("Failed to reset password", "error");
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
                <Typography component="h1" variant="h5">
                    Pick a New Password
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="New Password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        onChange={e => setPasswordDetails({...passwordDetails, password: e.target.value})}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="confirm-password"
                        label="Confirm New Password"
                        name="confirmPassword"
                        type="password"
                        autoComplete="new-password"
                        onChange={e => setPasswordDetails({...passwordDetails, confirmPassword: e.target.value})}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleSubmit}
                    >
                        Reset Password
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
