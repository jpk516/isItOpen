import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

const VenueHours = ({ hours }) => {
  return (
    <div>
      <h5>Hours</h5>
      <ListGroup>
        {hours.map((hour, index) => (
          <ListGroup.Item key={index}>{hour}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default VenueHours;
