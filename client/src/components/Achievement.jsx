import React from 'react';
import { Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';

const Achievement = ({ text, tooltipText, color = 'primary' }) => {
  return (
    <div className="text-center">
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip id={`tooltip-${text}`}>{tooltipText}</Tooltip>}
      >
        <Badge bg={color} pill>
          {text}
        </Badge>
      </OverlayTrigger>
      <div>{text}</div>
    </div>
  );
};

export default Achievement;
