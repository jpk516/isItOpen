import React from 'react';
import { Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';

const Achievement = ({ text, tooltipText, color = 'primary' }) => {
  return (
    <div className="text-center p-2">
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip id={`tooltip-${text}`}>{tooltipText}</Tooltip>}
      >
        <h5>
          <Badge bg={color}>
            {text}
          </Badge>
        </h5>
      </OverlayTrigger>
      <div>{text}</div>
    </div>
  );
};

export default Achievement;
