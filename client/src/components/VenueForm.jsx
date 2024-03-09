import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import VenueService from '../services/venue-service';
import { useParams, useNavigate } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function VenueForm() {
    const [validated, setValidated] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { name } = useParams();
    const navigate = useNavigate();
    const [venueDetails, setVenueDetails] = useState({
        name: '', 
        description: '', 
        address: '', 
        city: '', 
        state: '', 
        zip: '', 
        phone: '', 
        email: '', 
        website: '', 
        image: '', 
        type: ''
    });

    useEffect(() => {
        if (name && name.length > 0) {
            VenueService.get(name).then(response => {
                setVenueDetails(response.data);
            }).catch(error => {
                setErrorMessage(error.message)
            });
        }
    }, [name, VenueService]);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
            setValidated(true);
        } else {
            const serviceMethod = venueDetails._id ? VenueService.update : VenueService.add;
            serviceMethod(venueDetails)
                .then(response => {
                    setVenueDetails(response.data);
                    navigate("/venues");
                })
                .catch(error => {
                    setErrorMessage(error.response?.data ?? "An error occurred, please try again.");
                });
        }
    };

    return (
        <Card>
            <Card.Header>Manage Venue</Card.Header>
            <Card.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="formVenueName">
                                <Form.Label>Venue Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter venue name" disabled={venueDetails._id?.length > 0}
                                    value={venueDetails.name} required
                                    onChange={e => setVenueDetails({ ...venueDetails, name: e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formVenueDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder="Enter a description of the venue"
                                    value={venueDetails.description} required
                                    onChange={e => setVenueDetails({ ...venueDetails, description: e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formVenueAddress">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" placeholder="Enter address"
                                    value={venueDetails.address} required
                                    onChange={e => setVenueDetails({ ...venueDetails, address: e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formVenueCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control type="text" placeholder="Enter city"
                                    value={venueDetails.city} required
                                    onChange={e => setVenueDetails({ ...venueDetails, city: e.target.value })} />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="formVenueState">
                                <Form.Label>State</Form.Label>
                                <Form.Control type="text" placeholder="Enter state"
                                    value={venueDetails.state} required
                                    onChange={e => setVenueDetails({ ...venueDetails, state: e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formVenueZip">
                                <Form.Label>Zip Code</Form.Label>
                                <Form.Control type="text" placeholder="Enter zip"
                                    value={venueDetails.zip} required
                                    onChange={e => setVenueDetails({ ...venueDetails, zip: e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formVenuePhone">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="text" placeholder="Enter phone"
                                    value={venueDetails.phone}
                                    onChange={e => setVenueDetails({ ...venueDetails, phone: e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formVenueEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email"
                                    value={venueDetails.email}
                                    onChange={e => setVenueDetails({ ...venueDetails, email: e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formVenueWebsite">
                                <Form.Label>Website</Form.Label>
                                <Form.Control type="text" placeholder="Enter website"
                                    value={venueDetails.website}
                                    onChange={e => setVenueDetails({ ...venueDetails, website: e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formVenueType">
                                <Form.Label>Type</Form.Label>
                                <Form.Select value={venueDetails.type}
                                    onChange={e => setVenueDetails({ ...venueDetails, type: e.target.value })}>
                                    <option value="">Select type</option>
                                    <option value="Bar">Bar</option>
                                    <option value="Restaurant">Restaurant</option>
                                    <option value="Music Venue">Music Venue</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='text-end'>
                            <Button variant="primary" type="submit">
                                Save Venue
                            </Button>
                        </Col>
                    </Row>
                    {errorMessage && (
                        <Row>
                            <Col>
                                <Form.Text className="text-danger">
                                    {errorMessage}
                                </Form.Text>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Card.Body>
        </Card>
    );
}

export default VenueForm;
