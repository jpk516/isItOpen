import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        Is It Open?{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}

export default Copyright;