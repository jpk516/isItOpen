import React from 'react';
import { useState } from 'react';
import { Badge, Tooltip } from '@mui/material';
import Popover from '@mui/material/Popover';
import { CheckCircle } from '@mui/icons-material';
import { green, grey } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

const Achievement = ({ text, tooltipText, color = green[500], Icon = CheckCircle, earned = 0, date}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack direction="column" spacing={1} justifyContent="center" alignItems="center"> 
      <Avatar 
        sx={{ bgcolor: earned ? color : grey, width: 50, height: 50}}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <Icon />
      </Avatar>
      <Typography>{text}</Typography>
      <Popover
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 2 }}>{tooltipText}</Typography>
      </Popover>
    </Stack>
  );
};

export default Achievement;
