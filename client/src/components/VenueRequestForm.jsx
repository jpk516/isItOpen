import React, { useState } from 'react';
import { Button, Card, Form, Row, Col } from 'react-bootstrap';

function VenueRequestForm() {
    const [venueDetails, setVenueRequestDetails] = useState({
        name: '',
        type: '',
        email: '',
        website: '',
        description: '',
        address: '',
        city: '', //sets constants for what people can enter, all strings
        state: '',
        zip: '',
        phone: ''
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        setRequestMessage('Your venue request is being processed.'); 
        //this will have to connect to the database, and then I am assuming we will want to do some type of review? 
        //until it gets pushed into an actual venue
        
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setVenueRequestDetails(prevDetails => ({
            ...prevDetails,
            [id]: value   //this would need more back end work as well
        }));
    };
    
    //took the form from the venueForm.jsx page, figured to keep it similar? Or we could go with something more simple, like just a name of the place. 
    return (
        <Card> 
            <Card.Header>Request New Venue!</Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="formVenueName">
                                <Form.Label>Venue Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter venue name" disabled={venueDetails._id?.length > 0}
                                    value={venueDetails.name} required
                                    onChange={handleInputChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formVenueType">
                                <Form.Label>Type</Form.Label>
                                <Form.Select value={venueDetails.type}
                                    onChange={handleInputChange}>
                                    <option value="">Select type</option>
                                    <option value="Bar">Bar</option>
                                    <option value="Restaurant">Restaurant</option>
                                    <option value="Music Venue">Music Venue</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formVenueEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email"
                                    value={venueDetails.email}
                                    onChange={handleInputChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formVenueWebsite">
                                <Form.Label>Website</Form.Label>
                                <Form.Control type="text" placeholder="Enter website"
                                    value={venueDetails.website}
                                    onChange={handleInputChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formVenueDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder="Enter a description of the venue"
                                    value={venueDetails.description} required
                                    onChange={handleInputChange}/>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="formVenueAddress">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" placeholder="Enter address"
                                    value={venueDetails.address} required
                                    onChange={handleInputChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formVenueCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control type="text" placeholder="Enter city"
                                    value={venueDetails.city} required
                                    onChange={handleInputChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formVenueState">
                                <Form.Label>State</Form.Label>
                                <Form.Control type="text" placeholder="Enter state"
                                    value={venueDetails.state} required
                                    onChange={handleInputChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formVenueZip">
                                <Form.Label>Zip Code</Form.Label>
                                <Form.Control type="text" placeholder="Enter zip"
                                    value={venueDetails.zip} required
                                    onChange={handleInputChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formVenuePhone">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="text" placeholder="Enter phone"
                                    value={venueDetails.phone}
                                    onChange={handleInputChange}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='text-end'>
                            <Button variant="primary" type="submit">
                                Request Venue
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
}
export default VenueRequestForm;
