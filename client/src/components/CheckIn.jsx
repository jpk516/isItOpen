import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import CheckInService from '../services/check-in-service';
import { useNavigate } from "react-router-dom";

function CheckIn({onCheckIn, venue}) {
    const navigate = useNavigate();
    let venueName = venue || '';
    const [errorMessage, setErrorMessage] = useState('');
    const [checkInDetails, setCheckInDetails] = useState({ isOpen: false, comment: '', venue: '' });

    const handleCheckIn = () => {
        // Perform check-in logic here
        CheckInService.add(checkInDetails)
            .then(response => {
                setCheckInDetails(response.data)
                onCheckIn(true);
            })
            .catch(error => {
                setErrorMessage(error.response?.data ?? "An error occurred, please try again.")
            })
    }

    
    return (
        <Form>
            <Form.Group className="mb-3" controlId="formIsOpen">
                <Form.Label>Is it open?</Form.Label>
                <Form.Check
                    type="switch"
                    id="isOpenSwitch"
                    label={checkInDetails.isOpen ? 'Yes' : 'No'}
                    checked={checkInDetails.isOpen}
                    onChange={() => setCheckInDetails({ ...checkInDetails, isOpen: !checkInDetails.isOpen })}
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
                    <option value={venueName}>{venueName}</option>
                </Form.Control>
            </Form.Group>

            <Button variant="primary" onClick={handleCheckIn}>
                Check In
            </Button>
        </Form>
    );
  }
  
  export default CheckIn;