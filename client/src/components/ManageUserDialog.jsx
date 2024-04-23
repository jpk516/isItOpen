import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, MenuItem, Select, FormControl, InputLabel, FormControlLabel, Switch } from '@mui/material';

const ManageUserDialog = ({ open, onClose, user, onSave }) => {
  const [editedUser, setEditedUser] = useState({
    _id: '',
    email: '',
    firstName: '',
    lastName: '',
    role: '',
    username: '',
    disabled: false,
  });

  useEffect(() => {
    // Populate form when the user prop changes
    if (user) {
      console.log(user);
      setEditedUser({
        _id: user._id || '',
        username: user.username || '',
        email: user.email || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        role: user.role || '',
        disabled: user.disabled || false,
      });
    }
  }, [user]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSave) onSave(editedUser);
    onClose(); // Close the dialog after saving
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="username"
          label="Username"
          type="text"
          fullWidth
          variant="outlined"
          value={editedUser.username}
          onChange={e => setEditedUser({ ...editedUser, username: e.target.value })}
        />
        <TextField
          margin="dense"
          name="email"
          label="Email"
          type="email"
          fullWidth
          variant="outlined"
          value={editedUser.email}
          onChange={e => setEditedUser({ ...editedUser, email: e.target.value })}
        />
        <TextField
          margin="dense"
          name="firstName"
          label="First Name"
          type="text"
          fullWidth
          variant="outlined"
          value={editedUser.firstName}
          onChange={e => setEditedUser({ ...editedUser, firstName: e.target.value })}
        />
        <TextField
          margin="dense"
          name="lastName"
          label="Last Name"
          type="text"
          fullWidth
          variant="outlined"
          value={editedUser.lastName}
          onChange={e => setEditedUser({ ...editedUser, lastName: e.target.value })}
        />
        <FormControl fullWidth margin="dense">
            <InputLabel id="role-label">Role</InputLabel>
            <Select
                labelId="role-label"
                id="role"
                value={editedUser.role}
                label="Role"
                onChange={e => setEditedUser({ ...editedUser, role: e.target.value })}
            >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="User">User</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
            </Select>
        </FormControl>
        <FormControlLabel
              sx={{ mt: 1 }}
              control={
                <Switch checked={editedUser.disabled} onChange={e => setEditedUser({ ...editedUser, disabled: e.target.checked })} />
              }
              label="Disabled (Will not be able to login)"
            />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ManageUserDialog;
