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
        name: '', description: ''
    });

    // see if this is an edit or a create
    // and load if we can
    useEffect(() => {
        if (name && name.length > 0) {
            VenueService.get(name).then(response => {
                setVenueDetails(response.data);
            }).catch(error => {
                setErrorMessage(error.message)
            })
        }
    }, [])

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
            // could show messages here
        } else {
            if (venueDetails._id?.length > 0) {
                VenueService.update(venueDetails)
                    .then(response => {
                        setVenueDetails(response.data)
                        navigate("/venues")
                    })
                    .catch(error => {
                        setErrorMessage(error.response?.data ?? "An error occurred, please try again.")
                    })
            } else {
                VenueService.add(venueDetails)
                    .then(response => {
                        setVenueDetails(response.data)
                        navigate("/venues")
                    })
                    .catch(error => {
                        console.log(error)
                        setErrorMessage(error.response?.data ?? "An error occurred, please try again.")
                    })
            }
        }

        setValidated(true);
    }

    return (
        <Card>
            <Card.Header>Manage Venue</Card.Header>
            <Card.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="formVenueName">
                                <Form.Label>Venue Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter venue name" disabled={venueDetails._id?.length > 0}
                                    value={venueDetails.name}
                                    required
                                    onChange={e => setVenueDetails({...venueDetails, name: e.target.value})}
                                />
                                <Form.Text className="text-muted">
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formVenueDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" placeholder="Enter a description of the venue" 
                                    value={venueDetails.description}
                                    required
                                    onChange={e => setVenueDetails({...venueDetails, description: e.target.value})}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="m-3">
                            <Form.Group>
                                <Button variant="primary" type="submit" className="pull-right">
                                    Save Venue
                                </Button>
                                { errorMessage.length > 0 && 
                                    <Form.Text className="text-danger p-3">
                                        {errorMessage}
                                    </Form.Text>
                                }
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default VenueForm;