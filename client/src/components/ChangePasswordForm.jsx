import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import AccountService from '../services/account-service';
import { useAppContext } from '../contexts/AppContext'; 

function ChangePasswordForm() {
  const { toggleSnackbar } = useAppContext(); // Assuming you have a method to show snackbars
  const [passwords, setPasswords] = useState({ password: '', confirmPassword: '' });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (passwords.password !== passwords.confirmPassword) {
      toggleSnackbar("Passwords do not match", "error");
      return;
    }

    
    AccountService.update({ password: passwords.password })
      .then(response => {
        if (response.data.success) {
          toggleSnackbar("Password updated successfully", "success");
        } else {
          toggleSnackbar(response.data.message, "error");
        }
      })
      .catch(error => {
        toggleSnackbar("Failed to update password", "error");
      });
  };

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="New Password"
            type="password"
            value={passwords.password}
            onChange={(e) => setPasswords({ ...passwords, password: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Confirm New Password"
            type="password"
            value={passwords.confirmPassword}
            onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            Change Password
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default ChangePasswordForm;

