import React from 'react';
import { Card, ListGroup, Badge } from 'react-bootstrap';

function CheckInList({ checkIns }) {
  return (
    <ListGroup>
        {checkIns.map((checkIn) => (
            <ListGroup.Item key={checkIn._id}>
                <Card>
                <Card.Header>
                    Venue ID: {checkIn.venue} - {checkIn.open ? 'Open' : 'Closed'}
                </Card.Header>
                    <Card.Body>
                        <Card.Title>Check-in Details</Card.Title>
                        <Card.Text>
                            User ID: {checkIn.user}
                        </Card.Text>
                        <Card.Text>
                            Comment: {checkIn.comment || 'No comment provided'}
                        </Card.Text>
                        <Card.Text>
                            Created: {new Date(checkIn.created).toLocaleString()}
                        </Card.Text>
                        <Card.Text>
                            Tags: 
                            {checkIn.tags.map((tag, index) => (
                                <Badge pill bg="secondary" className="ms-1" key={index}>
                                    {tag}
                                </Badge>
                            ))}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </ListGroup.Item>
        ))}
    </ListGroup>
  );
}

export default CheckInList;
