import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import CheckInService from '../services/check-in-service';
import VenueService from '../services/venue-service';
import TagService from '../services/tag-service';

function CheckIn({ isOpen, onClose, onCheckIn }) {
  const defaultObject = { open: true, comment: '', venue: '', tags: [] };
  const [checkInDetails, setCheckInDetails] = useState(defaultObject);
  const [venueSelectList, setVenueSelectList] = useState([]);
  const [tags, setTags] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    VenueService.getSelectList().then(response => {
      setVenueSelectList(response.data);
    }).catch(error => {
      console.log(error);
    });

    TagService.getAll().then(response => {
      setTags(response.data);
    }).catch(error => {
      console.log(error);
    });
  }, []);

  const handleCheckIn = (event) => {
    event.preventDefault();
    CheckInService.add(checkInDetails).then(() => {
      setCheckInDetails(defaultObject);
      onClose(); // Close the modal on successful check-in
      if (onCheckIn) {
        onCheckIn();
      }
    }).catch(error => {
      setErrorMessage(error.response?.data ?? "An error occurred, please try again.");
    });
  };

  const handleTagClick = (tag) => {
    const updatedTags = checkInDetails.tags.includes(tag.name)
      ? checkInDetails.tags.filter(t => t !== tag.name)
      : [...checkInDetails.tags, tag.name];
    setCheckInDetails({ ...checkInDetails, tags: updatedTags });
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>What's Up? Are they still serving?</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="normal">
          <ToggleButtonGroup
            color="primary"
            value={checkInDetails.open ? 'open' : 'closed'}
            exclusive
            onChange={(event, newAlignment) => {
              setCheckInDetails({ ...checkInDetails, open: newAlignment === 'open' });
            }}
          >
            <ToggleButton value="open">Yup! It's open.</ToggleButton>
            <ToggleButton value="closed">Nope! They are done.</ToggleButton>
          </ToggleButtonGroup>
        </FormControl>

        {checkInDetails.open && (
          <Stack direction="row" spacing={1} marginTop={2}>
            {tags.map(tag => (
              <Chip
                key={tag._id}
                label={tag.name}
                color={checkInDetails.tags.includes(tag.name) ? 'primary' : 'default'}
                onClick={() => handleTagClick(tag)}
              />
            ))}
          </Stack>
        )}

        <TextField
          margin="normal"
          fullWidth
          id="comment"
          label="Any other juicy details?"
          multiline
          rows={3}
          value={checkInDetails.comment}
          onChange={e => setCheckInDetails({ ...checkInDetails, comment: e.target.value })}
        />

        <FormControl fullWidth margin="normal">
          <Select
            value={checkInDetails.venue}
            onChange={e => setCheckInDetails({ ...checkInDetails, venue: e.target.value })}
            displayEmpty
            inputProps={{ 'aria-label': 'Venue' }}
          >
            <MenuItem disabled value="">
              <em>Select venue</em>
            </MenuItem>
            {venueSelectList.map(venue => (
              <MenuItem key={venue._id} value={venue._id}>{venue.name}</MenuItem>
            ))}
          </Select>
          <FormHelperText>Required</FormHelperText>
        </FormControl>

        {errorMessage && <FormHelperText error>{errorMessage}</FormHelperText>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleCheckIn}>Check In</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CheckIn;
