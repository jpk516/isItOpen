import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import CheckInService from '../services/check-in-service';
import TagService from '../services/tag-service';
import { useAppContext } from '../contexts/AppContext.jsx';
import { Box } from '@mui/material';

function CheckIn({ venue, isOpen, onClose, onCheckIn }) {
  const defaultObject = { open: true, comment: '', venue: venue?._id ?? '', tags: [] };
  const [checkInDetails, setCheckInDetails] = useState(defaultObject);
  const [tags, setTags] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const {toggleSnackbar  } = useAppContext();

  useEffect(() => {
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
        toggleSnackbar('Successfully Checked IN', 'success');
      }
    }).catch(error => {
      toggleSnackbar('An error occurred while removing the venue from your favorites.', 'error');
    });
  };

  const handleTagClick = (tag) => {
    const updatedTags = checkInDetails.tags.includes(tag.name)
      ? checkInDetails.tags.filter(t => t !== tag.name)
      : [...checkInDetails.tags, tag.name];
      if(updatedTags.length > 5)
      {
        //how to send friendly message
        updatedTags.splice(5);
      }
    setCheckInDetails({ ...checkInDetails, tags: updatedTags });
  };

  return (
    <Dialog class="checkInDialog" open={isOpen} onClose={onClose}>
      <DialogTitle>What's Up at {venue.name}? Are they still serving?</DialogTitle>
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
  
        {checkInDetails.open && (
           <Box class="tagContainer">
           <Stack direction="column" spacing={1}>
             {tags.map(tag => (
               <Chip
                 key={tag._id}
                 label={tag.name}
                 color={checkInDetails.tags.includes(tag.name) ? 'primary' : 'default'}
                 onClick={() => handleTagClick(tag)}
               />
             ))}
           </Stack>
         </Box>
        )}
  
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
