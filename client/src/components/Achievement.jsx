import React from 'react';
import { Badge, Tooltip } from '@mui/material';

const Achievement = ({ text, tooltipText, color = 'primary' }) => {
  return (
    <div style={{ textAlign: 'center', padding: 8 }}>
      <Tooltip title={tooltipText} placement="top">
        <h5>
          <Badge color={color} variant="dot">
            {text}
          </Badge>
        </h5>
      </Tooltip>
      <div>{text}</div>
    </div>
  );
};

export default Achievement;
