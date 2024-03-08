import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';
import CheckInService from '../services/check-in-service';
import { useNavigate } from "react-router-dom";
import VenueService from '../services/venue-service';

function CheckIn({onCheckIn}) {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [checkInDetails, setCheckInDetails] = useState({ open: false, comment: '', venue: '' });
    const [venueSelectList, setVenueSelectList] = useState([]);

    useEffect(() => {
        VenueService.getSelectList().then(response => {
            setVenueSelectList(response.data);
        }).catch(error => {
            console.log(error)
        })
    }, [])

    const handleCheckIn = () => {
        // Perform check-in logic here
        CheckInService.add(checkInDetails)
            .then(response => {
                setCheckInDetails({ open: false, comment: '', venue: '' });
            })
            .catch(error => {
                setErrorMessage(error.response?.data ?? "An error occurred, please try again.")
            })
    }

    
    return (
        <Card>
            <Card.Header>Manage Venue</Card.Header>
            <Card.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formIsOpen">
                        <Form.Label>Is it open?</Form.Label>
                        <Form.Check
                            type="switch"
                            id="isOpenSwitch"
                            label={checkInDetails.open ? 'Yes' : 'No'}
                            checked={checkInDetails.open}
                            onChange={() => setCheckInDetails({ ...checkInDetails, open: !checkInDetails.open })}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formComment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter comment"
                            value={checkInDetails.comment}
                            onChange={(e) => setCheckInDetails({ ...checkInDetails, comment: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formVenue">
                        <Form.Label>Venue</Form.Label>
                        <Form.Control
                            as="select"
                            value={checkInDetails.venue}
                            onChange={(e) => setCheckInDetails({ ...checkInDetails, venue: e.target.value })}
                        >
                            <option value="">Select venue</option>
                            {venueSelectList.map((venue, index) => {
                                return (
                                    <option key={venue._id} value={venue._id}>{venue.name}</option>
                                )
                            })}
                        </Form.Control>
                    </Form.Group>

                    <Button variant="primary" onClick={handleCheckIn}>
                        Check In
                    </Button>
                </Form>
            </Card.Body>
        </Card>
        
    );
  }
  
  export default CheckIn;