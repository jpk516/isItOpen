import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';

function ChangePasswordForm({ onSubmit }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation logic here
    onSubmit(password);
  };

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="New Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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

function ProfileCard() {
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const handlePasswordChange = () => {
    setShowPasswordForm(true);
  };

  const handleSubmitPasswordChange = (newPassword) => {
    // Implement logic to handle password change, such as making an API call
    console.log('New password:', newPassword);
    setShowPasswordForm(false); // Hide the form after submission
  };

  return (
    <Card>
      <CardContent>
        {/* User details list here */}
        <Button onClick={handlePasswordChange} variant="outlined" color="primary">
          Change Password
        </Button>
        {showPasswordForm && <PasswordChangeForm onSubmit={handleSubmitPasswordChange} />}
      </CardContent>
    </Card>
  );
}

export default ChangePasswordForm;
