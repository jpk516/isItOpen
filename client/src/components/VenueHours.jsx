import React from 'react';
import { ListGroup, Card } from 'react-bootstrap';
import moment from 'moment-timezone';

const VenueHours = ({ hours }) => {
  const convertToCST = (utcTime) => {
    if (!utcTime) {
      return 'Closed';
    }
    return moment.utc(utcTime).tz("America/Chicago").format('h:mm A');
  };

  return (
    <Card>
      <Card.Header as="h5">Google-Listed Hours</Card.Header>
      <ListGroup variant="flush">
        {hours.map((hourEntry, index) => (
          <ListGroup.Item key={index}>
            <strong>{hourEntry.day}:</strong> {convertToCST(hourEntry.open)} - {convertToCST(hourEntry.close)}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
};

export default VenueHours;

