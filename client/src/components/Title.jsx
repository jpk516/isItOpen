import * as React from 'react';
import Typography from '@mui/material/Typography';

function Title({children}) {
  return (
    <Typography component="h2" variant="h5" color="primary" gutterBottom>
      {children}
    </Typography>
  );
}

export default Title;