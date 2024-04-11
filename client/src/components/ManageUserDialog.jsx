import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

const ManageUserDialog = ({ open, onClose, user, onSave }) => {
  const [editedUser, setEditedUser] = useState({
    email: '',
    firstName: '',
    lastName: '',
    role: '',
  });

  useEffect(() => {
    // Populate form when the user prop changes
    if (user) {
      setEditedUser({
        email: user.email || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        role: user.role || '',
      });
    }
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(editedUser);
    onClose(); // Close the dialog after saving
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="email"
          label="Email"
          type="email"
          fullWidth
          variant="outlined"
          value={editedUser.email}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="firstName"
          label="First Name"
          type="text"
          fullWidth
          variant="outlined"
          value={editedUser.firstName}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="lastName"
          label="Last Name"
          type="text"
          fullWidth
          variant="outlined"
          value={editedUser.lastName}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="role"
          label="Role"
          select
          fullWidth
          variant="outlined"
          value={editedUser.role}
          onChange={handleChange}
          SelectProps={{
            native: true,
          }}
        >
          {['Admin', 'User'].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ManageUserDialog;
