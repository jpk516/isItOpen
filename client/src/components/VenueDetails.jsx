import React from 'react';
import { Card, ListGroup, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaBuilding, FaPhone, FaEnvelope, FaGlobe, FaMusic, FaUtensils, FaGlassMartiniAlt } from 'react-icons/fa';

const VenueView = ({ venue }) => {
  const getVenueTypeIcon = (type) => {
    switch (type) {
      case 'Bar':
        return <FaGlassMartiniAlt />;
      case 'Restaurant':
        return <FaUtensils />;
      case 'Music Venue':
        return <FaMusic />;
      default:
        return null;
    }
  };

  return (
    <Card className="m-3">
      <Card.Header as="h5">{venue.name}</Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <FaBuilding /> <strong>Address:</strong> {`${venue.address}, ${venue.city}, ${venue.state} ${venue.zip}`}
        </ListGroup.Item>
        <ListGroup.Item>
          <FaPhone /> <strong>Phone:</strong> {venue.phone}
        </ListGroup.Item>
        <ListGroup.Item>
          <FaEnvelope /> <strong>Email:</strong> {venue.email}
        </ListGroup.Item>
        <ListGroup.Item>
          <FaGlobe /> <strong>Website:</strong> <Link to={{ pathname: venue.website }} target="_blank">{venue.website}</Link>
        </ListGroup.Item>
        <ListGroup.Item>
          {getVenueTypeIcon(venue.type)} <strong>Type:</strong> {venue.type}
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default VenueView;
